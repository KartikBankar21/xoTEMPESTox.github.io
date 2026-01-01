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
import "../styles/main.css";
// import Cube from "../components/Cube";
import DetailCard from "../components/DetailedCard";
// import Cube3 from "../components/Cube3";
import SingleCube from "../components/Cube3";
// import SingleCube from "../components/Cube";

// --- Configuration Constants ---
// Base values (Mobile/Tablet)
const BASE_CUBE_WIDTH = 200;
const BASE_GAP_WIDTH = 64; 

// Multiplier for Large Screens (lg)
const LG_MULTIPLIER = 1.5;

// --- Configuration Constants ---
const CUBE_WIDTH = 200;
const GAP_WIDTH = 64; // 4rem
const ITEM_WIDTH = CUBE_WIDTH + GAP_WIDTH;
const AUTO_SLIDE_DELAY = 2500;
const SWIPE_THRESHOLD = 50;
const NUM_PHANTOM = 3;


// --- Sub-Components ---

const TechBadge = ({ icon: Icon, label, colorClass, textColor }) => (
  <div className={`flex items-center bg-slate-800 ${textColor} text-[11px] font-medium px-2 py-1 rounded-full border border-slate-700`}>
    {Icon && <Icon size={12} className={`mr-1.5 ${colorClass}`} />}
    <span>{label}</span>
  </div>
);

