import React, { useEffect, useRef, useState } from "react";
import "../styles/main.css";
import Timeline from "../components/Timeline";
import TimelineCard from "../components/TimelineCard";

const educationData = [
  {
    image: "../assets/images/journey/education.png",
    title: "B.Tech Honors in CS (AI & ML Specialization)",
    subtitle: "University of Mumbai",
    description:
      "Studying AI and ML with focus on deep learning and systems design. Specializing in neural networks, computer vision, and scalable AI infrastructure.",
    date: "2022 - 2026",
    type: "edu",
    pos: 0.11,
  },
];

const experienceData = [
  {
    image: "../assets/images/journey/ai_intern.png",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Liferythm Healthcare",
    description:
      "Building AI doctor modules using MedLLMs for workflow automation. Developing secure, HIPAA-compliant interfaces and integrating complex medical knowledge graphs.",
    date: "Jul 2025 - Present",
    type: "exp",
    pos: 0.12,
  },
  {
    image: "../assets/images/journey/internship_placeholder.png",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Creo AI",
    description:
      "Built an STS chatbot using RAG, agentic AI, and NLP for 1K+ concurrent users. Optimized vector database retrieval speeds by 40%.",
    date: "Mar 2025 – Aug 2025",
    type: "exp",
    pos: 0.32,
  },
  {
    image: "../assets/images/journey/web3galaxy.png",
    title: "Full-Stack AI Engineer Intern",
    subtitle: "Web3Galaxy",
    description:
      "Delivered a multimodal chatbot with TTS, STT, and document parsing. Integrated blockchain authentication for secure user sessions.",
    date: "Dec 2024 – Feb 2025",
    type: "exp",
    pos: 0.52,
  },
  {
    image: "../assets/images/journey/internship_placeholder.png",
    title: "Software Developer Intern",
    subtitle: "Chart Raiders",
    description:
      "Built LangChain+VectorDB trading assistant and tuned SLMs with synthetic Q&A. Focused on financial sentiment analysis and real-time data ingestion.",
    date: "Feb 2024 – Aug 2024",
    type: "exp",
    pos: 0.72,
  },
  {
    image: "../assets/images/journey/acm_sigai.jpeg",
    title: "Technical Head",
    subtitle: "ACM SIG AI TCET",
    description:
      "Led AI initiatives with 5+ workshop training 500+ students. Managed a team of 15 developers to build community-driven AI tools.",
    date: "Jul 2024 – Jul 2025",
    type: "exp",
    pos: 0.92,
  },
];

