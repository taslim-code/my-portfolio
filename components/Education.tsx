import React from 'react';
import type { EducationData } from '../types';
import Section from './Section';

interface EducationProps {
  data: EducationData;
}

const Education: React.FC<EducationProps> = ({ data }) => {
  return (
    <Section title="Education" id="education" number={3}>
      <div className="bg-light-navy p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-start flex-col sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-lightest-slate">{data.institution}</h3>
            <p className="text-md text-green/80 font-medium">{data.degree}</p>
          </div>
          <p className="text-sm text-slate mt-2 sm:mt-0">{data.expectedDate}</p>
        </div>
        <p className="text-sm text-slate">{data.location}</p>
        <div className="mt-4">
          <h4 className="font-semibold text-light-slate">Relevant Coursework:</h4>
          <p className="text-slate">{data.coursework.join(', ')}</p>
        </div>
      </div>
    </Section>
  );
};

export default Education;