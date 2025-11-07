import React, { useState } from 'react';
import type { ProfileData } from '../types';
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from '../constants';

interface ContactProps {
    profile: ProfileData;
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
    const [showContactInfo, setShowContactInfo] = useState(false);

  return (
    <section id="contact" className="py-24 text-center flex flex-col items-center">
      <div className="opacity-0 fade-in-up">
        <h2 className="text-green font-mono mb-2 text-lg">06. What's Next?</h2>
        <h3 className="text-4xl md:text-5xl font-bold text-lightest-slate mb-4">Get In Touch</h3>
        <p className="text-slate max-w-xl mb-10">
          I'm currently looking for new opportunities and my inbox is always open.
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <button
          onClick={() => setShowContactInfo(!showContactInfo)}
          className="border border-green rounded px-8 py-4 text-green hover:bg-green/10 transition-colors duration-300 font-mono text-lg"
          aria-expanded={showContactInfo}
        >
          Say Hello
        </button>
      </div>
      
      <div 
        className={`transition-[max-height,margin] duration-700 ease-in-out overflow-hidden ${showContactInfo ? 'max-h-96 mt-12' : 'max-h-0 mt-0'}`}
      >
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-6 p-4 border border-lightest-navy/20 rounded-lg">
            {profile.phone && (
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 group">
                    <PhoneIcon className="w-6 h-6 text-green" />
                    <span className="text-light-slate group-hover:text-green transition-colors font-mono">{profile.phone}</span>
                </a>
            )}
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 group">
                <MailIcon className="w-6 h-6 text-green" />
                <span className="text-light-slate group-hover:text-green transition-colors font-mono">{profile.email}</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <LinkedInIcon className="w-6 h-6 text-green" />
                <span className="text-light-slate group-hover:text-green transition-colors font-mono">LinkedIn</span>
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <GitHubIcon className="w-6 h-6 text-green" />
                <span className="text-light-slate group-hover:text-green transition-colors font-mono">GitHub</span>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
