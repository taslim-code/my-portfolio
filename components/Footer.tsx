import React from 'react';
import type { ProfileData } from '../types';
import { LinkedInIcon, GitHubIcon } from '../constants';

interface FooterProps {
  data: ProfileData;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer id="footer" className="mt-16 py-8 text-center text-slate text-xs font-mono">
      <div className="flex md:hidden justify-center gap-6 mb-4">
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-green transition-colors">
          <LinkedInIcon className="w-6 h-6" />
        </a>
        <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-green transition-colors">
          <GitHubIcon className="w-6 h-6" />
        </a>
      </div>
      <p>Designed & Built by {data.name}</p>
      <p className="mt-1">&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;