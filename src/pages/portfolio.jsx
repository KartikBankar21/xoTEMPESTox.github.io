import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Github,
  ExternalLink,
  Activity,
  Server,
  Database,
  Code,
  Cloud,
  Box,
} from "lucide-react";
import "../styles/main.css";
import Cube from "../components/Cube";

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
    description:
      "RAG-powered HR & IT assistant with secure 2FA and tool calling.",
    image_url: "../assets/images/projects/project-1.png",
    tag: "AI/ML Project",
    links: {
      github_link: "https://github.com/xoTEMPESTox/Enerzal",
      live_link: "https://www.youtube.com/watch?v=azj_7OdSxcY",
    },
  },
  {
    title: "Eco Chain",
    description:
      "MERN + Blockchain marketplace for carbon credit tokenization.",
    image_url: "../assets/images/projects/project-2.png",
    tag: "Web3 Ecosystem",
    links: {
      github_link: "https://github.com/xoTEMPESTox/EcoChain",
      live_link: "https://eco-chain-ashen.vercel.app/",
    },
  },
  {
    title: "Supplyzal",
    description:
      "Blockchain-based supply tracking with verified sustainability.",
    image_url: "../assets/images/projects/project-3.png",
    tag: "Blockchain Dapp",
    links: {
      github_link: "https://github.com/xoTEMPESTox/Supplyzal",
      live_link: "https://www.youtube.com/watch?v=CEGqZsqdnN8",
    },
  },
  {
    title: "LedgerPlay",
    description: "ERC20 based Staking Logic with Web socket based Multiplayer.",
    image_url: "../assets/images/projects/project-4.png",
    tag: "Gaming/Web3",
    links: {
      github_link: "https://github.com/xoTEMPESTox/LedgerPlay",
      live_link: "https://www.youtube.com/watch?v=w-SHifenCqE",
    },
  },
  {
    title: "WakeBot32",
    description: "ESP32 based WOL bot using Telegram API and Arduino IDE",
    image_url: "../assets/images/projects/project-5.jpg",
    tag: "Hardware/IoT",
    links: {
      github_link: "https://github.com/xoTEMPESTox/WakeBot32",
      live_link: "https://youtu.be/fOirqvQiiFo",
    },
  },
  {
    title: "TradingviewPlus",
    description: "Open Source Contributor for Trading View extension.",
    image_url: "../assets/images/projects/project-6.png",
    tag: "OSS Contribution",
    links: {
      github_link: "https://github.com/Tiqur/TradingviewPlus",
      live_link:
        "https://chromewebstore.google.com/detail/tradingviewplus/pkcgjgllebhppgegpedlhjmabmnpcpec?hl=en&authuser=0",
    },
  },
  {
    title: "Portfolio Website",
    description: "Portfolio website Built with Quality and Performance in mind",
    image_url: "../assets/images/preview.png",
    tag: "Personal Website",
    links: {
      github_link: "https://github.com/xoTEMPESTox/xoTEMPESTox.github.io",
      live_link: "https://priyanshusah.com",
    },
  },
  {
    title: "ML Kaggle Competition",
    description: "Hosted a Kaggle Competition under TCET ACM SIG AI 2025",
    image_url: "../assets/images/projects/project-8.png",
    tag: "Competition Host",
    links: {
      github_link: "https://github.com/xoTEMPESTox/TCET_ACM_SIGAI_KAGGLE_COMP",
      live_link: "https://www.kaggle.com/competitions/acm-sigai-tcet",
    },
  },
];

// --- Tech Stack Icons (SVG Components) ---
const TechIcon = ({ name, className }) => {
  switch (name) {
    case "React":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 12l3 3 7-7" />
          <path d="M12 2l-8 5v10l8 5 8-5V7l-8-5z" />
        </svg>
      );
    case "Node.js":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "MongoDB":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "DigitalOcean":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 2a10 10 0 0 0-8 4h16a10 10 0 0 0-8-4z" />
          <path d="M12 22a10 10 0 0 1-8-4h16a10 10 0 0 1-8 4z" />
          <path d="M2 12h20" />
          <path d="M12 2v20" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
      );
    default:
      return <Box className={className} />;
  }
};

