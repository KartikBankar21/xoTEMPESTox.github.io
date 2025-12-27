import React, { useEffect, useRef, useState } from "react";

const educationData = [
  {
    image: "https://via.placeholder.com/60",
    title: "B.Tech Honors in CS (AI & ML Specialization)",
    subtitle: "University of Mumbai",
    description: "Studying AI and ML with focus on deep learning and systems design. Specializing in neural networks, computer vision, and scalable AI infrastructure.",
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
    description: "Building AI doctor modules using MedLLMs for workflow automation. Developing secure, HIPAA-compliant interfaces and integrating complex medical knowledge graphs.",
    date: "Jul 2025 - Present",
    type: "exp",
    pos: 0.12
  },
  {
    image: "https://via.placeholder.com/60",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Creo AI",
    description: "Built an STS chatbot using RAG, agentic AI, and NLP for 1K+ concurrent users. Optimized vector database retrieval speeds by 40%.",
    date: "Mar 2025 – Aug 2025",
    type: "exp",
    pos: 0.32
  },
  {
    image: "https://via.placeholder.com/60",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Web3Galaxy",
    description: "Delivered a multimodal chatbot with TTS, STT, and document parsing. Integrated blockchain authentication for secure user sessions.",
    date: "Dec 2024 – Feb 2025",
    type: "exp",
    pos: 0.52
  },
  {
    image: "https://via.placeholder.com/60",
    title: "Software Developer Intern",
    subtitle: "Chart Raiders",
    description: "Built LangChain+VectorDB trading assistant and tuned SLMs with synthetic Q&A. Focused on financial sentiment analysis and real-time data ingestion.",
    date: "Feb 2024 – Aug 2024",
    type: "exp",
    pos: 0.72
  },
  {
    image: "https://via.placeholder.com/60",
    title: "Technical Head",
    subtitle: "ACM SIG AI TCET",
    description: "Led AI initiatives with 5+ workshop training 500+ students. Managed a team of 15 developers to build community-driven AI tools.",
    date: "Jul 2024 – Jul 2025",
    type: "exp",
    pos: 0.92
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
      className={`absolute w-full px-4 md:px-0`} 
      style={{ top: `${item.pos * 100}%`, transform: 'translateY(-50%)' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`relative p-8 md:p-10 rounded-3xl border transition-all duration-700 ease-out transform 
          ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95 pointer-events-none"}
          bg-black/40 backdrop-blur-md border-white/10 hover:border-blue-500/30 shadow-2xl`}
        style={{
          background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.12), transparent 40%)`,
          marginLeft: isLeft ? '5rem' : '0',
          marginRight: !isLeft ? '5rem' : '0',
          maxWidth: '85%'
        }}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-bold text-xl md:text-2xl leading-tight tracking-tight">{item.title}</h3>
          <p className="text-blue-400 font-semibold text-base md:text-lg">{item.subtitle}</p>
          <p className="text-gray-400 text-sm md:text-base mt-4 leading-relaxed font-light">{item.description}</p>
          
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.type === 'edu' ? 'bg-blue-500 animate-pulse' : 'bg-purple-500 animate-pulse'}`}></div>
              <span className="text-gray-400 text-xs md:text-sm font-mono tracking-widest uppercase">{item.date}</span>
            </div>
            <span className={`text-[10px] md:text-xs font-mono uppercase px-3 py-1 rounded-full border ${item.type === 'edu' ? 'border-blue-500/30 text-blue-400' : 'border-purple-500/30 text-purple-400'}`}>
              {item.type === 'edu' ? 'Academic' : 'Professional'}
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div 
        className="page-overlay overflow-y-auto overflow-x-hidden h-screen scroll-smooth"
        style={{ 
          position: "relative", 
          zIndex: 10,
          background: "radial-gradient(circle at 50% 0%, #0a0a15 0%, #000 100%)"
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-32">
          {/* Header */}
          <div className="text-center mb-52">
            <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10 uppercase">
              Journey
            </h2>
            <div className="flex justify-center gap-16 md:gap-24 mt-8">
               <div className="flex flex-col items-center">
                 <span className="text-blue-400 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase">Education</span>
                 <div className="h-[2px] w-12 bg-blue-500 mt-3 rounded-full shadow-[0_0_15px_#3b82f6]"></div>
               </div>
               <div className="flex flex-col items-center">
                 <span className="text-purple-400 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase">Experience</span>
                 <div className="h-[2px] w-12 bg-purple-500 mt-3 rounded-full shadow-[0_0_15px_#a855f7]"></div>
               </div>
            </div>
          </div>

          {/* Timeline Wrapper - Increased Height significantly to prevent overlap */}
          <div className="relative h-[2500px] md:h-[2200px]" ref={containerRef}>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-24 md:gap-40 relative">
              
              {/* LEFT COLUMN: Education */}
              <div className="relative h-full">
                {/* Progress Lines */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/[0.05]"></div>
                <div 
                  className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_20px_#3b82f6] transition-all duration-100 ease-out z-10"
                  style={{ height: `${progressRatio * 100}%` }}
                ></div>

                {/* Nodes on Left Edge */}
                {educationData.map((item, i) => (
                  <div 
                    key={`node-edu-${i}`}
                    className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-black overflow-hidden z-20
                      ${progressRatio >= item.pos ? "border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-110" : "border-white/10 grayscale opacity-20 scale-90"}`}
                    style={{ top: `${item.pos * 100}%` }}
                  >
                    <img src={item.image} alt="logo" className="w-full h-full object-cover" />
                  </div>
                ))}

                {educationData.map((item, i) => (
                  <TimelineCard key={`edu-${i}`} item={item} isLeft={true} progressRatio={progressRatio} />
                ))}
              </div>

              {/* RIGHT COLUMN: Experience */}
              <div className="relative h-full">
                {/* Progress Lines */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/[0.05]"></div>
                <div 
                  className="absolute right-0 top-0 w-[2px] bg-gradient-to-b from-purple-400 to-fuchsia-400 shadow-[0_0_20px_#a855f7] transition-all duration-100 ease-out z-10"
                  style={{ height: `${progressRatio * 100}%` }}
                ></div>

                {/* Nodes on Right Edge */}
                {experienceData.map((item, i) => (
                  <div 
                    key={`node-exp-${i}`}
                    className={`absolute right-0 translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-black overflow-hidden z-20
                      ${progressRatio >= item.pos ? "border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)] scale-110" : "border-white/10 grayscale opacity-20 scale-90"}`}
                    style={{ top: `${item.pos * 100}%` }}
                  >
                    <img src={item.image} alt="logo" className="w-full h-full object-cover" />
                  </div>
                ))}

                {experienceData.map((item, i) => (
                  <TimelineCard key={`exp-${i}`} item={item} isLeft={false} progressRatio={progressRatio} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-80 text-center pb-40">
            <div className="inline-flex flex-col items-center">
              <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-4">The Journey Continues</p>
              <div className="w-px h-24 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}