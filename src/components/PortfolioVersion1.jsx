import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Github, ExternalLink, Activity, Server, Database, Code, Cloud, Box } from 'lucide-react';

// --- Configuration Constants ---
const CUBE_WIDTH = 200;
const GAP_WIDTH = 64; // 4rem
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

// --- Tech Stack Icons (SVG Components) ---
const TechIcon = ({ name, className }) => {
  switch (name) {
    case 'React':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 12l3 3 7-7"/><path d="M12 2l-8 5v10l8 5 8-5V7l-8-5z"/></svg>;
    case 'Node.js':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
    case 'MongoDB':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
    case 'Tailwind CSS':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case 'DigitalOcean':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 2a10 10 0 0 0-8 4h16a10 10 0 0 0-8-4z"/><path d="M12 22a10 10 0 0 1-8-4h16a10 10 0 0 1-8 4z"/><path d="M2 12h20"/><path d="M12 2v20"/></svg>;
    case 'TypeScript':
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="12" y1="9" x2="12" y2="15"/></svg>;
    default:
      return <Box className={className} />;
  }
};

const availableTech = [
  { name: 'React', color: 'text-blue-400' },
  { name: 'Node.js', color: 'text-green-400' },
  { name: 'MongoDB', color: 'text-yellow-400' },
  { name: 'Tailwind CSS', color: 'text-cyan-400' },
  { name: 'DigitalOcean', color: 'text-gray-400' },
  { name: 'TypeScript', color: 'text-blue-500' },
];

// Pre-process data to include a fixed random tech stack per item
const portfolioData = rawPortfolioData.map(item => {
  const shuffled = [...availableTech].sort(() => 0.5 - Math.random());
  const numTech = 4 + Math.floor(Math.random() * 2); // 4 or 5 items
  return {
    ...item,
    techStack: shuffled.slice(0, numTech)
  };
});