const availableTech = [
  { name: "React", color: "text-blue-400" },
  { name: "Node.js", color: "text-green-400" },
  { name: "MongoDB", color: "text-yellow-400" },
  { name: "Tailwind CSS", color: "text-cyan-400" },
  { name: "DigitalOcean", color: "text-gray-400" },
  { name: "TypeScript", color: "text-blue-500" },
];

// Pre-process data to include a fixed random tech stack per item
const portfolioData = rawPortfolioData.map((item) => {
  const shuffled = [...availableTech].sort(() => 0.5 - Math.random());
  const numTech = 4 + Math.floor(Math.random() * 2); // 4 or 5 items
  return {
    ...item,
    techStack: shuffled.slice(0, numTech),
  };
});

const Portfolio = () => {
   const realCount = portfolioData.length;
  const cubeList = useMemo(() => {
    const startClones = portfolioData.slice(-NUM_PHANTOM);
    const endClones = portfolioData.slice(0, NUM_PHANTOM);
    return [...startClones, ...portfolioData, ...endClones];
  }, []);

  const totalCubes = cubeList.length;
  const realStartIndex = NUM_PHANTOM;
  const realEndIndex = realStartIndex + realCount - 1;
  const initialIndex = realStartIndex + Math.floor(realCount / 2);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const draggingRef = useRef(false);
  const autoSlideRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const handleResize = () => containerRef.current && setWrapperWidth(containerRef.current.clientWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTranslation = useCallback((index) => {
    if (!wrapperWidth) return 0;
    return (wrapperWidth / 2) - (index * ITEM_WIDTH + (CUBE_WIDTH / 2));
  }, [wrapperWidth]);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current) { clearInterval(autoSlideRef.current); autoSlideRef.current = null; }
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
      setTimeout(() => { setIsTransitioning(false); setActiveIndex(realStartIndex); }, 800);
    } else if (activeIndex < realStartIndex) {
      setTimeout(() => { setIsTransitioning(false); setActiveIndex(realEndIndex); }, 800);
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
    <div className="page-section">
      {/* Header */}
      <header className="pt-12 pb-0 text-center px-4 relative z-10">
        <p className="text-8xl md:text-9xl font-black mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-black/40 uppercase">
          Portfolio
        </p>
        {/* <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Interactive 3D carousel. Drag to navigate, hover edges to peek at content, or click details to flip cards.
        </p> */}
      </header>

      <div 
        ref={containerRef}
        className="w-full h-[400px] relative flex items-center justify-center touch-none overflow-visible"
        style={{ perspective: '1200px' }}
        onMouseEnter={() => { isHoveringRef.current = true; stopAutoSlide(); }}
        onMouseLeave={(e) => { 
          isHoveringRef.current = false; 
          if (draggingRef.current) handleDragEnd(e.clientX);
          else startAutoSlide();
        }}
        onPointerDown={(e) => {
          if (e.target.closest('button')) return;
          handleDragStart(e.clientX);
        }}
        onPointerMove={(e) => handleDragMove(e.clientX)}
        onPointerUp={(e) => handleDragEnd(e.clientX)}
      >
        <div
          ref={wrapperRef}
          className="flex items-center absolute left-0 h-full will-change-transform"
          style={{
            transform: `translateX(${getTranslation(activeIndex)}px)`,
            gap: `${GAP_WIDTH}px`,
            transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          {cubeList.map((item, index) => (
            <Cube key={`${index}-${item.title}`} item={item} isDragging={isDragging} />
          ))}
        </div>

        <div className="absolute inset-y-0 -left-16 w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10 rounded-r-full" />
        <div className="absolute inset-y-0 -right-16 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10 rounded-l-full" />
      </div>

      <footer className=" pb-16 text-center text-gray-500 text-3xl tracking-widest uppercase">
        Hover edges to rotate • Drag to navigate
      </footer>
      {/* Footer Instructions */}
      {/* <div className="mt-auto pb-8 text-center text-gray-500 text-3xl px-4">
        <p className="mb-1">
          Tech Stack: <span className="text-gray-300">Hover Right Edge</span> |
          Links: <span className="text-gray-300">Hover Left Edge</span>
        </p>
        <p>(Or use the buttons on the card faces)</p>
      </div> */}
    </div>
  );
};

export default Portfolio;
