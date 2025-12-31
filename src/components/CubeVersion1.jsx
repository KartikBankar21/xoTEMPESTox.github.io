import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { 
  X, TrendingUp, Globe, Terminal, Server, Database, 
  Cloud, Palette, Github, ExternalLink, Activity, Box,
  Cpu, Layout, Layers, ShieldCheck, Zap, Code
} from 'lucide-react';

// --- Constants (now only for logic, not sizing) ---
const AUTO_SLIDE_DELAY = 2500;
const SWIPE_THRESHOLD = 50;
const NUM_PHANTOM = 3;

// --- Shared Components ---

const TechBadge = ({ icon: Icon, label, colorClass, textColor }) => (
  <div className={`flex items-center bg-slate-800 ${textColor} text-[10px] md:text-[11px] font-medium px-2 py-1 rounded-full border border-slate-700`}>
    {Icon && <Icon size={12} className={`mr-1.5 ${colorClass}`} />}
    <span>{label}</span>
  </div>
);

const CubeVersion = ({ item, isDragging, onViewDetails, size }) => {
  const [overrideClass, setOverrideClass] = useState("");
  const containerRef = useRef(null);
  const halfSize = size / 2;

  // Handle hover direction logic based on dynamic size
  const handleMouseEnter = (e) => {
    if (isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const entryX = e.clientX - rect.left; 

    if (entryX < size / 2) {
      setOverrideClass("right"); // Show Links
    } else {
      setOverrideClass("left"); // Show Tech
    }
  };

  const handleMouseLeave = () => {
    setOverrideClass("");
  };

  const handleLinkClick = (url) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const showFront = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOverrideClass("");
  };

  // Dynamic 3D Transform based on current size
  const transformStyle =
    overrideClass === "right"
      ? `translateZ(-${halfSize}px) rotateY(90deg)`
      : overrideClass === "left"
      ? `translateZ(-${halfSize}px) rotateY(-90deg)`
      : `translateZ(-${halfSize}px) rotateY(0deg)`;

  return (
    <div
      ref={containerRef}
      className="relative pointer-events-auto "
      style={{ 
        width: size, 
        height: size, 
        perspective: '1000px',
        transformStyle: "preserve-3d"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={{
          transformStyle: "preserve-3d",
          transform: transformStyle,
        }}
      >
        {/* FACE 1: Front (Main Content) */}
        <div
          className={`absolute inset-0 w-full h-full bg-[#0a0a0a]/90 backdrop-blur-sm text-gray-100 rounded-2xl shadow-2xl flex flex-col p-4 border border-white/10 transition-opacity duration-300 overflow-hidden ${
            overrideClass === "" ? "opacity-100" : "opacity-100"
          }`}
          style={{
            transform: `rotateY(0deg) translateZ(${halfSize}px)`,
            backfaceVisibility: "hidden",
          }}
        >
          {/* Animated Background Elements */}
          <style>{`
            @keyframes stepped-pulse {
              0% { transform: scale(0.5); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: scale(1.4); opacity: 0; }
            }
            @keyframes chevron-move {
              0%, 100% { transform: translate(0, 0); opacity: 0.3; }
              50% { transform: translate(6px, -6px); opacity: 1; }
            }
            .stepped-arc {
              position: absolute;
              width: 100%;
              height: 100%;
              background: radial-gradient(circle at bottom left, rgba(255,255,255,0.2) 0%, transparent 70%);
              border-radius: 0 100% 0 0;
              animation: stepped-pulse 3s ease-out infinite;
            }
            .stepped-arc-right {
              background: radial-gradient(circle at bottom right, rgba(255,255,255,0.2) 0%, transparent 70%);
              border-radius: 100% 0 0 0;
            }
          `}</style>
          
          <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
            <div className="stepped-arc origin-bottom-left" />
            <div className="absolute bottom-4 left-4 animate-[chevron-move_2s_infinite]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 17 17 17 17 7" transform="rotate(-90 12 12)" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
            <div className="stepped-arc stepped-arc-right origin-bottom-right" />
            <div className="absolute bottom-4 right-4 animate-[chevron-move_2s_infinite] scale-x-[-1]">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 17 17 17 17 7" transform="rotate(-90 12 12)" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mt-0">
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center mb-3 border border-white/10">
                <Activity className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="self-start px-2 py-1 text-[9px] font-black text-white bg-zinc-800 rounded-bl-md border-l border-b border-white/10 -mt-4 -mr-4 uppercase ">
                {item.tag}
              </div>
            </div>

            <div className="mt-2 flex-1">
              <p className="text-xl md:text-2xl font-bold text-white leading-tight mb-1 uppercase tracking-tight line-clamp-2">
                {item.title}
              </p>
              <p className="text-sm md:text-base text-zinc-500 leading-snug line-clamp-3">
                {item.description}
              </p>
            </div>

            <button
              className="mt-auto flex items-center justify-center text-[10px] text-zinc-400 font-bold hover:text-white transition-all uppercase tracking-widest pt-3"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
            >
              <span>View Details</span>
              <span className="text-xl md:text-3xl ml-1">&rarr;</span>
            </button>
          </div>
        </div>

        {/* FACE 2: Left (Tech Stack) */}
        <div
          className={`absolute inset-0 w-full h-full bg-neutral-900 rounded-2xl shadow-2xl border border-white/20 transition-opacity duration-300 ${
            overrideClass === "left" ? "opacity-100 pointer-events-auto" : "opacity-100 pointer-events-none"
          }`}
          style={{
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="relative p-4 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 content-start flex-grow">
              {item.techStack.map((tech) => (
                <TechBadge key={tech.name} label={tech.name} icon={tech.icon} colorClass={tech.color} textColor={tech.textColor} />
              ))}
            </div>
            <button onClick={showFront} className="mt-2 flex items-center text-xs text-neutral-400 hover:text-white transition-colors self-end">
              Back &rarr;
            </button>
          </div>
        </div>

        {/* FACE 3: Right (Links) */}
        <div
          className={`absolute inset-0 w-full h-full bg-[#0f172a] rounded-2xl shadow-2xl border border-black/60 overflow-hidden flex flex-col items-start justify-end transition-opacity duration-300 ${
            overrideClass === "right" ? "opacity-100 pointer-events-auto" : "opacity-100 pointer-events-none"
          }`}
          style={{
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90 pointer-events-none"
            style={{ backgroundImage: `url(${item.image_url})` }}
          />
          <div className="relative z-[100] flex gap-3 pointer-events-auto px-4 pt-4 pb-3 bg-zinc-900 rounded-tr-3xl border-t border-r border-white/10">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleLinkClick(item.links.github_link)}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black hover:bg-zinc-800 text-white rounded-full transition-all transform hover:scale-110 border border-white/20 shadow-lg cursor-pointer"
            >
              <Github size={18} />
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleLinkClick(item.links.live_link)}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white hover:bg-zinc-200 text-black rounded-full transition-all transform hover:scale-110 border border-black/10 shadow-lg cursor-pointer"
            >
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeVersion;