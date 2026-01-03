import React, { useEffect, useRef, useState } from "react";
import "../styles/main.css";
import TimelineCard from "../components/TimelineCard";

const educationData = [
  {
    image: "../assets/images/journey/education.png",
    title: "B.Tech Honors in CS (AI & ML Specialization)",
    subtitle: "University of Mumbai",
    description:
      "Studying AI and ML with focus on deep learning and systems design. Specializing in neural networks, computer vision, and scalable AI infrastructure.",
    date: "2022 - 2026",
    tag: "Undergrad",
    type: "edu",
    pos: 0.12,
    // Mobile 0.5 (Centers in the shorter container)
    mobilePos: 0.5,
    // Mobile Threshold: 0.8 (Stays visible for 80% of the section scroll, fixing quick fade)
    mobileThreshold: 0.8,
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
    tag: "Internship",
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
    tag: "Internship",
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
    tag: "Internship",
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
    tag: "Internship",
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
    tag: "Leadership",
    type: "exp",
    pos: 0.92,
  },
];

const Journey = () => {
  const eduRef = useRef(null);
  const expRef = useRef(null);
  const indicatorRef = useRef(null);
  const [eduProgress, setEduProgress] = useState(0);
  const [expProgress, setExpProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Use a simple boolean for the "hidden" state
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Identify the custom scroll container
    const scrollContainer = document.querySelector(".page-overlay") || window;

    const handleScroll = () => {
      // Get scroll position from either the container or the window
      const scrollTop =
        scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;

      // Trigger fade as soon as 20px are scrolled
      if (scrollTop > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    // Check initial state
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic Height Calculation
  const ITEM_HEIGHT = 300; // Pixels per item
  const eduHeight = educationData.length * ITEM_HEIGHT;
  const expHeight = experienceData.length * ITEM_HEIGHT;

  // On desktop, we want both columns to match the taller one for symmetry
  // On mobile, they will use their own calculated heights
  const maxHeight = Math.max(eduHeight, expHeight);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const getVisualLineHeight = (data) => {
    if (isMobile) return "100%"; // On mobile, lines fill their specific container
    if (!data.length) return "0px";

    // Find the position of the last item (0.0 to 1.0)
    const lastPos = data[data.length - 1].pos;

    // Calculate pixels: (Relative Pos * Container Height) + Padding (150px)
    // The padding ensures the line goes slightly past the last node
    const pixelHeight = lastPos * maxHeight + 150;

    // Ensure we don't exceed the container
    return Math.min(pixelHeight, maxHeight);
  };

  const eduVisualHeight = getVisualLineHeight(educationData);
  const expVisualHeight = getVisualLineHeight(experienceData);

  // Helper to get item position based on screen size
  const getItemPos = (item) =>
    isMobile ? item.mobilePos ?? item.pos : item.pos;

  // Helper to get threshold (how long it stays active)
  const getItemThreshold = (item) =>
    isMobile ? item.mobileThreshold ?? 0.25 : 0.25;

  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle state based on visibility
        if (entry.isIntersecting) {
          setFooterVisible(true);
        } else {
          // Reset the animation when the element leaves the screen
          setFooterVisible(false);
        }
      },
      {
        threshold: 0.1, // Trigger as soon as 10% is visible
        rootMargin: "0px 0px -50px 0px", // Optional: gives a slight buffer at the bottom
      }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-section">
      {/* <Timeline/> */}

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-32 ">
        {/* Header */}
        <div className="flex items-center justify-center  mb-0 h-fit">
          <div className="text-center mb-6 bg-black/50 backdrop-blur-sm rounded-2xl m-0 w-[100%] p-12 w-fit">
            <p className=" text-8xl md:text-9xl font-black mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-400 uppercase">
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
        </div>
        <div
          ref={indicatorRef}
          className={`relative z-10 w-full max-w-lg md:max-w-2xl mx-auto px-6 p-12 mb-44 text-center bg-black/50 backdrop-blur-md rounded-2xl border border-white/5 transition-all duration-1000 ease-in-out ${isScrolled
            ? "opacity-0 translate-y-20 pointer-events-none invisible"
            : "opacity-100 translate-y-0"
            }`}
        >
          <div className="inline-flex flex-col items-center group cursor-pointer">
            <p className="text-white font-mono font-bold text-xl md:text-2xl tracking-[0.3em] uppercase mb-12 opacity-90 transition-all duration-700 group-hover:tracking-[0.4em] group-hover:opacity-100">
              The Journey Continues
            </p>

            <div className="relative flex flex-col items-center">
              <div className="relative w-8 h-14 rounded-full border-2 border-white/70 backdrop-blur-sm flex justify-center p-1.5 transition-all duration-500 group-hover:border-white/100">
                <div className="w-1.5 h-3 bg-white rounded-full animate-scroll-dot"></div>
              </div>

              <div className="relative w-px h-24 bg-gradient-to-b from-white/70 via-white/35 to-transparent mt-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/70 to-transparent animate-path-flow"></div>
                {/* <div className="relative -mt-6 flex flex-col items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 fill-none stroke-current text-white/60 group-hover:text-blue-400"
                    strokeWidth="1.5"
                  >
                    <path d="M12 22L17 17M12 22L7 17" className="animate-pulse" />
                    <path
                      d="M12 16L15 13M12 16L9 13"
                      className="opacity-40 animate-bounce"
                    />
                    <line
                      x1="12"
                      y1="22"
                      x2="12"
                      y2="10"
                      className="opacity-20"
                    />
                  </svg>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Wrapper - Increased Height significantly to prevent overlap */}
        <div className="relative h-auto">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-4 md:gap-40 relative">
            {/* LEFT COLUMN: Education */}
            <div
              className="relative h-full ml-4 md:ml-0"
              ref={eduRef}
              style={{
                // Mobile: Use its own height | Desktop: Match the taller column
                height: isMobile ? `${eduHeight}px` : `${maxHeight}px`,
              }}
            >
              {/* Progress Lines */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/[0.05]"
                style={{
                  // On desktop, we want the line on the RIGHT of the left col
                  // We set explicit height so it doesn't drag to bottom
                  height: isMobile ? "100%" : `${eduVisualHeight}px`,
                }}
              ></div>
              <div
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_20px_#3b82f6] transition-all duration-100 ease-out z-10"
                style={{
                  height: isMobile
                    ? `${eduProgress * 100}%`
                    : `${Math.min(eduProgress * maxHeight, eduVisualHeight)}px`,
                }}
              ></div>

              {/* Nodes on Left Edge */}
              {educationData.map((item, i) => {
                const effectivePos = getItemPos(item);
                return (
                  <div
                    key={`node-edu-${i}`}
                    className={`absolute left-0 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-black overflow-hidden z-20
                      ${eduProgress >= effectivePos
                        ? "border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-110"
                        : "border-white/10 grayscale opacity-20 scale-90"
                      }`}
                    style={{ top: `${effectivePos * 100}%` }}
                  >
                    <img
                      src={item.image}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}

              {educationData.map((item, i) => (
                <TimelineCard
                  key={`edu-${i}`}
                  item={item}
                  isLeft={true}
                  progressRatio={eduProgress} // Use eduProgress here
                  effectivePos={getItemPos(item)}
                  effectiveThreshold={getItemThreshold(item)}
                  borderColor={"hover:border-blue-400"}
                />
              ))}
            </div>

            {/* RIGHT COLUMN: Experience */}
            <div
              className="relative h-full mr-4 lg:mr-32"
              ref={expRef}
              style={{
                height: isMobile ? `${expHeight}px` : `${maxHeight}px`,
              }}
            >
              {/* Progress Lines */}
              <div
                className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/[0.05]"
                style={{
                  height: isMobile ? "100%" : `${expVisualHeight}px`,
                }}
              ></div>
              <div
                className="absolute right-0 top-0 w-[2px] bg-gradient-to-b from-purple-400 to-fuchsia-400 shadow-[0_0_20px_#a855f7] transition-all duration-100 ease-out z-10"
                style={{
                  height: isMobile
                    ? `${expProgress * 100}%`
                    : `${Math.min(expProgress * maxHeight, expVisualHeight)}px`,
                }}
              ></div>

              {/* Nodes on Right Edge */}
              {experienceData.map((item, i) => {
                const effectivePos = getItemPos(item);
                return (
                  <div
                    key={`node-exp-${i}`}
                    className={`absolute right-0 translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-black overflow-hidden z-20
                      ${expProgress >= effectivePos
                        ? "border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)] scale-110"
                        : "border-white/10 grayscale opacity-20 scale-90"
                      }`}
                    style={{ top: `${effectivePos * 100}%` }}
                  >
                    <img
                      src={item.image}
                      alt="logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}

              {experienceData.map((item, i) => (
                <TimelineCard
                  key={`exp-${i}`}
                  item={item}
                  isLeft={false}
                  progressRatio={expProgress} // Use expProgress here
                  effectivePos={getItemPos(item)}
                  effectiveThreshold={getItemThreshold(item)}
                  borderColor={"hover:border-purple-400"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          ref={footerRef}
          className={`mt-60 text-center pb-40 transition-all duration-1000 transform ${footerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20"
            }`}
        >
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent inline-block">
            <div className="bg-black/50 backdrop-blur-sm  p-12 rounded-[calc(1.5rem-1px)] border border-white/5 max-w-2xl">
              <p className="text-3xl font-bold mb-4 text-white">
                Ready for the Next Chapter?
              </p>
              <p className="text-gray-400 mb-10 leading-relaxed text-xl">
                I'm currently available for full-stack AI roles and innovative
                engineering projects.
              </p>
              <button
                onClick={() => (window.location.href = "mailto:priyanshu123sah@gmail.com")}
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(18px); opacity: 0; }
        }
        @keyframes path-flow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-dot {
          animation: scroll-dot 2.5s ease-in-out infinite;
        }
        .animate-path-flow {
          animation: path-flow 2.5s ease-in-out infinite;
        }
         @keyframes flow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `,
        }}
      />
    </div>
  );
};

export default Journey;
