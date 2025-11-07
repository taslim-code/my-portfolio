// FIX: Define interfaces for the application data structures.
export interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
}

export interface Internship {
  company: string;
  title: string;
  link?: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  link?: string;
}

export interface EducationData {
  institution: string;
  degree: string;
  expectedDate: string;
  location: string;
  coursework: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  link?: string;
}

export interface Achievement {
  description: string;
  context?: string;
}

export interface FullPortfolioData {
    profile: ProfileData;
    about: string;
    experience: Internship[];
    projects: Project[];
    education: EducationData;
    skills: SkillCategory[];
    certifications: Certification[];
    achievements: Achievement[];
}