// --- Individual Cube Component ---
const Cube = ({ item, isDragging }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [overrideClass, setOverrideClass] = useState(''); // 'show-right' | 'show-left' | ''
  const cubeRef = useRef(null);

  // Handle manual rotation interaction
  const handleMouseMove = (e) => {
    if (isDragging) return;
    
    // Calculate relative position inside the cube
    const rect = cubeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const mouseX = e.clientX;
    const relX = (mouseX - centerX) / (rect.width / 2);
    
    const THRESHOLD = 0.3;

    if (relX < -THRESHOLD) {
      setOverrideClass('rotate-y-[-90deg]'); // Show Right Face (Links)
    } else if (relX > THRESHOLD) {
      setOverrideClass('rotate-y-[90deg]'); // Show Left Face (Tech)
    } else {
      setOverrideClass('');
    }
  };

  const resetRotation = () => setOverrideClass('');
  
  // Handlers for click-based navigation
  const showDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOverrideClass('rotate-y-[-90deg]');
  };

  const showTech = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOverrideClass('rotate-y-[90deg]');
  };
  
  const showFront = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOverrideClass('');
  };

  // Resolve the current transform string
  // Base transform is translateZ(-100px). The override adds rotation.
  const transformStyle = overrideClass 
    ? `translateZ(-100px) ${overrideClass.replace('rotate-y-[', 'rotateY(').replace(']', ')')}`
    : `translateZ(-100px)`;

  return (
    <div 
      className="relative w-[200px] h-[200px] cursor-pointer"
      style={{ perspective: '1000px' }} // Local perspective for the cube content? No, parent handles it.
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <div 
        ref={cubeRef}
        className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: transformStyle
        }}
      >
        {/* FACE 1: Front (Project Info) */}
        <div className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-[#1a1a2e] text-gray-100 rounded-lg shadow-2xl flex flex-col p-4 border border-white/10"
             style={{ transform: 'rotateY(0deg) translateZ(100px)' }}>
          
          <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-bl-lg rounded-tr-lg shadow-lg">
            {item.tag}
          </div>

          <div className="mt-2">
            <Activity className="w-5 h-5 text-green-400 mb-3" />
            <h3 className="text-lg font-bold leading-tight mb-2">{item.title}</h3>
            <p className="text-[11px] text-gray-400 leading-snug line-clamp-3">{item.description}</p>
          </div>

          <button 
            onClick={showDetails}
            className="mt-auto flex items-center text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
          >
            View Details &rarr;
          </button>
        </div>

        {/* FACE 2: Left (Tech Stack) */}
        <div className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-[#1a1a2e] rounded-lg shadow-2xl overflow-hidden border border-white/10"
             style={{ transform: 'rotateY(90deg) translateZ(100px)' }}>
           
           <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-[#44002c] via-[#201323] to-[#150033]" />
           
           <div className="relative z-10 p-4 h-full flex flex-col">
              <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 content-start flex-grow">
                {item.techStack.map((tech, idx) => (
                  <div key={idx} className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded text-[10px] text-white backdrop-blur-sm">
                    <TechIcon name={tech.name} className={`w-3 h-3 ${tech.color}`} />
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

        {/* FACE 3: Right (Links & Image) */}
        <div className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-600 rounded-lg shadow-2xl flex items-center justify-center border border-white/10 overflow-hidden"
             style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}>
            
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
              style={{ backgroundImage: `url(${item.image_url})` }}
            />
            
            <div className="relative z-10 flex flex-col gap-4 items-center">
               <div className="flex gap-3">
                 <a href={item.links.github_link} target="_blank" rel="noopener noreferrer" 
                    className="p-3 bg-gray-900/80 backdrop-blur-md rounded-full text-white hover:scale-110 transition-transform hover:bg-black shadow-xl ring-1 ring-white/20">
                    <Github size={20} />
                 </a>
                 <a href={item.links.live_link} target="_blank" rel="noopener noreferrer" 
                    className="p-3 bg-blue-900/80 backdrop-blur-md rounded-full text-white hover:scale-110 transition-transform hover:bg-blue-800 shadow-xl ring-1 ring-white/20">
                    <ExternalLink size={20} />
                 </a>
               </div>
               <button 
                  onClick={showFront}
                  className="px-3 py-1 bg-black/40 rounded-full text-[10px] text-white hover:bg-black/60 transition-colors"
                >
                  Return to Front
               </button>
            </div>
        </div>

        {/* FACE 4: Back (Source Hint) */}
        <div className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-[#1a1a2e] flex flex-col items-center justify-center text-center p-4 border border-white/10"
             style={{ transform: 'rotateY(180deg) translateZ(100px)' }}>
           <div className="text-gray-400 text-sm">Repository</div>
           <div className="text-white text-xs mt-1 font-mono break-all opacity-70">
              {item.links.github_link.split('/').pop()}
           </div>
        </div>

        {/* FACE 5: Top (Decorative) */}
        <div className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-400 flex items-center justify-center text-blue-900 font-bold opacity-50"
             style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}>
        </div>

        {/* FACE 6: Bottom (Decorative) */}
        <div className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-300 flex items-center justify-center text-blue-900 font-bold opacity-50"
             style={{ transform: 'rotateX(90deg) translateZ(100px)' }}>
        </div>

      </div>
    </div>
  );
};


// --- Main Carousel Component ---
export default function PortfolioCarousel() {
  // Setup Infinite List: [Last N, ...Real, First N]
  const realCount = portfolioData.length;
  const cubeList = useMemo(() => {
    const startClones = portfolioData.slice(-NUM_PHANTOM);
    const endClones = portfolioData.slice(0, NUM_PHANTOM);
    return [...startClones, ...portfolioData, ...endClones];
  }, []);

  const totalCubes = cubeList.length;
  const realStartIndex = NUM_PHANTOM; // 3
  const realEndIndex = realStartIndex + realCount - 1; // 10

  // Start in the middle of the real set
  const initialIndex = realStartIndex + Math.floor(realCount / 2);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  
  // Refs for Drag Logic
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const draggingRef = useRef(false);
  const autoSlideRef = useRef(null);

  // --- Layout Calculations ---
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWrapperWidth(containerRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to calculate exact pixel translation to center the active cube
  const getTranslation = useCallback((index) => {
    if (!wrapperWidth) return 0;
    const itemOffset = index * ITEM_WIDTH;
    const centerOffset = itemOffset + (CUBE_WIDTH / 2);
    const sceneCenter = wrapperWidth / 2;
    return sceneCenter - centerOffset;
  }, [wrapperWidth]);

  // --- Auto Slide Logic ---
  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(() => {
      moveCarousel(1);
    }, AUTO_SLIDE_DELAY);
  }, []);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);


  // --- Movement & Snap Logic ---
  const moveCarousel = (direction) => {
    setActiveIndex(prev => {
      const next = prev + direction;
      return next;
    });
    setIsTransitioning(true);
  };

  // Check for snap condition after every index change
  useEffect(() => {
    if (!isTransitioning) return; // Only check snaps if we just moved

    let timeoutId;

    if (activeIndex > realEndIndex) {
      // Snapping back to start
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(realStartIndex);
      }, 800); // Match CSS transition duration
    } else if (activeIndex < realStartIndex) {
      // Snapping forward to end
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(realEndIndex);
      }, 800);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeIndex, isTransitioning, realEndIndex, realStartIndex]);


  // --- Drag Handlers ---
  const handleDragStart = (clientX) => {
    stopAutoSlide();
    draggingRef.current = true;
    setIsDragging(true);
    startXRef.current = clientX;
    
    // Disable transition for instant drag response
    setIsTransitioning(false);
    
    // Capture current base translation
    currentTranslateRef.current = getTranslation(activeIndex);
  };

  const handleDragMove = (clientX) => {
    if (!draggingRef.current) return;
    const delta = clientX - startXRef.current;
    
    // Apply drag manually to the DOM element for performance
    if (wrapperRef.current) {
      const newTranslate = currentTranslateRef.current + delta;
      wrapperRef.current.style.transform = `translateX(${newTranslate}px)`;
    }
  };

  const handleDragEnd = (clientX) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    
    const delta = clientX - startXRef.current;
    
    // Determine snap direction
    let direction = 0;
    if (delta < -SWIPE_THRESHOLD) direction = 1; // Dragged Left -> Next
    if (delta > SWIPE_THRESHOLD) direction = -1; // Dragged Right -> Prev
    
    // Re-enable transitions and move
    setIsTransitioning(true);
    setActiveIndex(prev => Math.min(Math.max(0, prev + direction), totalCubes - 1));
    
    startAutoSlide();
  };


  // --- Mouse Event Listeners ---
  const onMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    handleDragStart(e.clientX);
  };
  
  const onMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = (e) => {
    handleDragEnd(e.clientX);
  };

  const onMouseLeave = (e) => {
    if (draggingRef.current) handleDragEnd(e.clientX);
  };

  // --- Touch Event Listeners ---
  const onTouchStart = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    handleDragEnd(e.changedTouches[0].clientX);
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-hidden flex flex-col items-center">
      
      {/* Header */}
      <header className="pt-12 pb-8 text-center px-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-400 tracking-tight mb-3">
          Portfolio Cube Navigator
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Interactive 3D carousel. Drag to navigate, hover edges to peek at content, or click details to flip cards.
        </p>
      </header>

      {/* Main Scene */}
      <div 
        ref={containerRef}
        className="w-full h-[400px] relative flex items-center justify-center perspective-container touch-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ perspective: '1200px' }}
      >
        
        <div
          ref={wrapperRef}
          className="flex items-center absolute left-0 h-full will-change-transform"
          style={{
            transform: `translateX(${getTranslation(activeIndex)}px)`,
            gap: `${GAP_WIDTH}px`,
            transition: isTransitioning 
              ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
              : 'none',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {cubeList.map((item, index) => (
            <Cube 
              key={`${index}-${item.title}`} 
              item={item} 
              isDragging={isDragging}
            />
          ))}
        </div>

        {/* Overlay Gradients for Depth Perception */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-20" />

      </div>

      {/* Footer Instructions */}
      <div className="mt-auto pb-8 text-center text-gray-500 text-xs px-4">
        <p className="mb-1">Tech Stack: <span className="text-gray-300">Hover Right Edge</span> | Links: <span className="text-gray-300">Hover Left Edge</span></p>
        <p>(Or use the buttons on the card faces)</p>
      </div>

    </div>
  );
}