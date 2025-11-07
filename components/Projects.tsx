import React from 'react';
import type { Project } from '../types';
import Section from './Section';
import { LinkIcon, GitHubIcon, FolderIcon } from '../constants';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <Section title="Things I've Built" id="projects" number={2}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-lightest-navy p-6 rounded-lg shadow-lg flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300">
            <div>
              <div className="flex justify-between items-center mb-6">
                <FolderIcon className="w-10 h-10 text-green"/>
                <div className="flex gap-4">
                   {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link" className="text-light-slate hover:text-green transition-colors">
                      <GitHubIcon className="w-6 h-6"/>
                    </a>
                   )}
                   {project.link && project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Project Link" className="text-light-slate hover:text-green transition-colors">
                      <LinkIcon className="w-6 h-6"/>
                    </a>
                   )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-lightest-slate group-hover:text-green transition-colors cursor-pointer">{project.title}</h3>
              <p className="mt-3 text-light-slate text-sm">{project.description}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {project.technologies.map(tech => (
                  <span key={tech} className="text-xs font-mono text-slate">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;