const Journey = () => {
  const eduRef = useRef(null);
  const expRef = useRef(null);
  const [eduProgress, setEduProgress] = useState(0);
  const [expProgress, setExpProgress] = useState(0);

  // Dynamic Height Calculation
  const ITEM_HEIGHT = 380; // Pixels per item
  const eduHeight = educationData.length * ITEM_HEIGHT;
  const expHeight = experienceData.length * ITEM_HEIGHT;
  
  // On desktop, we want both columns to match the taller one for symmetry
  // On mobile, they will use their own calculated heights
  const maxHeight = Math.max(eduHeight, expHeight);

  useEffect(() => {
    const overlay = document.querySelector(".page-overlay") || window;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const startTrigger = viewportHeight * 0.5; // Trigger when element hits middle of screen

      const calculateRatio = (ref) => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        // Calculate how much of THIS specific column has passed the trigger point
        const currentPos = startTrigger - rect.top;
        return Math.max(0, Math.min(1, currentPos / rect.height));
      };

      setEduProgress(calculateRatio(eduRef));
      setExpProgress(calculateRatio(expRef));
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
    <div className="page-section">
      {/* <Timeline/> */}

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-32">
        {/* Header */}
        <div className="text-center mb-52">
          <p className="text-8xl md:text-9xl font-black mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-black/40 uppercase">
            Journey
          </p>
          <div className="flex justify-center gap-16 md:gap-24 mt-8">
            <div className="flex flex-col items-center">
              <span className="text-sky-400 font-mono font-bold text-lg md:text-3xl tracking-[0.2em] uppercase">
                Education
              </span>
              <div className="h-[2px] w-20 md:w-40 bg-sky-500 font-bold mt-3 rounded-full shadow-[0_0_15px_#3b82f6]"></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-purple-400 font-mono text-lg md:text-3xl tracking-[0.2em] uppercase">
                Experience
              </span>
              <div className="h-[2px] w-20 md:w-40 bg-purple-500 mt-3 rounded-full shadow-[0_0_15px_#a855f7]"></div>
            </div>
          </div>
        </div>
        <div className="mt-40 text-center pb-32 md:pb-5">
            <div className="inline-flex flex-col items-center">
              <p className="text-white font-mono text-2xl tracking-widest uppercase mb-4">The Journey Continues</p>
              <div className="w-px h-24 bg-gradient-to-b from-blue-500 to-transparent"></div>
            </div>
          </div>
        {/* Timeline Wrapper - Increased Height significantly to prevent overlap */}
        <div className="relative h-auto">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 md:gap-40 relative">
            {/* LEFT COLUMN: Education */}
            <div className="relative h-full ml-4 md:ml-0" ref={eduRef} style={{ 
                // Mobile: Use its own height | Desktop: Match the taller column
                height: window.innerWidth < 768 ? `${eduHeight}px` : `${maxHeight}px` 
              }}>
              {/* Progress Lines */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/[0.05]" ></div>
              <div
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_20px_#3b82f6] transition-all duration-100 ease-out z-10"
                style={{ height: `${eduProgress * 100}%` }}
              ></div>

              {/* Nodes on Left Edge */}
              {educationData.map((item, i) => (
                <div
                  key={`node-edu-${i}`}
                  className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-black overflow-hidden z-20
                      ${
                        eduProgress >= item.pos
                          ? "border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-110"
                          : "border-white/10 grayscale opacity-20 scale-90"
                      }`}
                  style={{ top: `${item.pos * 100}%` }}
                >
                  <img
                    src={item.image}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {educationData.map((item, i) => (
                <TimelineCard
                  key={`edu-${i}`}
                  item={item}
                  isLeft={true}
                  progressRatio={eduProgress} // Use eduProgress here
                />
              ))}
            </div>

            {/* RIGHT COLUMN: Experience */}
            <div className="relative h-full mr-4 lg:mr-32" ref={expRef} style={{ 
                height: window.innerWidth < 768 ? `${expHeight}px` : `${maxHeight}px` 
              }}>
              {/* Progress Lines */}
              <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/[0.05]"></div>
              <div
                className="absolute right-0 top-0 w-[2px] bg-gradient-to-b from-purple-400 to-fuchsia-400 shadow-[0_0_20px_#a855f7] transition-all duration-100 ease-out z-10"
                style={{ height: `${expProgress * 100}%` }}
              ></div>

              {/* Nodes on Right Edge */}
              {experienceData.map((item, i) => (
                <div
                  key={`node-exp-${i}`}
                  className={`absolute right-0 translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-black overflow-hidden z-20
                      ${
                        expProgress >= item.pos
                          ? "border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)] scale-110"
                          : "border-white/10 grayscale opacity-20 scale-90"
                      }`}
                  style={{ top: `${item.pos * 100}%` }}
                >
                  <img
                    src={item.image}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {experienceData.map((item, i) => (
                <TimelineCard
                  key={`exp-${i}`}
                  item={item}
                  isLeft={false}
                  progressRatio={expProgress} // Use expProgress here
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-60 text-center pb-40">
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent inline-block">
            <div className="bg-black/60 backdrop-blur-2xl p-12 rounded-[calc(1.5rem-1px)] border border-white/5 max-w-2xl">
              <p className="text-3xl font-bold mb-4 text-white">
                Ready for the Next Chapter?
              </p>
              <p className="text-gray-400 mb-10 leading-relaxed text-xl">
                I'm currently available for full-stack AI roles and innovative
                engineering projects.
              </p>
              <button
                onClick={() => (window.location.href = "mailto:your@email.com")}
                className="group relative px-10 py-5 bg-white text-black font-black uppercase  rounded-full overflow-hidden transition-all shadow-xl hover:shadow-white/10"
              >
                <span className="relative z-10 text-xl group-hover:text-white transition-colors rounded-full">
                  Contact for My Next Gig
                </span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
