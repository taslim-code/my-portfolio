import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { GoogleGenAI, Chat, Type, FunctionDeclaration } from '@google/genai';
import type { FullPortfolioData } from '../types';
import { CloseIcon } from '../constants';

// FIX: Define the SpeechRecognition interface to resolve TypeScript error 'Cannot find name SpeechRecognition'. The Web Speech API types are not included in standard DOM typings, so a minimal interface is provided for compatibility.
interface SpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
    start: () => void;
    stop: () => void;
}

// --- Type Definitions ---
interface Message {
    role: 'user' | 'model';
    text: string;
}

// --- Helper Components ---
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-0.481M21 12c0-4.556-4.03-8.25-9-8.25-4.556 0-8.25 4.03-8.25 9 0 1.353.376 2.623 1.056 3.673a9.753 9.753 0 01-1.056 2.223C2.115 18.25 2.115 18.25 2.115 18.25s0 0 .375 0h.375a9.75 9.75 0 012.223-1.056A9.753 9.753 0 016 18.25m15-6.25a9.753 9.753 0 00-3.673-1.056L18 10.5m-1.5 4.5a.375.375 0 00.375.375h.375a.375.375 0 00.375-.375v-.375a.375.375 0 00-.375-.375h-.375a.375.375 0 00-.375.375v.375z" />
    </svg>
);
const MicrophoneIcon: React.FC<{ isListening: boolean }> = ({ isListening }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 transition-colors ${isListening ? 'text-red-500' : 'text-green'}`}>
        {isListening && <circle cx="12" cy="12" r="10" fill="currentColor" className="opacity-25 animate-ping absolute" />}
        <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
        <path d="M6 15a1.5 1.5 0 00-1.5 1.5v.091C4.5 19.864 7.92 22.5 12 22.5s7.5-2.636 7.5-5.909V16.5A1.5 1.5 0 0018 15h-1.5a.75.75 0 010-1.5h1.5A3 3 0 0121 16.5v.091c0 4.18-3.834 7.59-8.5 7.909V22.5a.75.75 0 01-1.5 0v-2.091C6.334 24.18 2.5 20.77 2.5 16.591V16.5A1.5 1.5 0 001 15h1.5a.75.75 0 010 1.5H1A3 3 0 014 13.5h1.5a.75.75 0 010 1.5H4a1.5 1.5 0 00-1.5 1.5z" />
    </svg>
);


// --- Main Component ---
const Chatbot: React.FC<{ fullPortfolioData: FullPortfolioData }> = ({ fullPortfolioData }) => {
    // --- State Management ---
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);

    // --- Refs ---
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    
    // --- Speech Synthesis ---
    const speak = (text: string) => {
        if (!text.trim()) return;

        if ('speechSynthesis' in window) {
            // Cancel any previous speech to prevent overlap
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        } else {
            console.warn("Browser does not support Speech Synthesis.");
        }
    };
    
    // --- Function Declaration for Gemini ---
    const navigateToSection: FunctionDeclaration = {
        name: 'navigateToSection',
        parameters: {
            type: Type.OBJECT,
            description: 'Scrolls the portfolio webpage to the specified section.',
            properties: {
                section: {
                    type: Type.STRING,
                    description: 'The ID of the section to scroll to. Must be one of: "about", "experience", "projects", "education", "skills", "certifications", "contact".',
                },
            },
            required: ['section'],
        },
    };

    // --- Chat & Audio Initialization ---
    useEffect(() => {
        if (isOpen) {
            if (!chatRef.current) {
                try {
                    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                    const portfolioContext = JSON.stringify(fullPortfolioData, null, 2);
                    
                    chatRef.current = ai.chats.create({
                        model: 'gemini-2.5-flash',
                        config: {
                          systemInstruction: `You are a helpful, friendly, and professional AI assistant on Taslim's personal portfolio website.
                          Your goal is to answer questions about Taslim's skills, experience, and projects based on the provided portfolio data.
                          You can also help users navigate the website by scrolling to different sections.
                          Be concise and conversational. If you don't know the answer, say that you don't have that information.
                          Here is Taslim's portfolio data in JSON format:
                          ${portfolioContext}`,
                          tools: [{ functionDeclarations: [navigateToSection] }]
                        },
                    });
                    const initialMessage = `Hi! I'm Taslim's AI assistant. Feel free to ask me anything about the portfolio or ask me to show you a section!`;
                    setMessages([{ role: 'model', text: initialMessage }]);
                    speak(initialMessage);
                } catch (e: any) {
                    setError("Failed to initialize chatbot.");
                    console.error(e);
                }
            }
        }
    }, [isOpen, fullPortfolioData]);
    
    // --- Scroll to Bottom ---
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // --- Speech Recognition Setup ---
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                document.getElementById('chatbot-submit-button')?.click(); 
            };
            
            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    // --- Handlers ---
    const handleListen = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };

    const handleSubmit = async (e?: FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await chatRef.current.sendMessage({ message: currentInput });
            
            if(response.functionCalls && response.functionCalls.length > 0) {
                const fc = response.functionCalls[0];
                if(fc.name === 'navigateToSection' && fc.args.section) {
                    const sectionId = fc.args.section as string;
                    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                    
                    const confirmationText = `Sure, taking you to the ${sectionId} section now.`;
                    const modelMessage : Message = { role: 'model', text: confirmationText };
                    setMessages(prev => [...prev, modelMessage]);
                    speak(confirmationText);
                }
            } else {
                 const modelMessage : Message = { role: 'model', text: response.text };
                 setMessages(prev => [...prev, modelMessage]);
                 speak(response.text);
            }

        } catch (err: any) {
            const errorMessage = 'Sorry, something went wrong. Please try again.';
            setError(errorMessage);
            setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
            speak(errorMessage);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- Render ---
    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-green text-navy p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
                aria-label="Toggle Chatbot"
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatIcon />}
            </button>
            {isOpen && (
                <div className="chat-widget-enter fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-light-navy rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden">
                    <header className="bg-navy p-4 text-lightest-slate text-center font-semibold flex justify-between items-center">
                        <span>AI Assistant</span>
                        <button onClick={() => setIsOpen(false)} className="text-slate hover:text-green">
                           <CloseIcon className="w-5 h-5"/>
                        </button>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="flex flex-col gap-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-green text-navy' : 'bg-light-navy text-lightest-slate'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] p-3 rounded-lg bg-navy text-lightest-slate">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-slate rounded-full animate-pulse delay-75"></span>
                                            <span className="w-2 h-2 bg-slate rounded-full animate-pulse delay-150"></span>
                                            <span className="w-2 h-2 bg-slate rounded-full animate-pulse delay-300"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    {error && <p className="p-4 pt-0 text-red-400 text-sm text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-lightest-navy/20 flex items-center gap-2">
                         {recognitionRef.current && (
                            <button type="button" onClick={handleListen} className="p-2 rounded-full hover:bg-navy transition-colors" aria-label="Use voice input">
                                <MicrophoneIcon isListening={isListening} />
                            </button>
                        )}
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask or say 'show projects'..."
                            className="flex-1 bg-navy border border-lightest-navy/30 rounded-full py-2 px-4 text-lightest-slate focus:outline-none focus:ring-2 focus:ring-green"
                            disabled={isLoading}
                        />

                        <button id="chatbot-submit-button" type="submit" disabled={isLoading || !input.trim()} className="bg-green text-navy p-2 rounded-full disabled:bg-slate disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
                            <SendIcon />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;