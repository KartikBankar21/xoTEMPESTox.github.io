import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Github, ExternalLink, Activity, Box } from 'lucide-react';

// --- Configuration Constants ---
const CUBE_WIDTH = 200;
const GAP_WIDTH = 64; 
const ITEM_WIDTH = CUBE_WIDTH + GAP_WIDTH;
const AUTO_SLIDE_DELAY = 2500;
const SWIPE_THRESHOLD = 50;
const NUM_PHANTOM = 3;

// --- Data ---
const rawPortfolioData = [
  {
    title: "Organizational Chatbot",
    description: "RAG-powered HR & IT assistant with secure 2FA and tool calling.",
    image_url: "https://placehold.co/200x200/0d1e3d/FFFFFF?text=Chatbot",
    tag: "AI/ML Project",
    links: {
      github_link: "https://github.com/xoTEMPESTox/Enerzal",
      live_link: "https://www.youtube.com/watch?v=azj_7OdSxcY"
    }
  },
  {
    title: "Eco Chain",
    description: "MERN + Blockchain marketplace for carbon credit tokenization.",
    image_url: "https://placehold.co/200x200/1e3a8a/FFFFFF?text=EcoChain",
    tag: "Web3 Ecosystem",
    links: {
      github_link: "https://github.com/xoTEMPESTox/EcoChain",
      live_link: "https://eco-chain-ashen.vercel.app/"
    }
  },
  {
    title: "Supplyzal",
    description: "Blockchain-based supply tracking with verified sustainability.",
    image_url: "https://placehold.co/200x200/2563eb/FFFFFF?text=Supplyzal",
    tag: "Blockchain Dapp",
    links: {
      github_link: "https://github.com/xoTEMPESTox/Supplyzal",
      live_link: "https://www.youtube.com/watch?v=CEGqZsqdnN8"
    }
  },
  {
    title: "LedgerPlay",
    description: "ERC20 based Staking Logic with Web socket based Multiplayer.",
    image_url: "https://placehold.co/200x200/3b82f6/FFFFFF?text=LedgerPlay",
    tag: "Gaming/Web3",
    links: {
      github_link: "https://github.com/xoTEMPESTox/LedgerPlay",
      live_link: "https://www.youtube.com/watch?v=w-SHifenCqE"
    }
  },
  {
    title: "WakeBot32",
    description: "ESP32 based WOL bot using Telegram API and Arduino IDE",
    image_url: "https://placehold.co/200x200/60a5fa/FFFFFF?text=WakeBot32",
    tag: "Hardware/IoT",
    links: {
      github_link: "https://github.com/xoTEMPESTox/WakeBot32",
      live_link: "https://youtu.be/fOirqvQiiFo"
    }
  },
  {
    title: "TradingviewPlus",
    description: "Open Source Contributor for Trading View extension.",
    image_url: "https://placehold.co/200x200/93c5fd/FFFFFF?text=TVPlus",
    tag: "OSS Contribution",
    links: {
      github_link: "https://github.com/Tiqur/TradingviewPlus",
      live_link: "https://chromewebstore.google.com/detail/tradingviewplus/pkcgjgllebhppgegpedlhjmabmnpcpec?hl=en&authuser=0"
    }
  },
  {
    title: "Portfolio Website",
    description: "Portfolio website Built with Quality and Performance in mind",
    image_url: "https://placehold.co/200x200/bfdbfe/000000?text=Portfolio",
    tag: "Personal Website",
    links: {
      github_link: "https://github.com/xoTEMPESTox/xoTEMPESTox.github.io",
      live_link: "https://priyanshusah.com"
    }
  },
  {
    title: "ML Kaggle Competition",
    description: "Hosted a Kaggle Competition under TCET ACM SIG AI 2025",
    image_url: "https://placehold.co/200x200/e0f2fe/000000?text=Kaggle",
    tag: "Competition Host",
    links: {
      github_link: "https://github.com/xoTEMPESTox/TCET_ACM_SIGAI_KAGGLE_COMP",
      live_link: "https://www.kaggle.com/competitions/acm-sigai-tcet"
    }
  }
];

const availableTech = [
  { name: 'React', color: 'text-blue-400' },
  { name: 'Node.js', color: 'text-green-400' },
  { name: 'MongoDB', color: 'text-yellow-400' },
  { name: 'Tailwind CSS', color: 'text-cyan-400' },
  { name: 'DigitalOcean', color: 'text-gray-400' },
  { name: 'TypeScript', color: 'text-blue-500' },
];

const portfolioData = rawPortfolioData.map(item => {
  const shuffled = [...availableTech].sort(() => 0.5 - Math.random());
  return { ...item, techStack: shuffled.slice(0, 5) };
});

const TechIcon = ({ name, className }) => {
  switch (name) {
    case 'React': return <Box className={className} />;
    case 'Node.js': return <Box className={className} />;
    case 'MongoDB': return <Box className={className} />;
    default: return <Box className={className} />;
  }
};

