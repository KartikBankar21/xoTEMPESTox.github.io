import React, { useEffect, useRef, useState } from "react";

const educationData = [
  {
    image: "https://via.placeholder.com/60",
    title: "B.Tech Honors in CS (AI & ML Specialization)",
    subtitle: "University of Mumbai",
    description: "Studying AI and ML with focus on deep learning and systems design.",
    date: "2022 - 2026",
    type: "edu",
    pos: 0.1 
  }
];

const experienceData = [
  {
    image: "https://via.placeholder.com/60",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Liferythm Healthcare",
    description: "Building AI doctor modules using MedLLMs for workflow automation.",
    date: "Jul 2025 - Present",
    type: "exp",
    pos: 0.15
  },
  {
    image: "https://via.placeholder.com/60",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Creo AI",
    description: "Built an STS chatbot using RAG, agentic AI, and NLP for 1K+ concurrent users.",
    date: "Mar 2025 – Aug 2025",
    type: "exp",
    pos: 0.35
  },
  {
    image: "https://via.placeholder.com/60",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Web3Galaxy",
    description: "Delivered a multimodal chatbot with TTS, STT, and document parsing.",
    date: "Dec 2024 – Feb 2025",
    type: "exp",
    pos: 0.55
  },
  {
    image: "https://via.placeholder.com/60",
    title: "Software Developer Intern",
    subtitle: "Chart Raiders",
    description: "Built LangChain+VectorDB trading assistant and tuned SLMs with synthetic Q&A.",
    date: "Feb 2024 – Aug 2024",
    type: "exp",
    pos: 0.75
  },
  {
    image: "https://via.placeholder.com/60",
    title: "Technical Head",
    subtitle: "ACM SIG AI TCET",
    description: "Led AI initiatives with 5+ workshop training 500+ students.",
    date: "Jul 2024 – Jul 2025",
    type: "exp",
    pos: 0.95
  },
];

const TimelineCard = ({ item, isLeft, progressRatio }) => {
  const cardRef = useRef(null);
  const isActive = progressRatio >= item.pos;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div 
      className={`absolute w-full px-4 md:px-0 ${isLeft ? 'pr-12' : 'pl-12'}`} 
      style={{ top: `${item.pos * 100}%`, transform: 'translateY(-50%)' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`relative p-6 rounded-2xl border transition-all duration-500 ease-out transform 
          ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95 pointer-events-none"}
          bg-black/40 backdrop-blur-md border-white/10 hover:border-blue-500/30 shadow-2xl`}
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
          <p className="text-blue-400/90 text-sm font-medium">{item.subtitle}</p>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">{item.description}</p>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-gray-500 text-[11px] font-mono tracking-wider">{item.date}</span>
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${item.type === 'edu' ? 'border-blue-500/30 text-blue-400' : 'border-purple-500/30 text-purple-400'}`}>
              {item.type === 'edu' ? 'Edu' : 'Work'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const [progressRatio, setProgressRatio] = useState(0);

  useEffect(() => {
    const overlay = document.querySelector(".page-overlay") || window;
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.5;
      const currentPos = start - rect.top;
      const ratio = Math.max(0, Math.min(1, currentPos / rect.height));
      setProgressRatio(ratio);
    };

    handleScroll();
    overlay.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      overlay.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      <div 
        className="page-overlay overflow-y-auto overflow-x-hidden h-screen scroll-smooth"
        style={{ 
          position: "relative", 
          zIndex: 10,
          background: "linear-gradient(to bottom, #000 0%, #08080c 100%)"
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-32">
          {/* Header */}
          <div className="text-center mb-40">
            <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
              MY JOURNEY
            </h2>
            <div className="flex justify-center gap-16 mt-8">
               <div className="flex flex-col items-center">
                 <span className="text-blue-400 font-mono text-xs tracking-[0.4em] uppercase">Education</span>
                 <div className="h-1 w-10 bg-blue-500 mt-2 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
               </div>
               <div className="flex flex-col items-center">
                 <span className="text-purple-400 font-mono text-xs tracking-[0.4em] uppercase">Experience</span>
                 <div className="h-1 w-10 bg-purple-500 mt-2 rounded-full shadow-[0_0_10px_#a855f7]"></div>
               </div>
            </div>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative h-[1500px] md:h-[1200px]" ref={containerRef}>
            
            {/* Center Gap for Lines and Nodes */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-20 z-10 pointer-events-none">
               {/* Line 1 (Left side of gap) */}
               <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-white/[0.05]"></div>
               <div 
                 className="absolute left-2 top-0 w-[2px] bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_15px_#3b82f6] transition-all duration-75 ease-linear z-10"
                 style={{ height: `${progressRatio * 100}%` }}
               ></div>

               {/* Line 2 (Right side of gap) */}
               <div className="absolute right-2 top-0 bottom-0 w-[2px] bg-white/[0.05]"></div>
               <div 
                 className="absolute right-2 top-0 w-[2px] bg-gradient-to-b from-purple-400 to-fuchsia-400 shadow-[0_0_15px_#a855f7] transition-all duration-75 ease-linear z-10"
                 style={{ height: `${progressRatio * 100}%` }}
               ></div>

               {/* Render Nodes in the center container to ensure alignment */}
               {educationData.map((item, i) => (
                 <div 
                   key={`node-edu-${i}`}
                   className={`absolute left-2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-black overflow-hidden
                     ${progressRatio >= item.pos ? "border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] scale-110" : "border-white/10 grayscale opacity-20 scale-90"}`}
                   style={{ top: `${item.pos * 100}%` }}
                 >
                   <img src={item.image} alt="logo" className="w-full h-full object-cover" />
                 </div>
               ))}

               {experienceData.map((item, i) => (
                 <div 
                   key={`node-exp-${i}`}
                   className={`absolute right-2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-black overflow-hidden
                     ${progressRatio >= item.pos ? "border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.8)] scale-110" : "border-white/10 grayscale opacity-20 scale-90"}`}
                   style={{ top: `${item.pos * 100}%` }}
                 >
                   <img src={item.image} alt="logo" className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>

            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-24 md:gap-40">
              <div className="relative h-full">
                {educationData.map((item, i) => (
                  <TimelineCard key={`edu-${i}`} item={item} isLeft={true} progressRatio={progressRatio} />
                ))}
              </div>
              <div className="relative h-full">
                {experienceData.map((item, i) => (
                  <TimelineCard key={`exp-${i}`} item={item} isLeft={false} progressRatio={progressRatio} />
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-60 text-center pb-40">
            <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent inline-block">
              <div className="bg-black/60 backdrop-blur-2xl p-12 rounded-[calc(1.5rem-1px)] border border-white/5 max-w-xl">
                <h4 className="text-3xl font-bold mb-4">Ready for the Next Chapter?</h4>
                <p className="text-gray-400 mb-10 leading-relaxed text-sm">
                  I'm currently available for full-stack AI roles and innovative engineering projects.
                </p>
                <button 
                  onClick={() => window.location.href = 'mailto:your@email.com'}
                  className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-tighter rounded-full overflow-hidden transition-all shadow-xl hover:shadow-white/10"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors">Contact for My Next Gig</span>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}