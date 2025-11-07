import React from 'react';

const Navbar: React.FC = () => {
    const navLinks = [
        { name: "Experience", id: "experience" },
        { name: "Projects", id: "projects" },
        { name: "Education", id: "education" },
        { name: "Skills", id: "skills" },
    ];

    const resumeLink = "https://drive.google.com/file/d/1JOViv7BPgUJ_K8ln-_YZX-Uy2K31Nmsz/view?usp=sharing"; 

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md shadow-lg">
            <nav className="container mx-auto max-w-5xl px-6 py-4 flex justify-between items-center">
                <a href="#" onClick={handleLogoClick} className="text-green text-2xl font-bold font-mono cursor-pointer">T</a>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link, i) => (
                        <a 
                            key={link.id} 
                            href={`#${link.id}`} 
                            onClick={(e) => handleScroll(e, link.id)}
                            className="text-lightest-slate hover:text-green transition-colors duration-300 cursor-pointer"
                        >
                            <span className="text-green font-mono text-sm">0{i + 1}.</span> {link.name}
                        </a>
                    ))}
                     <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="border border-green rounded px-4 py-2 text-green hover:bg-green/10 transition-colors duration-300 font-mono text-sm">
                        Resume
                    </a>
                </div>
                {/* A mobile menu could be added here */}
            </nav>
        </header>
    );
}
export default Navbar;