const Cube = ({ item, isDragging }) => {
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
           onClick={() => {
             showDetails;
             console.log("Show Details");
              setOverrideClass("rotate-y-[-90deg]");
            }}
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
               {item.techStack.map((tech, idx) => (
               <div
                   key={idx}
                   className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded text-[10px] text-white backdrop-blur-sm"
                >
                  <TechIcon
                     name={tech.name}
                     className={`w-3 h-3 ${tech.color}`}
                   />
                   <span>{tech.name}</span>
                 </div>
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

// export default function PortfolioCarousel() {
//   const realCount = portfolioData.length;
//   const cubeList = useMemo(() => {
//     const startClones = portfolioData.slice(-NUM_PHANTOM);
//     const endClones = portfolioData.slice(0, NUM_PHANTOM);
//     return [...startClones, ...portfolioData, ...endClones];
//   }, []);

//   const totalCubes = cubeList.length;
//   const realStartIndex = NUM_PHANTOM;
//   const realEndIndex = realStartIndex + realCount - 1;
//   const initialIndex = realStartIndex + Math.floor(realCount / 2);

//   const [activeIndex, setActiveIndex] = useState(initialIndex);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(true);
//   const [wrapperWidth, setWrapperWidth] = useState(0);
  
//   const wrapperRef = useRef(null);
//   const containerRef = useRef(null);
//   const startXRef = useRef(0);
//   const currentTranslateRef = useRef(0);
//   const draggingRef = useRef(false);
//   const autoSlideRef = useRef(null);
//   const isHoveringRef = useRef(false);

//   useEffect(() => {
//     const handleResize = () => containerRef.current && setWrapperWidth(containerRef.current.clientWidth);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const getTranslation = useCallback((index) => {
//     if (!wrapperWidth) return 0;
//     return (wrapperWidth / 2) - (index * ITEM_WIDTH + (CUBE_WIDTH / 2));
//   }, [wrapperWidth]);

//   const stopAutoSlide = useCallback(() => {
//     if (autoSlideRef.current) { clearInterval(autoSlideRef.current); autoSlideRef.current = null; }
//   }, []);

//   const startAutoSlide = useCallback(() => {
//     stopAutoSlide();
//     if (isHoveringRef.current) return;
//     autoSlideRef.current = setInterval(() => {
//       setActiveIndex(prev => prev + 1);
//       setIsTransitioning(true);
//     }, AUTO_SLIDE_DELAY);
//   }, [stopAutoSlide]);

//   useEffect(() => {
//     startAutoSlide();
//     return stopAutoSlide;
//   }, [startAutoSlide]);

//   useEffect(() => {
//     if (!isTransitioning) return;
//     if (activeIndex > realEndIndex) {
//       setTimeout(() => { setIsTransitioning(false); setActiveIndex(realStartIndex); }, 800);
//     } else if (activeIndex < realStartIndex) {
//       setTimeout(() => { setIsTransitioning(false); setActiveIndex(realEndIndex); }, 800);
//     }
//   }, [activeIndex, isTransitioning, realEndIndex, realStartIndex]);

//   const handleDragStart = (clientX) => {
//     stopAutoSlide();
//     draggingRef.current = true;
//     setIsDragging(true);
//     startXRef.current = clientX;
//     setIsTransitioning(false);
//     currentTranslateRef.current = getTranslation(activeIndex);
//   };

//   const handleDragMove = (clientX) => {
//     if (!draggingRef.current) return;
//     const delta = clientX - startXRef.current;
//     if (wrapperRef.current) {
//       wrapperRef.current.style.transform = `translateX(${currentTranslateRef.current + delta}px)`;
//     }
//   };

//   const handleDragEnd = (clientX) => {
//     if (!draggingRef.current) return;
//     draggingRef.current = false;
//     setIsDragging(false);
//     const delta = clientX - startXRef.current;
//     let direction = 0;
//     if (delta < -SWIPE_THRESHOLD) direction = 1;
//     else if (delta > SWIPE_THRESHOLD) direction = -1;
//     setIsTransitioning(true);
//     setActiveIndex(prev => prev + direction);
//     if (!isHoveringRef.current) startAutoSlide();
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden flex flex-col items-center">
//       <header className="pt-16 pb-8 text-center px-4 relative z-10">
//         <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">PROJECTS</h1>
//         <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full" />
//       </header>

//       <div 
//         ref={containerRef}
//         className="w-full h-[450px] relative flex items-center justify-center touch-none overflow-visible"
//         style={{ perspective: '1200px' }}
//         onMouseEnter={() => { isHoveringRef.current = true; stopAutoSlide(); }}
//         onMouseLeave={(e) => { 
//           isHoveringRef.current = false; 
//           if (draggingRef.current) handleDragEnd(e.clientX);
//           else startAutoSlide();
//         }}
//         onPointerDown={(e) => {
//           if (e.target.closest('button')) return;
//           handleDragStart(e.clientX);
//         }}
//         onPointerMove={(e) => handleDragMove(e.clientX)}
//         onPointerUp={(e) => handleDragEnd(e.clientX)}
//       >
//         <div
//           ref={wrapperRef}
//           className="flex items-center absolute left-0 h-full will-change-transform"
//           style={{
//             transform: `translateX(${getTranslation(activeIndex)}px)`,
//             gap: `${GAP_WIDTH}px`,
//             transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
//             transformStyle: 'preserve-3d'
//           }}
//         >
//           {cubeList.map((item, index) => (
//             <Cube key={`${index}-${item.title}`} item={item} isDragging={isDragging} />
//           ))}
//         </div>

//         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
//         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
//       </div>

//       <footer className="mt-auto pb-12 text-center text-gray-500 text-[10px] tracking-widest uppercase">
//         Hover edges to rotate • Drag to navigate
//       </footer>
//     </div>
//   );
// }