// --- Data ---
const rawPortfolioData = [
  {
    id: "org-chatbot",
    title: "Organizational Chatbot",
    tagline: "RAG-powered AI assistant for streamlined HR & IT support",
    description: "A sophisticated AI-driven assistant utilizing Retrieval-Augmented Generation (RAG) to provide accurate answers from internal documentation. It features secure authentication and dynamic tool calling for real-time task execution.",
    image_url: "../assets/images/projects/project-1.png",
    tag: "AI/ML Project",
    highlights: [
      "Implemented RAG architecture for context-aware responses from internal knowledge bases",
      "Integrated 2FA security protocols using TOTP for sensitive organizational data access",
      "Built dynamic tool-calling functionality allowing the AI to execute SQL queries and API calls",
      "Developed a custom React-based chat interface with streaming responses"
    ],
    techStack: [
      { name: 'Python', icon: Code, color: 'text-blue-400', textColor: 'text-blue-300' },
      { name: 'OpenAI', icon: Zap, color: 'text-green-400', textColor: 'text-green-300' },
      { name: 'React', icon: Terminal, color: 'text-cyan-400', textColor: 'text-cyan-300' },
      { name: 'PostgreSQL', icon: Database, color: 'text-indigo-400', textColor: 'text-indigo-300' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/Enerzal",
      live_link: "https://www.youtube.com/watch?v=azj_7OdSxcY"
    }
  },
  {
    id: "eco-chain",
    title: "Eco Chain",
    tagline: "Blockchain marketplace for transparent carbon credit tokenization",
    description: "A decentralized ecosystem designed to tokenize carbon credits, enabling businesses to trade environmental assets with full auditability and transparency on the blockchain.",
    image_url: "../assets/images/projects/project-2.png",
    tag: "Web3 Ecosystem",
    highlights: [
      "Developed smart contracts for secure ERC-20 tokenization of carbon offsets",
      "Built a MERN-stack dashboard for tracking real-time carbon footprint data",
      "Integrated MetaMask for seamless Web3 wallet authentication and transactions",
      "Designed a custom ledger view for permanent, immutable environmental auditing"
    ],
    techStack: [
      { name: 'Solidity', icon: ShieldCheck, color: 'text-gray-400', textColor: 'text-gray-300' },
      { name: 'Ethereum', icon: Layers, color: 'text-indigo-400', textColor: 'text-indigo-300' },
      { name: 'React', icon: Terminal, color: 'text-cyan-400', textColor: 'text-cyan-300' },
      { name: 'Node.js', icon: Server, color: 'text-green-500', textColor: 'text-green-400' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/EcoChain",
      live_link: "https://eco-chain-ashen.vercel.app/"
    }
  },
  {
    id: "supplyzal",
    title: "Supplyzal",
    tagline: "Blockchain-based supply tracking with verified sustainability markers",
    description: "A comprehensive supply chain management tool that leverages blockchain to verify the origin and sustainability of products at every stage of the logistics process.",
    image_url: "../assets/images/projects/project-3.png",
    tag: "Blockchain Dapp",
    highlights: [
      "Created a transparent tracking system for high-value assets across global routes",
      "Utilized decentralized storage (IPFS) for immutable product certifications",
      "Reduced logistics verification time by 40% through automated smart contract triggers",
      "Integrated QR-code based scanning for instant product history retrieval"
    ],
    techStack: [
      { name: 'Hardhat', icon: Box, color: 'text-yellow-500', textColor: 'text-yellow-400' },
      { name: 'React', icon: Terminal, color: 'text-cyan-400', textColor: 'text-cyan-300' },
      { name: 'Ethers.js', icon: Zap, color: 'text-purple-400', textColor: 'text-purple-300' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/Supplyzal",
      live_link: "https://www.youtube.com/watch?v=CEGqZsqdnN8"
    }
  },
  {
    id: "ledger-play",
    title: "LedgerPlay",
    tagline: "Multiplayer Web3 gaming with real-time token staking mechanics",
    description: "A competitive multiplayer gaming platform where players can stake tokens in real-time matches. Uses WebSockets for low-latency synchronization and smart contracts for payout logic.",
    image_url: "../assets/images/projects/project-4.png",
    tag: "Gaming/Web3",
    highlights: [
      "Engineered a high-concurrency WebSocket server for real-time game state synchronization",
      "Implemented ERC-20 staking logic ensuring secure and automated match payouts",
      "Designed an interactive lobby system with global leaderboard integration",
      "Optimized game assets for smooth 60FPS performance in-browser"
    ],
    techStack: [
      { name: 'Socket.io', icon: Zap, color: 'text-white', textColor: 'text-white' },
      { name: 'Unity', icon: Box, color: 'text-gray-300', textColor: 'text-gray-200' },
      { name: 'Solidity', icon: ShieldCheck, color: 'text-blue-400', textColor: 'text-blue-300' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/LedgerPlay",
      live_link: "https://www.youtube.com/watch?v=w-SHifenCqE"
    }
  },
  {
    id: "wakebot32",
    title: "WakeBot32",
    tagline: "IoT Wake-on-LAN controller with Telegram API integration",
    description: "A hardware-based solution using ESP32 to remotely wake computers over a local network, controlled via a secure Telegram bot interface for global accessibility.",
    image_url: "../assets/images/projects/project-5.jpg",
    tag: "Hardware/IoT",
    highlights: [
      "Programmed ESP32 microcontrollers using C++ and Arduino IDE for low-power operation",
      "Built a secure Telegram bot bridge for controlling local network packets over the internet",
      "Implemented auto-reconnect logic and status heartbeat for 99.9% hardware uptime",
      "Designed a custom PCB layout and 3D-printable enclosure for the final prototype"
    ],
    techStack: [
      { name: 'C++', icon: Code, color: 'text-blue-500', textColor: 'text-blue-400' },
      { name: 'ESP32', icon: Cpu, color: 'text-orange-500', textColor: 'text-orange-400' },
      { name: 'Telegram API', icon: Globe, color: 'text-sky-400', textColor: 'text-sky-300' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/WakeBot32",
      live_link: "https://youtu.be/fOirqvQiiFo"
    }
  },
  {
    id: "tv-plus",
    title: "TradingviewPlus",
    tagline: "Open-source browser extension enhancing the TradingView ecosystem",
    description: "A popular open-source utility that adds advanced charting tools, custom themes, and trade automation features to the standard TradingView web interface.",
    image_url: "../assets/images/projects/project-6.png",
    tag: "OSS Contribution",
    highlights: [
      "Contributed to the core extension architecture for Chrome and Firefox compatibility",
      "Developed a custom CSS injection engine for user-defined chart aesthetics",
      "Optimized DOM manipulation scripts to ensure zero performance lag on heavy charts",
      "Managed community PRs and maintained technical documentation for new contributors"
    ],
    techStack: [
      { name: 'JavaScript', icon: Code, color: 'text-yellow-400', textColor: 'text-yellow-300' },
      { name: 'CSS3', icon: Palette, color: 'text-blue-500', textColor: 'text-blue-400' },
      { name: 'Chrome API', icon: Layout, color: 'text-red-400', textColor: 'text-red-300' }
    ],
    links: {
      github_link: "https://github.com/Tiqur/TradingviewPlus",
      live_link: "https://chromewebstore.google.com/detail/tradingviewplus/pkcgjgllebhppgegpedlhjmabmnpcpec?hl=en&authuser=0"
    }
  },
  {
    id: "portfolio-web",
    title: "Portfolio Website",
    tagline: "High-performance interactive developer showcase",
    description: "A bespoke portfolio built with a focus on creative engineering, featuring 3D interactions, smooth transitions, and a clean, information-dense UI.",
    image_url: "../assets/images/preview.png",
    tag: "Personal Website",
    highlights: [
      "Achieved a 100/100 performance score on Google Lighthouse",
      "Implemented advanced CSS 3D transforms for interactive project cubes",
      "Designed a fully responsive layout that adapts from mobile to ultra-wide displays",
      "Utilized Framer Motion for sophisticated entrance and exit animations"
    ],
    techStack: [
      { name: 'React', icon: Terminal, color: 'text-cyan-400', textColor: 'text-cyan-300' },
      { name: 'Tailwind CSS', icon: Palette, color: 'text-sky-400', textColor: 'text-sky-300' },
      { name: 'Vite', icon: Zap, color: 'text-purple-400', textColor: 'text-purple-300' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/xoTEMPESTox.github.io",
      live_link: "https://priyanshusah.com"
    }
  },
  {
    id: "ml-kaggle",
    title: "ML Kaggle Competition",
    tagline: "Organized machine learning challenge for aspiring data scientists",
    description: "Planned and hosted a competitive data science event featuring complex datasets and automated evaluation metrics, fostering community learning and innovation.",
    image_url: "../assets/images/projects/project-8.png",
    tag: "Competition Host",
    highlights: [
      "Curated a proprietary dataset with over 10,000 samples for predictive modeling",
      "Managed the competition platform and real-time leaderboard for 200+ participants",
      "Conducted post-competition analysis and workshops on winning ML architectures",
      "Collaborated with industry partners to define real-world problem statements"
    ],
    techStack: [
      { name: 'Python', icon: Code, color: 'text-blue-400', textColor: 'text-blue-300' },
      { name: 'Pandas', icon: Database, color: 'text-blue-600', textColor: 'text-blue-500' },
      { name: 'Scikit-learn', icon: Activity, color: 'text-orange-400', textColor: 'text-orange-300' }
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/TCET_ACM_SIGAI_KAGGLE_COMP",
      live_link: "https://www.kaggle.com/competitions/acm-sigai-tcet"
    }
  }
];


const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // --- Responsive Logic ---
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dimensions based on screen size
  const isLg = windowWidth >= 1265; // Tailwind lg breakpoint
  const currentScale = isLg ? LG_MULTIPLIER : 1;
  const cubeWidth = BASE_CUBE_WIDTH * currentScale;
  const gapWidth = BASE_GAP_WIDTH * currentScale;
  const itemWidth = cubeWidth + gapWidth;

  // Calculate visible container width: We want exactly 3 items visible.
  // 3 * itemWidth - gapWidth (to not count the last gap) + padding for safety
  // Actually simpler: 3 * itemWidth roughly allows 1 center + 2 sides.
  // Let's make it tightly fit 3 items.
  // Visual Width = (Cube + Gap) * 2 + Cube = 3 * Cube + 2 * Gap.
  const visibleContainerWidth = (3 * cubeWidth) + (2 * gapWidth);


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

  // We rely on calculated widths, not DOM ref widths for the carousel math now
  // to ensure server/client match and responsiveness
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const draggingRef = useRef(false);
  const autoSlideRef = useRef(null);
  const isHoveringRef = useRef(false);


  const getTranslation = useCallback((index) => {
    // Center the active index within the visible container
    // Offset = (ContainerWidth / 2) - (Index * ItemWidth + CubeWidth/2)
    return (visibleContainerWidth / 2) - (index * itemWidth + (cubeWidth / 2));
  }, [visibleContainerWidth, itemWidth, cubeWidth]);

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
    <div className="h-screen w-full  text-white flex flex-col overflow-hidden selection:bg-indigo-500/30">
      
      {/* 1. Header (Top) */}
      <header className=" my-6   text-center px-4 z-20 flex-none">
         <div className="bg-black/50 backdrop-blur-sm rounded-4xl inline-block p-4 md:p-6 border border-white/5">
           <p className="text-6xl md:text-9xl font-black mb-0 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-black/20 uppercase">
             Portfolio
           </p>
         </div>
       </header>

      {/* 2. Main Center Area (Carousel) 
          - flex-grow takes up remaining space
          - justify-center centers vertically
          - pb-[10rem] adds the "safe zone" for the navbar (5rem offset + 5rem height)
      */}
      <div 
        className="flex-grow flex flex-col items-center justify-center relative pb-[12rem] "
      >
        <div
          ref={containerRef}
          className="relative h-full touch-none select-none cursor-grab active:cursor-grabbing overflow-hidden "
          style={{ 
            perspective: '750px',
            // Enforce strictly 3 items visible width
            width: `${visibleContainerWidth}px`,
            // Add vertical padding for 3D rotation clearance
            paddingTop: '2rem',
            paddingBottom: '2rem'
          }}
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
            className="flex items-center absolute h-full will-change-transform top-0"
            style={{
              transform: `translateX(${getTranslation(activeIndex)}px)`,
              gap: `${gapWidth}px`,
              transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
              transformStyle: 'preserve-3d',
              // paddingLeft: `${cubeWidth/2}px` // Initial offset helper
            }}
          >
            {cubeList.map((item, idx) => (
              <SingleCube 
                key={`${idx}-${item.id}`} 
                item={item} 
                onViewDetails={setSelectedProject}
                isDragging={isDragging}
                width={cubeWidth}
                height={cubeWidth} // Keeping it square
              />
            ))}
          </div>

          {/* Gradient Overlays - Adjusted to strictly mask edges */}
          {/* <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-40" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-40" /> */}
        </div>
        
      </div>

      {/* 3. Bottom Fixed Navbar Simulation 
         "fixed with 5rem from bottom and 5rem height"
      */}
   

      <DetailCard project={selectedProject} onClose={() => setSelectedProject(null)} />

      <style>{`
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default Portfolio;

// const Portfolio = () => {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const realCount = rawPortfolioData.length;
  
//   const cubeList = useMemo(() => {
//     const startClones = rawPortfolioData.slice(-NUM_PHANTOM);
//     const endClones = rawPortfolioData.slice(0, NUM_PHANTOM);
//     return [...startClones, ...rawPortfolioData, ...endClones];
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
//     // This width now refers to the constrained 860px container
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
//     <div className="page-section  font-sans">
//       {/* Header */}
//       <header className="pt-12 pb-8 text-center px-4 z-10 flex justify-center items-center">
//         <div className="bg-black/50 backdrop-blur-sm rounded-2xl w-fit p-6 md:p-12 border border-white/5">
//           <p className="text-6xl md:text-8xl lg:text-9xl font-black mb-0 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-black/20 uppercase">
//             Portfolio
//           </p>
//         </div>
//       </header>

//       {/* Main Container for 3-Cube View
//         max-w-[860px]: Restricts view to roughly 3 cubes width
//         overflow-hidden: Hides the side cubes
//       */}
//       <div 
//         ref={containerRef}
//         className="w-full max-w-[860px] mx-auto h-[400px] relative flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing overflow-hidden rounded-xl border-x border-white/5"
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
//             transformStyle: 'preserve-3d',
//             // perspective:'1000px'
//           }}
//         >
//           {cubeList.map((item, index) => (
//             <Cube3 key={`${index}-${item.title}`} item={item} isDragging={isDragging} onViewDetails={setSelectedProject} />
//           ))}
//         </div>

//       </div>

//       {/* Detail Overlay */}
//       {selectedProject && (
//         <DetailCard 
//           project={selectedProject} 
//           onClose={() => setSelectedProject(null)} 
//         />
//       )}

//       <footer className="pb-16 pt-8 text-center text-gray-500 text-xl md:text-3xl tracking-widest uppercase opacity-60">
//         Hover edges to rotate • Drag to navigate
//       </footer>
      
//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 5px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
//       `}</style>
//     </div>
//   );
// };

// export default Portfolio;
