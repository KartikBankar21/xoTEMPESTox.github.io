import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Github, ExternalLink, Activity, Box } from 'lucide-react';

// --- Configuration Constants ---
const CUBE_WIDTH = 200;
const GAP_WIDTH = 64; 
const ITEM_WIDTH = CUBE_WIDTH + GAP_WIDTH;
const AUTO_SLIDE_DELAY = 2500;
const SWIPE_THRESHOLD = 50;
const NUM_PHANTOM = 3;

const TechBadge = ({ icon: Icon, label, colorClass, textColor }) => (
  <div className={`flex items-center bg-slate-800 ${textColor} text-[11px] font-medium px-2 py-1 rounded-full border border-slate-700`}>
    {Icon && <Icon size={12} className={`mr-1.5 ${colorClass}`} />}
    <span>{label}</span>
  </div>
);



const Cube = ({ item, isDragging, onViewDetails }) => {
  const [overrideClass, setOverrideClass] = useState(''); 
  const cubeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isDragging) return;
    const rect = cubeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relX = (e.clientX - centerX) / (rect.width / 2);
    
    const THRESHOLD = 0.35;
    if (relX < -THRESHOLD) {
      setOverrideClass('right'); // Shows right face (Links)
    } else if (relX > THRESHOLD) {
      setOverrideClass('left'); // Shows left face (Tech)
    } else {
      setOverrideClass(''); // Front
    }
  };

  const handleLinkClick = (url) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const transformStyle = overrideClass === 'right' 
    ? 'translateZ(-100px) rotateY(90deg)' 
    : overrideClass === 'left'
    ? 'translateZ(-100px) rotateY(-90deg)'
    : 'translateZ(-100px) rotateY(0deg)';

    const showFront = (e) => {
    e.preventDefault();
    e.stopPropagation();
     setOverrideClass("");
   };

  return (
    <div 
      className="relative w-[200px] h-[200px] pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOverrideClass('')}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={cubeRef}
        className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: transformStyle
        }}
      >
        {/* FACE 1: Front */}
        <div 
          className={`absolute inset-0 w-[200px] h-[200px] bg-[#1a1a2e] text-gray-100 rounded-2xl shadow-2xl flex flex-col p-4 border border-white/10 transition-opacity duration-300 ${overrideClass === '' ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none'}`}
          style={{ transform: 'rotateY(0deg) translateZ(100px)', backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-bl-lg rounded-tr-lg shadow-lg flex-1">
           {item.tag}
           </div>
          <div className="mt-2 flex-1">
             <Activity className="w-5 h-5 text-green-400 mb-3" />
             <h3 className="text-lg font-bold leading-tight mb-2">
               {item.title}
             </h3>
             <p className="text-[11px] text-gray-400 leading-snug line-clamp-3">
               {item.description}
             </p>
         </div>

          <button
           onClick={(e) => { e.stopPropagation(); onViewDetails(item); }}
            className="mt-auto flex items-center justify-center text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
             View Details &rarr;
          </button>
        </div>

        {/* FACE 2: Left (Tech) */}
        <div 
          className={`absolute inset-0 w-[200px] h-[200px] bg-[#1a1a2e] rounded-2xl shadow-2xl border border-white/10 transition-opacity duration-300 ${overrideClass === 'left' ? 'opacity-100 pointer-events-auto' : 'opacity-100 pointer-events-none'}`}
          style={{ transform: 'rotateY(90deg) translateZ(100px)', backfaceVisibility: 'hidden' }}
        >
           <div className="relative p-4 h-full flex flex-col">
             <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>
             <div className="flex flex-wrap gap-2 content-start flex-grow">
              {item.techStack.map((tech) => (
                <TechBadge key={tech.name} label={tech.name} icon={tech.icon} colorClass={tech.color} textColor={tech.textColor} />
              ))}
               
             </div>
             <button
               onClick={showFront}
               className="mt-2 flex items-center text-xs text-blue-400 hover:text-blue-300 self-end"
             >
               Back &rarr;
             </button>
           </div>
        </div>

        {/* FACE 3: Right (Links) */}
        <div 
          className={`absolute inset-0 w-[200px] h-[200px] bg-[#0f172a] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col items-start justify-end transition-opacity duration-300 ${overrideClass === 'right' ? 'opacity-100 pointer-events-auto' : 'opacity-100 pointer-events-none'}`}
          style={{ transform: 'rotateY(-90deg) translateZ(100px)', backfaceVisibility: 'hidden' }}
        >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-90 pointer-events-none"
              style={{ backgroundImage: `url(${item.image_url})` }}
            />
            
            <div className="relative z-[100] flex gap-2 pointer-events-auto px-3 pt-4 pb-2 bg-sky-400 rounded-tr-4xl">
               <button 
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleLinkClick(item.links.github_link)}
                  className="p-3 bg-gray-800 hover:bg-black rounded-full text-white transition-all transform hover:scale-110 border border-white/20 shadow-xl cursor-pointer"
               >
                  <Github size={16} />
               </button>
               <button 
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={handleLinkClick(item.links.live_link)}
                  className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-all transform hover:scale-110 border border-white/20 shadow-xl cursor-pointer"
               >
                  <ExternalLink size={16} />
               </button>
            </div>
        </div>

 <div
          className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-[#1a1a2e] flex flex-col items-center justify-center text-center p-4 border border-white/10 rounded-2xl"
          style={{ transform: "rotateY(180deg) translateZ(100px)" }}
        >
          <div className="text-gray-400 text-sm">Repository</div>
          <div className="text-white text-xs mt-1 font-mono break-all opacity-70">
            {item.links.github_link.split("/").pop()}
          </div>
        </div>
                 {/* FACE 5: Top (Decorative) */}
        <div className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-400 flex items-center justify-center text-blue-900 font-bold opacity-50 rounded-2xl"
              style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}>
         </div>

         {/* FACE 6: Bottom (Decorative) */}
         <div
           className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-300 flex items-center justify-center text-blue-900 font-bold opacity-50 rounded-2xl"
           style={{ transform: "rotateX(90deg) translateZ(100px)" }}
         ></div>
      </div>
    </div>
  );
};

export default Cube;
