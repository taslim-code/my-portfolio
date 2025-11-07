import React, { useRef, useEffect, useState } from 'react';

interface SectionProps {
  title: string;
  id: string;
  number: number;
  children: React.ReactNode;
}

const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};


const Section: React.FC<SectionProps> = ({ title, id, number, children }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      id={id} 
      className={`py-8 scroll-mt-20 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`flex items-center gap-4 mb-10 ${isVisible ? 'fade-in-up' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-bold text-lightest-slate whitespace-nowrap">
          <span className="text-green font-mono text-xl md:text-2xl mr-2">0{number}.</span>
          {title}
        </h2>
        <div className="w-full h-px bg-lightest-navy"></div>
      </div>
      <div className={isVisible ? 'fade-in-up fade-in-up-delay-1' : ''}>
        {children}
      </div>
    </section>
  );
};

export default Section;