import React from 'react';
import type { ProfileData } from '../types';
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, CloseIcon } from '../constants';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: ProfileData;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, profile }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-light-navy p-8 rounded-lg shadow-2xl relative w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate hover:text-green transition-colors" aria-label="Close modal">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-lightest-slate mb-6 text-center">Contact Information</h2>
                <div className="space-y-5">
                    {profile.phone && (
                        <a href={`tel:${profile.phone}`} className="flex items-center gap-4 group">
                            <PhoneIcon className="w-6 h-6 text-green" />
                            <span className="text-light-slate group-hover:text-green transition-colors">{profile.phone}</span>
                        </a>
                    )}
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group">
                        <MailIcon className="w-6 h-6 text-green" />
                        <span className="text-light-slate group-hover:text-green transition-colors">{profile.email}</span>
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <LinkedInIcon className="w-6 h-6 text-green" />
                        <span className="text-light-slate group-hover:text-green transition-colors">LinkedIn Profile</span>
                    </a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <GitHubIcon className="w-6 h-6 text-green" />
                        <span className="text-light-slate group-hover:text-green transition-colors">GitHub Profile</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;