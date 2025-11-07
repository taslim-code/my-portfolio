import React, { useState } from 'react';
import type { SkillCategory } from '../types';
import Section from './Section';

interface SkillsProps {
  skills: SkillCategory[];
}

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(skills[0]?.title ?? null);

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  return (
    <Section title="Skills" id="skills" number={4}>
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-light-slate mb-10">
          I've worked with a range of technologies in the web development world. Here's a snapshot.
        </p>
        <div>
          {skills.map((category, index) => (
            <div key={category.title} className="border-b border-lightest-navy/20 last:border-b-0">
              <button
                onClick={() => toggleCategory(category.title)}
                className="w-full flex justify-between items-center p-5 text-left bg-light-navy/50 hover:bg-light-navy transition-colors"
                aria-expanded={openCategory === category.title}
                aria-controls={`skills-panel-${index}`}
              >
                <h3 className={`font-semibold text-lg transition-colors ${openCategory === category.title ? 'text-green' : 'text-lightest-slate'}`}>
                  {category.title}
                </h3>
                <ChevronIcon className={`transform transition-transform duration-300 ${openCategory === category.title ? 'rotate-180 text-green' : 'text-slate'}`} />
              </button>
              <div
                id={`skills-panel-${index}`}
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${openCategory === category.title ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="bg-light-navy/30 p-5 pt-4">
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-navy text-green/80 font-mono text-sm px-3 py-1.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Skills;