import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  X, Globe, Terminal, Server, Database, 
  Github, ExternalLink, Activity, Box,
  Cpu, Layout, Layers, ShieldCheck, Zap, Code, Palette
} from 'lucide-react';

// --- Configuration Constants ---
const CUBE_WIDTH = 200;
const GAP_WIDTH = 64; 
const ITEM_WIDTH = CUBE_WIDTH + GAP_WIDTH;
const AUTO_SLIDE_DELAY = 2500;
const SWIPE_THRESHOLD = 50;
const NUM_PHANTOM = 3;
const EDGE_THRESHOLD = 0.25; 
// --- Data ---
const rawPortfolioData = [
  {
    id: "org-chatbot",
    title: "Organizational Chatbot",
    tagline: "RAG-powered AI assistant for streamlined HR & IT support",
    description: "A sophisticated AI-driven assistant utilizing Retrieval-Augmented Generation (RAG) to provide accurate answers from internal documentation. It features secure authentication and dynamic tool calling for real-time task execution.",
    tag: "AI/ML Project",
    highlights: [
      "Implemented RAG architecture for context-aware responses",
      "Integrated 2FA security protocols using TOTP",
      "Built dynamic tool-calling functionality",
      "Developed custom React-based chat interface"
    ],
    techStack: [
      { name: 'Python', icon: Code, color: 'text-blue-400' },
      { name: 'OpenAI', icon: Zap, color: 'text-green-400' },
      { name: 'React', icon: Terminal, color: 'text-cyan-400' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/Enerzal",
      live_link: "https://www.youtube.com/watch?v=azj_7OdSxcY"
    }
  },
  {
    id: "eco-chain",
    title: "Eco Chain",
    tagline: "Blockchain marketplace for carbon credit tokenization",
    description: "A decentralized ecosystem designed to tokenize carbon credits, enabling businesses to trade environmental assets with full auditability.",
    tag: "Web3 Ecosystem",
    highlights: [
      "Developed smart contracts for ERC-20 tokenization",
      "Built MERN-stack dashboard for tracking footprint",
      "Integrated MetaMask for Web3 authentication",
      "Designed custom ledger view for permanent auditing"
    ],
    techStack: [
      { name: 'Solidity', icon: ShieldCheck, color: 'text-gray-400' },
      { name: 'Ethereum', icon: Layers, color: 'text-indigo-400' },
      { name: 'Node.js', icon: Server, color: 'text-green-500' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/EcoChain",
      live_link: "https://eco-chain-ashen.vercel.app/"
    }
  },
  {
    id: "supplyzal",
    title: "Supplyzal",
    tagline: "Blockchain-based supply tracking with verified sustainability",
    description: "A comprehensive supply chain tool leveraging blockchain to verify origin and sustainability at every stage.",
    tag: "Blockchain Dapp",
    highlights: [
      "Created transparent tracking for high-value assets",
      "Utilized decentralized storage (IPFS)",
      "Reduced logistics verification time by 40%",
      "Integrated QR-code based scanning"
    ],
    techStack: [
      { name: 'Hardhat', icon: Box, color: 'text-yellow-500' },
      { name: 'React', icon: Terminal, color: 'text-cyan-400' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/Supplyzal",
      live_link: "https://www.youtube.com/watch?v=CEGqZsqdnN8"
    }
  },
  {
    id: "ledger-play",
    title: "LedgerPlay",
    tagline: "Multiplayer Web3 gaming with token staking mechanics",
    description: "A competitive multiplayer gaming platform where players stake tokens in real-time matches using WebSockets.",
    tag: "Gaming/Web3",
    highlights: [
      "Engineered high-concurrency WebSocket server",
      "Implemented ERC-20 staking logic",
      "Designed interactive lobby system",
      "Optimized game assets for 60FPS"
    ],
    techStack: [
      { name: 'Socket.io', icon: Zap, color: 'text-white' },
      { name: 'Solidity', icon: ShieldCheck, color: 'text-blue-400' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/LedgerPlay",
      live_link: "https://www.youtube.com/watch?v=w-SHifenCqE"
    }
  },
  {
    id: "wakebot32",
    title: "WakeBot32",
    tagline: "IoT Wake-on-LAN controller with Telegram integration",
    description: "Hardware-based solution using ESP32 to remotely wake computers via a Telegram bot.",
    tag: "Hardware/IoT",
    highlights: [
      "Programmed ESP32 using C++",
      "Built secure Telegram bot bridge",
      "Implemented auto-reconnect logic",
      "Designed custom PCB layout"
    ],
    techStack: [
      { name: 'C++', icon: Code, color: 'text-blue-500' },
      { name: 'ESP32', icon: Cpu, color: 'text-orange-500' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/WakeBot32",
      live_link: "https://youtu.be/fOirqvQiiFo"
    }
  },
  {
    id: "tv-plus",
    title: "TradingviewPlus",
    tagline: "OSS extension enhancing TradingView",
    description: "Open-source utility adding advanced charting tools and custom themes to TradingView.",
    tag: "OSS Contribution",
    highlights: [
      "Contributed to core extension architecture",
      "Developed custom CSS injection engine",
      "Optimized DOM manipulation scripts",
      "Managed community PRs"
    ],
    techStack: [
      { name: 'JS', icon: Code, color: 'text-yellow-400' },
      { name: 'Chrome API', icon: Layout, color: 'text-red-400' }
    ],
    links: {
      github_link: "https://github.com/Tiqur/TradingviewPlus",
      live_link: "https://chromewebstore.google.com"
    }
  },
  {
    id: "portfolio-web",
    title: "Portfolio",
    tagline: "High-performance interactive showcase",
    description: "A bespoke portfolio with a focus on creative engineering and 3D interactions.",
    tag: "Personal Website",
    highlights: [
      "100/100 Lighthouse score",
      "Advanced CSS 3D transforms",
      "Fully responsive layout",
      "Framer Motion animations"
    ],
    techStack: [
      { name: 'React', icon: Terminal, color: 'text-cyan-400' },
      { name: 'Tailwind', icon: Palette, color: 'text-sky-400' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/xoTEMPESTox.github.io",
      live_link: "https://priyanshusah.com"
    }
  },
  {
    id: "ml-kaggle",
    title: "ML Kaggle",
    tagline: "Organized ML challenge for data scientists",
    description: "Planned and hosted a competitive data science event with complex datasets.",
    tag: "Competition Host",
    highlights: [
      "Curated dataset of 10k samples",
      "Managed competition platform",
      "Conducted post-comp analysis",
      "Collaborated with partners"
    ],
    techStack: [
      { name: 'Python', icon: Code, color: 'text-blue-400' },
      { name: 'Pandas', icon: Database, color: 'text-blue-600' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/TCET_ACM_SIGAI_KAGGLE_COMP",
      live_link: "https://www.kaggle.com/competitions/acm-sigai-tcet"
    }
  }
];


// --- Sub-Components ---
const TechBadge = ({ icon: Icon, label, colorClass, textColor }) => (
  <div
    className={`flex items-center bg-slate-800 ${textColor} text-[11px] font-medium px-2 py-1 rounded-full border border-slate-700`}
  >
    {Icon && <Icon size={12} className={`mr-1.5 ${colorClass}`} />}
    <span>{label}</span>
  </div>
); 

const DetailCard = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <p className="text-slate-300 leading-relaxed">{project.description}</p>
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Highlights</h3>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start text-sm text-slate-400 leading-tight">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.6)]" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="p-6 border-t border-slate-800 flex gap-4 bg-slate-900/50">
          <a href={project.links.github_link} target="_blank" rel="noreferrer" className="flex-1 py-3 px-4 bg-slate-800 text-white rounded-xl text-center font-bold flex items-center justify-center gap-2 hover:bg-slate-700 transition-all active:scale-95 border border-slate-700">
            <Github size={18}/> Github
          </a>
          <a href={project.links.live_link} target="_blank" rel="noreferrer" className="flex-[2] py-3 px-4 bg-indigo-600 text-white rounded-xl text-center font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
            <Globe size={18}/> Visit Project
          </a>
        </div>
      </div>
    </div>
  );
};

const handleLinkClick = (url) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, "_blank", "noopener,noreferrer");
  };

const Cube3 = ({ item, onViewDetails, isDragging }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cubeRef = useRef(null);
  const rotationLockRef = useRef(false);

   const handleMouseEnter = (e) => {
    if (isDragging || !cubeRef.current || rotationLockRef.current) return;

    const rect = cubeRef.current.getBoundingClientRect();
    const entryX = e.clientX - rect.left;
    const width = rect.width;

    // Calculate position as percentage from left
    const positionPercent = entryX / width;

    // Only rotate if entering from the edges (first 25% or last 25%)
    if (positionPercent < EDGE_THRESHOLD) {
      // Entered from LEFT EDGE -> Show Face 3 (Links)
      setRotation({ x: 0, y: 90 });
      rotationLockRef.current = true;
    } else if (positionPercent > (1 - EDGE_THRESHOLD)) {
      // Entered from RIGHT EDGE -> Show Face 2 (Tech)
      setRotation({ x: 0, y: -90 });
      rotationLockRef.current = true;
    }
    // If entering from middle (25% - 75%), do nothing (stay on Face 1)
  };

   const handleMouseLeave = () => {
    // Reset to Front Face and unlock rotation
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
      className="relative w-[200px] h-[200px] transition-all duration-500 z-10 pointer-events-auto"
      style={{ perspective: '1200px', transformStyle:'preserve-3d' }}
    onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `translateZ(-100px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
        }}
      >
        {/* FRONT FACE */}
        <div 
          className={`absolute inset-0 bg-[#0f172a] border border-slate-800 rounded-2xl p-5 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] backface-hidden transition-opacity duration-300 ${rotation.y !== 0 ? 'opacity-100' : 'opacity-100'}`}
          style={{ transform: 'rotateY(0deg) translateZ(100px)', pointerEvents: rotation.y !== 0 ? 'none' : 'auto' }}
        >
          <div className="absolute top-0 right-0 px-2 py-0.5 text-[8px] font-black text-white bg-indigo-600 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">{item.tag}</div>
          <div className="flex-1 mt-2">
            <Activity size={18} className="text-indigo-400 mb-2" />
            <h3 className="text-white font-bold leading-tight text-base mb-1">{item.title}</h3>
            <p className="text-[10px] text-slate-400 line-clamp-3 leading-snug">{item.tagline}</p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onViewDetails(item); }}
            className="mt-4 w-full py-2 bg-indigo-600/10 border border-indigo-600/30 text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
          >
            Detailed View
          </button>
        </div>

        {/* LEFT FACE (Tech) */}
        <div 
          className="absolute inset-0 bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-col backface-hidden"
          style={{ transform: 'rotateY(90deg) translateZ(100px)' }}
        >
           <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Tech Stack</div>
           <div className="flex flex-wrap gap-2">
             {item.techStack.map(t => (
               <div key={t.name} className="px-2 py-1 bg-white/5 rounded-md text-[9px] text-white flex items-center gap-1.5 border border-white/5">
                 <t.icon size={10} className={t.color} /> {t.name}
               </div>
             ))}
           </div>
        </div>

        {/* RIGHT FACE (Links) */}
        <div 
          className="absolute inset-0 bg-indigo-950/90 border border-indigo-800 rounded-2xl  flex flex-col items-start justify-end gap-4 backface-hidden backdrop-blur-sm"
          style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}
        >
         <div
            className="absolute inset-0 bg-cover bg-center opacity-90 pointer-events-none rounded-2xl"
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


const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const realCount = rawPortfolioData.length;
  
  const cubeList = useMemo(() => {
    const startClones = rawPortfolioData.slice(-NUM_PHANTOM);
    const endClones = rawPortfolioData.slice(0, NUM_PHANTOM);
    return [...startClones, ...rawPortfolioData, ...endClones];
  }, []);

  const realStartIndex = NUM_PHANTOM;
  const realEndIndex = realStartIndex + realCount - 1;
  const initialIndex = realStartIndex + Math.floor(realCount / 2);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const draggingRef = useRef(false);
  const autoSlideRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const handleResize = () => containerRef.current && setContainerWidth(containerRef.current.clientWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTranslation = useCallback((index) => {
    if (!containerWidth) return 0;
    return (containerWidth / 2) - (index * ITEM_WIDTH + (CUBE_WIDTH / 2));
  }, [containerWidth]);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    if (isHoveringRef.current) return;
    autoSlideRef.current = setInterval(() => {
      setActiveIndex(prev => prev + 1);
      setIsTransitioning(true);
    }, AUTO_SLIDE_DELAY);
  }, [stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide]);

  useEffect(() => {
    if (!isTransitioning) return;
    if (activeIndex > realEndIndex) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(realStartIndex);
      }, 800);
    } else if (activeIndex < realStartIndex) {
      setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(realEndIndex);
      }, 800);
    }
  }, [activeIndex, isTransitioning, realEndIndex, realStartIndex]);

  const handleDragStart = (clientX) => {
    stopAutoSlide();
    draggingRef.current = true;
    setIsDragging(true);
    startXRef.current = clientX;
    setIsTransitioning(false);
    currentTranslateRef.current = getTranslation(activeIndex);
  };

  const handleDragMove = (clientX) => {
    if (!draggingRef.current) return;
    const delta = clientX - startXRef.current;
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateX(${currentTranslateRef.current + delta}px)`;
    }
  };

  const handleDragEnd = (clientX) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    const delta = clientX - startXRef.current;
    let direction = 0;
    if (delta < -SWIPE_THRESHOLD) direction = 1;
    else if (delta > SWIPE_THRESHOLD) direction = -1;
    setIsTransitioning(true);
    setActiveIndex(prev => prev + direction);
    if (!isHoveringRef.current) startAutoSlide();
  };

  return (
    <div className="min-h-screen text-white flex flex-col overflow-hidden selection:bg-indigo-500/30">
      
    
    <header className="mt-6 text-center px-4 z-10 flex justify-center items-center">
         <div className="bg-black/50 backdrop-blur-sm rounded-4xl w-fit p-6 md:p-12 border border-white/5">
           <p className="text-6xl md:text-8xl lg:text-9xl font-black mb-0 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-black/20 uppercase">
             Portfolio
           </p>
         </div>
       </header>

      <div 
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing overflow-visible px-12"
        style={{ perspective: '1200px' }}
        onMouseEnter={() => { isHoveringRef.current = true; stopAutoSlide(); }}
        onMouseLeave={(e) => { 
          isHoveringRef.current = false; 
          if (draggingRef.current) handleDragEnd(e.clientX);
          else startAutoSlide();
        }}
        onPointerDown={(e) => {
          if (e.target.closest('button') || e.target.closest('a')) return;
          handleDragStart(e.clientX);
        }}
        onPointerMove={(e) => handleDragMove(e.clientX)}
        onPointerUp={(e) => handleDragEnd(e.clientX)}
      >
        <div 
          ref={wrapperRef}
          className="flex items-center absolute h-[400px] will-change-transform"
          style={{
            transform: `translateX(${getTranslation(activeIndex)}px)`,
            gap: `${GAP_WIDTH}px`,
            transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          {cubeList.map((item, idx) => (
            <Cube 
              key={`${idx}-${item.id}`} 
              item={item} 
              onViewDetails={setSelectedProject}
              isDragging={isDragging}
            />
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none z-40" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none z-40" />
      </div>

      <footer className="py-12 text-center relative z-20">
        <p className="text-slate-500 font-mono tracking-[0.3em] uppercase text-[10px] md:text-xs">
          Hover edges to rotate • Drag to navigate
        </p>
      </footer>

      <DetailCard project={selectedProject} onClose={() => setSelectedProject(null)} />

      <style>{`
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

const SingleCube = ({ item, onViewDetails, isDragging, width, height }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cubeRef = useRef(null);
  const rotationLockRef = useRef(false);

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
    } else if (positionPercent > (1 - EDGE_THRESHOLD)) {
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
        perspective: '1200px', 
        transformStyle:'preserve-3d' 
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `translateZ(-${translateZ}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
        }}
      >
        {/* FRONT FACE */}
        <div 
          className={`absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-sm border border-white/30 rounded-4xl p-5 overflow-hidden flex flex-col  backface-hidden transition-opacity duration-300 ${rotation.y !== 0 ? 'opacity-100' : 'opacity-100'}`}
          style={{ transform: `rotateY(0deg) translateZ(${translateZ}px)`, pointerEvents: rotation.y !== 0 ? 'none' : 'auto' }}
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
              <p className="text-2xl min-[1265px]:text-3xl font-bold text-white leading-tight mb-1 uppercase tracking-tight">
                {item.title}
              </p>
              <p className="text-lg min-[1265px]:text-xl text-zinc-500 leading-snug line-clamp-3 lg:line-clamp-none">
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
                  label={tech.name}
                  icon={tech.icon}
                  colorClass={tech.color}
                  textColor={tech.textColor}
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
         <div 
          className="relative z-[100] flex gap-3 px-4 pt-4 pb-3 bg-zinc-900 rounded-tr-3xl rounded-bl-4xl border-t border-r border-white/10">
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

export default SingleCube;