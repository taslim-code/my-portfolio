import React, { useState } from 'react';
import type { Internship } from '../types';
import Section from './Section';
import { LinkIcon } from '../constants';

interface ExperienceProps {
  internships: Internship[];
}

const Experience: React.FC<ExperienceProps> = ({ internships }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Section title="Where I've Worked" id="experience" number={1}>
      <div className="flex flex-col md:flex-row gap-8 min-h-[300px]">
        {/* Tabs */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
          {internships.map((internship, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`text-left font-mono text-sm whitespace-nowrap px-4 py-3 border-b-2 md:border-b-0 md:border-l-2 transition-all duration-300 ${
                activeTab === index
                  ? 'border-green text-green bg-light-navy'
                  : 'border-lightest-navy/50 text-slate hover:bg-light-navy/50 hover:text-light-slate'
              }`}
            >
              {internship.company}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {internships.map((internship, index) => (
            <div
              key={index}
              className={`${activeTab === index ? 'block' : 'hidden'}`}
              role="tabpanel"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-lightest-slate">
                  {internship.title}{' '}
                  <span className="text-green">@ {internship.company}</span>
                </h3>
                {internship.link && (
                    <a href={internship.link} target="_blank" rel="noopener noreferrer" aria-label="View Details" className="text-light-slate hover:text-green transition-colors flex-shrink-0 ml-0 sm:ml-4 mt-2 sm:mt-0">
                        <LinkIcon className="w-5 h-5" />
                    </a>
                )}
              </div>
              <p className="text-sm font-mono text-slate mb-4">{internship.period}</p>
              <p className="text-light-slate">
                {internship.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;