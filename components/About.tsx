import React from 'react';
import type { ProfileData } from '../types';

interface HeroProps {
    content: string;
    profile: ProfileData;
}

const handleScrollTo = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
};

const Hero: React.FC<HeroProps> = ({ content, profile }) => {

    return (
        <section id="about" className="min-h-screen flex flex-col justify-center -mt-20">
            <p className="text-green font-mono mb-4 text-lg opacity-0 fade-in-up">Hi, my name is</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-lightest-slate tracking-tight opacity-0 fade-in-up fade-in-up-delay-1">{profile.name}.</h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate tracking-tight mt-2 opacity-0 fade-in-up fade-in-up-delay-2">I design and build digital experiences.</h2>
            <p className="text-lg text-slate mt-6 max-w-xl opacity-0 fade-in-up fade-in-up-delay-3">
                {content}
            </p>
            <div className="mt-12 opacity-0 fade-in-up fade-in-up-delay-4">
                <button
                    onClick={() => handleScrollTo('experience')}
                    className="border border-green rounded px-8 py-4 text-green hover:bg-green/10 transition-colors duration-300 font-mono text-lg self-start"
                >
                    Check Out My Work!
                </button>
            </div>
        </section>
    );
};

export default Hero;