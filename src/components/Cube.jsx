import React, { useState, useRef } from "react";
import { Github, ExternalLink, Activity } from "lucide-react";

const CUBE_WIDTH = 200;
const EDGE_THRESHOLD = 0.25; // Only trigger rotation within 25% from edges

const TechBadge = ({ icon: Icon, label, colorClass, textColor }) => (
  <div
    className={`flex items-center bg-slate-800 ${textColor} text-[11px] font-medium px-2 py-1 rounded-full border border-slate-700`}
  >
    {Icon && <Icon size={12} className={`mr-1.5 ${colorClass}`} />}
    <span>{label}</span>
  </div>
);

const Cube = ({ item, isDragging, onViewDetails }) => {
  const [overrideClass, setOverrideClass] = useState("");
  const containerRef = useRef(null);
  const rotationLockRef = useRef(false);

  const handleMouseEnter = (e) => {
    if (isDragging || !containerRef.current || rotationLockRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const entryX = e.clientX - rect.left;
    const width = rect.width;

    // Calculate position as percentage from left
    const positionPercent = entryX / width;

    // Only rotate if entering from the edges (first 25% or last 25%)
    if (positionPercent < EDGE_THRESHOLD) {
      // Entered from LEFT EDGE -> Show Face 3 (Links)
      setOverrideClass("right");
      rotationLockRef.current = true;
    } else if (positionPercent > (1 - EDGE_THRESHOLD)) {
      // Entered from RIGHT EDGE -> Show Face 2 (Tech)
      setOverrideClass("left");
      rotationLockRef.current = true;
    }
    // If entering from middle (25% - 75%), do nothing (stay on Face 1)
  };

  const handleMouseLeave = () => {
    // Reset to Front Face and unlock rotation
    setOverrideClass("");
    rotationLockRef.current = false;
  };

  const handleLinkClick = (url) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const transformStyle =
    overrideClass === "right"
      ? "translateZ(-100px) rotateY(90deg)"
      : overrideClass === "left"
      ? "translateZ(-100px) rotateY(-90deg)"
      : "translateZ(-100px) rotateY(0deg)";

  const showFront = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOverrideClass("");
    rotationLockRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[200px] h-[200px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", pointerEvents: "auto" }}
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
            overrideClass === "" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "rotateY(0deg) translateZ(100px)",
            backfaceVisibility: "hidden",
            pointerEvents: overrideClass === "" ? "auto" : "none",
          }}
        >
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
              background: radial-gradient(
                circle at bottom left, 
                rgba(255,255,255,0.2) 0% 20%, 
                rgba(255,255,255,0.1) 20% 45%, 
                rgba(255,255,255,0.05) 45% 70%, 
                transparent 70% 100%
              );
              border-radius: 0 100% 0 0;
              animation: stepped-pulse 3s ease-out infinite;
            }
            .stepped-arc-right {
              background: radial-gradient(
                circle at bottom right, 
                rgba(255,255,255,0.2) 0% 20%, 
                rgba(255,255,255,0.1) 20% 45%, 
                rgba(255,255,255,0.05) 45% 70%, 
                transparent 70% 100%
              );
              border-radius: 100% 0 0 0;
            }
          `}</style>

          <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
            <div className="stepped-arc origin-bottom-left" />
            <div className="absolute bottom-4 left-4 animate-[chevron-move_2s_infinite]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline
                  points="7 17 17 17 17 7"
                  transform="rotate(-90 12 12)"
                />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
            <div className="stepped-arc stepped-arc-right origin-bottom-right" />
            <div className="absolute bottom-4 right-4 animate-[chevron-move_2s_infinite] scale-x-[-1]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline
                  points="7 17 17 17 17 7"
                  transform="rotate(-90 12 12)"
                />
              </svg>
            </div>
          </div>

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
              <p className="text-2xl font-bold text-white leading-tight mb-1 uppercase tracking-tight">
                {item.title}
              </p>
              <p className="text-lg text-zinc-500 leading-snug line-clamp-3">
                {item.description}
              </p>
            </div>

            <button
              className="flex items-baseline justify-center text-[10px] text-zinc-400 font-bold hover:text-white transition-all uppercase tracking-widest pt-3 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(item);
              }}
            >
              <span>View Details</span>
              <span className="text-3xl">&rarr;</span>
            </button>
          </div>
        </div>

        {/* FACE 2: Left (Tech Stack) */}
        <div
          className={`absolute inset-0 w-full h-full bg-neutral-900 rounded-2xl shadow-2xl border border-white/20 transition-opacity duration-300 ${
            overrideClass === "left" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "rotateY(90deg) translateZ(100px)",
            backfaceVisibility: "hidden",
            pointerEvents: overrideClass === "left" ? "auto" : "none",
          }}
        >
          <div className="relative p-4 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>

            <div className="flex flex-wrap gap-2 content-start flex-grow">
              {item.techStack.map((tech) => (
                <TechBadge
                  key={tech.name}
                  label={tech.name}
                  icon={tech.icon}
                  colorClass={tech.color}
                  textColor={tech.textColor}
                />
              ))}
            </div>

            <button
              onClick={showFront}
              className="mt-2 flex items-center text-xs text-neutral-400 hover:text-white transition-colors self-end cursor-pointer"
            >
              Back &rarr;
            </button>
          </div>
        </div>

        {/* FACE 3: Right (Links) */}
        <div
          className={`absolute inset-0 w-full h-full bg-[#0f172a] rounded-2xl shadow-2xl border border-black/90 overflow-hidden flex flex-col items-start justify-end transition-opacity duration-300 ${
            overrideClass === "right" ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "rotateY(-90deg) translateZ(100px)",
            backfaceVisibility: "hidden",
            pointerEvents: overrideClass === "right" ? "auto" : "none",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90 pointer-events-none"
            style={{ backgroundImage: `url(${item.image_url})` }}
          />

          <div className="relative z-[100] flex gap-3 px-4 pt-4 pb-3 bg-zinc-900 rounded-tr-3xl border-t border-r border-white/10">
            <button
              onClick={handleLinkClick(item.links.github_link)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="w-14 h-14 flex items-center justify-center bg-black hover:bg-zinc-800 text-white rounded-full transition-all transform hover:scale-110 border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
              style={{ pointerEvents: "auto" }}
            >
              <Github size={18} />
            </button>

            <button
              onClick={handleLinkClick(item.links.live_link)}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="w-14 h-14 flex items-center justify-center bg-white hover:bg-zinc-200 text-black rounded-full transition-all transform hover:scale-110 border border-black/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer"
              style={{ pointerEvents: "auto" }}
            >
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cube;

{
  /* FACE 4 */
}
{
  /* <div
          className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-[#1a1a2e] flex flex-col items-center justify-center text-center p-4 border border-white/10 rounded-2xl"
          style={{ transform: "rotateY(180deg) translateZ(100px)" }}
        >
          <div className="text-gray-400 text-sm">Repository</div>
          <div className="text-white text-xs mt-1 font-mono break-all opacity-70">
            {item.links.github_link.split("/").pop()}
          </div>
        </div> */
}
{
  /* FACE 5: Top (Decorative) */
}
{
  /* <div
          className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-400 flex items-center justify-center text-blue-900 font-bold opacity-50 rounded-2xl"
          style={{ transform: "rotateX(-90deg) translateZ(100px)" }}
        ></div> */
}

{
  /* FACE 6: Bottom (Decorative) */
}
{
  /* <div
          className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-300 flex items-center justify-center text-blue-900 font-bold opacity-50 rounded-2xl"
          style={{ transform: "rotateX(90deg) translateZ(100px)" }}
        ></div> */
}
