import React, { useState, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";

// --- Configuration Constants ---
const EDGE_THRESHOLD = 0.25;

// --- Sub-Components ---
const TechBadge = ({ label, slug, color, iconColor }) => {
  // slug is the lowercase name of the tech (e.g., 'googlechrome', 'react')
  // color is the official hex (e.g., '4285F4')

  return (
    <div
      style={{
        backgroundColor: `#${color}15`, // 15 is ~8% opacity
        borderColor: `#${color}30`, // 30 is ~20% opacity
      }}
      className="flex items-center px-2.5 py-1 rounded-full border backdrop-blur-sm transition-transform hover:scale-105"
    >
      <img
        src={`https://api.iconify.design/${slug}.svg`}
        alt={label}
        className={`w-4 h-4 min-[1265px]:w-5 min-[1265px]:h-5 mr-2 ${iconColor}`}
      />
      <span
        style={{ color: `#${color}` }}
        className="text-[11px] min-[1265px]:text-[13px]  font-semibold"
      >
        {label}
      </span>
    </div>
  );
};

const handleLinkClick = (url) => (e) => {
  e.stopPropagation();
  e.preventDefault();
  window.open(url, "_blank", "noopener,noreferrer");
};

const Cube = ({ item, onViewDetails, isDragging, width, height }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cubeRef = useRef(null);
  const rotationLockRef = useRef(false);
  const listRef = useRef(null);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0, opacity: 0 });

  // Handle mouse movement to update the grey glow position
  const gradientHoverMove = (e) => {
    if (listRef.current) {
      const rect = listRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setGlowPosition({ x, y, opacity: 1 });
    }
  };

  // Hide the glow when the mouse leaves
  const gradientHoverLeave = () => {
    setGlowPosition({ ...glowPosition, opacity: 0 });
  };

  // Show the glow when the mouse enters (for initial visibility if moved quickly)
  const gradientHoverEnter = () => {
    setGlowPosition((prev) => ({ ...prev, opacity: 1 }));
  };
  // We need to adjust the translateZ based on the new width to ensure faces meet correctly
  // For a cube, translateZ is usually width / 2
  const translateZ = width / 2;

  const handleMouseEnter = (e) => {
    if (isDragging || !cubeRef.current || rotationLockRef.current) return;

    const rect = cubeRef.current.getBoundingClientRect();
    const entryX = e.clientX - rect.left;
    const currentWidth = rect.width;

    const positionPercent = entryX / currentWidth;

    if (positionPercent < EDGE_THRESHOLD) {
      setRotation({ x: 0, y: 90 });
      rotationLockRef.current = true;
    } else if (positionPercent > 1 - EDGE_THRESHOLD) {
      setRotation({ x: 0, y: -90 });
      rotationLockRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    rotationLockRef.current = false;
  };

  const showFront = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRotation({ x: 0, y: 0 });
    rotationLockRef.current = false;
  };

  return (
    <div
      ref={cubeRef}
      className="relative transition-all duration-500 z-10 pointer-events-auto"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(-${translateZ}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* FRONT FACE */}
        <div
          className={`absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-sm border border-white/30 rounded-4xl p-5 overflow-hidden flex flex-col  backface-hidden transition-opacity duration-300 ${
            rotation.y !== 0 ? "opacity-100" : "opacity-100"
          }`}
          style={{
            transform: `rotateY(0deg) translateZ(${translateZ}px)`,
            pointerEvents: rotation.y !== 0 ? "none" : "auto",
          }}
          ref={listRef}
          onMouseMove={gradientHoverMove}
          onMouseLeave={gradientHoverLeave}
          onMouseEnter={gradientHoverEnter}
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

          <div
            className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none"
            onTouchMove={showFront}
          >
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

          <div className="absolute top-0 right-0 flex items-start justify-end mt-0 mb-6">
            <div className="text-start px-4 py-1 text-[9px] font-black text-white bg-zinc-800 rounded-bl-md border-l border-b border-white/10 uppercase ">
              {item.tag}
            </div>
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="mt-6 flex-1">
              <p
                className="text-2xl min-[1265px]:text-4xl font-bold leading-tight mb-1 uppercase tracking-tight 
              bg-gradient-to-r from-gray-400 via-white to-gray-500 bg-clip-text text-transparent text-center"
              >
                {item.title}
              </p>
              <p className="text-lg min-[1265px]:text-2xl text-zinc-500 leading-snug line-clamp-3 lg:line-clamp-none ">
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

          {/* Grey Cursor Glow Effect */}
          <div
            className="cursor-glow"
            style={{
              left: `${glowPosition.x}px`,
              top: `${glowPosition.y}px`,
              opacity: glowPosition.opacity,
              // Tailwind-like style for the glow itself:
              background:
                "radial-gradient(circle, rgba(30, 144, 255, 0.2) 0%, rgba(75, 0, 130, 0.1) 70%, transparent 100%)",
            }}
          ></div>
        </div>

        {/* LEFT FACE (Tech) */}
        <div
          className="absolute inset-0 bg-neutral-900 border border-white/30 rounded-4xl p-5 flex flex-col backface-hidden"
          style={{ transform: `rotateY(90deg) translateZ(${translateZ}px)` }}
        >
          <div className="relative p-4 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>

            <div className="flex flex-wrap gap-2 content-start flex-grow">
              {item.techStack.map((tech) => (
                <TechBadge
                  key={tech.name}
                  slug={tech.slug}
                  label={tech.name}
                  iconColor={tech.iconColor}
                  color={tech.color}
                />
              ))}
            </div>

            <button
              onClick={showFront}
              className="mt-2 flex items-baseline text-sm text-neutral-400 hover:text-white transition-colors self-end cursor-pointer"
            >
              <span>Back</span>
              <span className="text-3xl">&rarr;</span>
            </button>
          </div>
        </div>

        {/* RIGHT FACE (Links) */}
        <div
          className="absolute inset-0 bg-[#0f172a] border border-black/90 rounded-4xl  flex flex items-end justify-between gap-4 backface-hidden backdrop-blur-sm"
          style={{ transform: `rotateY(-90deg) translateZ(${translateZ}px)` }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90 rounded-4xl pointer-events-none"
            style={{ backgroundImage: `url(${item.image_url})` }}
          />
          <div className="relative z-[100] flex gap-3 px-4 pt-4 pb-3 bg-zinc-900 rounded-tr-3xl rounded-bl-4xl border-t border-r border-white/10">
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
