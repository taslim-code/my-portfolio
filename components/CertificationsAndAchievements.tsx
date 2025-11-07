import React from 'react';
import type { Certification, Achievement } from '../types';
import Section from './Section';
import { LinkIcon } from '../constants';

interface CertificationsAndAchievementsProps {
  certifications: Certification[];
  achievements: Achievement[];
}

const CertificationsAndAchievements: React.FC<CertificationsAndAchievementsProps> = ({ certifications, achievements }) => {
  return (
    <Section title="Other Noteworthy Mentions" id="certifications" number={5}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-xl font-bold text-lightest-slate mb-6 text-center md:text-left">Certifications</h3>
          <ul className="space-y-4">
            {certifications.map((cert, index) => (
              <li key={index}>
                <div className="flex justify-between items-center bg-light-navy p-4 rounded-md group">
                    <div className="flex items-center">
                        <span className="text-green mr-4">▹</span>
                        <div>
                            <p className="font-semibold text-light-slate group-hover:text-green transition-colors">{cert.name}</p>
                            <p className="text-sm text-slate">{cert.issuer}</p>
                        </div>
                    </div>
                    {cert.link && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label="View Certificate" className="text-light-slate hover:text-green transition-colors flex-shrink-0 ml-4">
                            <LinkIcon className="w-5 h-5" />
                        </a>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-lightest-slate mb-6 text-center md:text-left">Achievements</h3>
          <ul className="space-y-4">
            {achievements.map((ach, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green mr-4 mt-1">▹</span>
                <div>
                    <p className="text-light-slate">{ach.description}</p>
                    {ach.context && <p className="text-sm text-slate mt-1">{ach.context}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default CertificationsAndAchievements;