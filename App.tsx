// FIX: Implement the main App component to structure the portfolio page.
import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import CertificationsAndAchievements from './components/CertificationsAndAchievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import type { ProfileData, Internship, Project, EducationData, SkillCategory, Certification, Achievement, FullPortfolioData } from './types';

// Data for Taslim's Portfolio
const profileData: ProfileData = {
  name: 'Taslim',
  email: 'taslimmia338@gmail.com',
  phone: '+91-9663582695',
  linkedin: 'https://www.linkedin.com/in/taslim-5801a62b6/',
  github: 'https://github.com/taslim-code',
};

const aboutContent = "BCA student skilled in AI, machine learning, and full-stack development. Experienced in developing intelligent healthcare and automation systems using Python, Flask, TensorFlow, and React. Seeking to contribute to innovative AI-driven projects with real-world impact.";

const experienceData: Internship[] = [
  {
    company: 'CellStrat',
    title: 'AI Intern (Remote)',
    period: 'Apr 2025 - Present',
    description: 'Worked on NLP and computer vision tasks using Python and TensorFlow for data insights.',
  },
  {
    company: 'Prinston Solutions',
    title: 'Machine Learning Intern (Offline)',
    period: 'Mar 2025 - May 2025',
    description: 'Developed predictive models using Python and Scikit-learn on real-world datasets.',
    link: 'https://drive.google.com/file/d/1K-Ze2IMi8fSiYcEit5S5q6cJ5QnSXZct/view?usp=sharing',
  },
];

const projectsData: Project[] = [
  {
    title: 'Visionary – AI Healthcare App',
    description: 'Integrated CNN retinal detection, yoga pose analysis, and heart risk prediction achieving 92% accuracy.',
    technologies: ['Python', 'Flask', 'TensorFlow', 'React'],
    githubLink: 'https://github.com/taslim-code/Visionary',
  },
  {
    title: 'ElderlyEase',
    description: 'Web app for senior citizens with voice assistant, health tracking, and doctor booking.',
    technologies: ['React', 'TypeScript', 'Node.js'],
    githubLink: 'https://github.com/taslim-code/elderly-care',
  },
  {
    title: 'Heart Disease Prediction Portal',
    description: 'AI-powered system predicting heart disease and linking users with cardiologists via chatbot.',
    technologies: ['Python', 'Flask', 'Scikit-learn', 'HTML/CSS'],
    githubLink: 'https://github.com/taslim-code/GenZ-Heart-Smart-AI-Health-Companion',
  },
    {
    title: 'AI OMR Evaluator',
    description: 'Automated OMR sheet evaluation using Gemini API, achieving 80% faster grading.',
    technologies: ['Python', 'Gemini API', 'OpenCV'],
    githubLink: 'https://github.com/taslim-code/Ai-omr-evaluator',
  },
];

const educationData: EducationData = {
  institution: 'The Oxford College of Science',
  degree: 'Bachelor of Computer Applications',
  expectedDate: 'Expected 2026',
  location: 'Bengaluru, India',
  coursework: ['Data Structures', 'Machine Learning', 'DBMS', 'Software Engineering', 'Software Testing']
};

const skillsData: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'C++', 'HTML', 'CSS', 'JavaScript', 'SQL']
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Sass', 'jQuery']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'MongoDB', 'Firebase']
  },
  {
    title: 'Frameworks/Tools',
    skills: ['TensorFlow', 'Scikit-learn', 'Docker', 'npm', 'Webpack', 'Babel', 'Git', 'VS Code']
  },
  {
      title: 'Data',
      skills: ['Pandas', 'NumPy', 'OpenCV']
  }
];

const certificationsData: Certification[] = [
  { name: 'UI/UX Design Certified Course', issuer: 'DevTown', link: 'https://drive.google.com/file/d/1ck--6elvGneFd4tEYp75mVaeV_2Wy4g9/view?usp=sharing' },
  { name: 'Graphic Design Certified Course', issuer: 'DevTown', link: 'https://drive.google.com/file/d/10XEcRJz8ezYl7HdWjyH3dunT673j4YDb/view?usp=sharing' },
  { name: 'Full Stack Web Development Training', issuer: 'DevTown', link: 'https://drive.google.com/file/d/1NnK_EMPmRb4p2r4OHsxpSNoE8BaEgjsu/view?usp=sharing' },
];

const achievementsData: Achievement[] = [
  { description: 'Runner-Up – Cell Verse Hackathon', context: 'Built an AI-based solution under time constraints, showcasing innovation and teamwork.' },
  { description: 'Certified in Design & Development', context: 'Recognized by DevTown for excellence in UI/UX, Graphic Design, and Full Stack Web Development.' },
];

const App: React.FC = () => {
  const fullPortfolioData: FullPortfolioData = {
      profile: profileData,
      about: aboutContent,
      experience: experienceData,
      projects: projectsData,
      education: educationData,
      skills: skillsData,
      certifications: certificationsData,
      achievements: achievementsData,
  };

  return (
    <div className="bg-navy text-light-slate font-sans">
      <Header />
      <main className="container mx-auto max-w-5xl px-6">
        <About content={aboutContent} profile={profileData} />
        <Experience internships={experienceData} />
        <Projects projects={projectsData} />
        <Education data={educationData} />
        <Skills skills={skillsData} />
        <CertificationsAndAchievements certifications={certificationsData} achievements={achievementsData} />
        <Contact profile={profileData} />
      </main>
      <Footer data={profileData} />
      <Chatbot fullPortfolioData={fullPortfolioData} />
    </div>
  );
};

export default App;