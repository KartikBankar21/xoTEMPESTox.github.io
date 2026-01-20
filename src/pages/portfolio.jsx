import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import "../styles/main.css";
import DetailCard from "../components/DetailedCard";
import Cube from "../components/Cube";
import { X } from "lucide-react";
import { useTheme } from "../components/HeaderBackground";


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

// --- Data ---
const rawPortfolioData = [
  {
    id: "org-chatbot",
    title: "Organizational Chatbot",
    tagline: "RAG-powered AI assistant for streamlined HR & IT support",
    description:
      "A sophisticated AI-driven assistant utilizing Retrieval-Augmented Generation (RAG) to provide accurate answers from internal documentation.",
    image_url: "../assets/images/projects/project-1.png",
    tag: "AI/ML Project",
    highlights: [
      "Implemented RAG architecture for context-aware responses",
      "Integrated 2FA security protocols using TOTP",
      "Built dynamic tool-calling functionality",
      "Developed a custom React-based chat interface",
    ],
    techStack: [
      { name: "Python", slug: "logos/python", color: "3776AB", iconColor: "" },
      {
        name: "OpenAI",
        slug: "logos/openai-icon",
        color: "FFFFFF",
        iconColor: "invert",
      },
      { name: "React", slug: "logos/react", color: "61DAFB", iconColor: "" },
      {
        name: "PostgreSQL",
        slug: "logos/postgresql",
        color: "4169E1",
        iconColor: "",
      },
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/Enerzal",
      live_link: "https://www.youtube.com/watch?v=azj_7OdSxcY",
    },
  },
  {
    id: "eco-chain",
    title: "Eco Chain",
    tagline:
      "Blockchain marketplace for transparent carbon credit tokenization",
    description:
      "A decentralized ecosystem designed to tokenize carbon credits.",
    image_url: "../assets/images/projects/project-2.png",
    tag: "Web3 Ecosystem",
    highlights: [
      "Developed smart contracts for ERC-20 tokenization",
      "Built a MERN-stack dashboard",
      "Integrated MetaMask for Web3 authentication",
      "Designed a custom ledger view",
    ],
    techStack: [
      {
        name: "Solidity",
        slug: "skill-icons/solidity",
        color: "FFFFFF",
        iconColor: "",
      },
      {
        name: "Ethereum",
        slug: "logos/ethereum",
        color: "FFFFFF",
        iconColor: "",
      },
      {
        name: "Node.js",
        slug: "logos/nodejs-icon",
        color: "339933",
        iconColor: "",
      },
      {
        name: "MongoDB",
        slug: "logos/mongodb-icon",
        color: "47A248",
        iconColor: "",
      },
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/EcoChain",
      live_link: "https://eco-chain-ashen.vercel.app/",
    },
  },
  {
    id: "supplyzal",
    title: "Supplyzal",
    tagline:
      "Blockchain-based supply tracking with verified sustainability markers",
    description:
      "A comprehensive supply chain management tool that leverages blockchain.",
    image_url: "../assets/images/projects/project-3.png",
    tag: "Blockchain Dapp",
    highlights: [
      "Created a transparent tracking system",
      "Utilized decentralized storage (IPFS)",
      "Reduced logistics verification time by 40%",
      "Integrated QR-code based scanning",
    ],
    techStack: [
      {
        name: "Hardhat",
        slug: "logos/hardhat-icon",
        color: "FFF000",
        iconColor: "",
      },
      { name: "React", slug: "logos/react", color: "61DAFB", iconColor: "" },
      {
        name: "Ethers.js",
        slug: "logos/ethereum",
        color: "FFFFFF",
        iconColor: "",
      },
      {
        name: "IPFS",
        slug: "skill-icons/ipfs-light",
        color: "65C2CB",
        iconColor: "invert",
      },
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/Supplyzal",
      live_link: "https://www.youtube.com/watch?v=CEGqZsqdnN8",
    },
  },
  {
    id: "ledger-play",
    title: "LedgerPlay",
    tagline: "Multiplayer Web3 gaming with real-time token staking mechanics",
    description:
      "A competitive multiplayer gaming platform where players can stake tokens.",
    image_url: "../assets/images/projects/project-4.png",
    tag: "Gaming/Web3",
    highlights: [
      "Engineered high-concurrency WebSocket server",
      "Implemented ERC-20 staking logic",
      "Designed an interactive lobby system",
      "Optimized game assets for 60FPS",
    ],
    techStack: [
      {
        name: "Socket.io",
        slug: "logos/socket-io",
        color: "ffffff",
        iconColor: "",
      },
      {
        name: "Unity",
        slug: "skill-icons/unity-dark",
        color: "ffffff",
        iconColor: "invert",
      },
      {
        name: "Solidity",
        slug: "skill-icons/solidity",
        color: "FFFFFF",
        iconColor: "",
      },
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/LedgerPlay",
      live_link: "https://www.youtube.com/watch?v=w-SHifenCqE",
    },
  },
  {
    id: "wakebot32",
    title: "WakeBot32",
    tagline: "IoT Wake-on-LAN controller with Telegram API integration",
    description:
      "A hardware-based solution using ESP32 to remotely wake computers.",
    image_url: "../assets/images/projects/project-5.jpg",
    tag: "Hardware/IoT",
    highlights: [
      "Programmed ESP32 using C++",
      "Built a secure Telegram bot bridge",
      "Implemented auto-reconnect logic",
      "Designed a custom PCB layout",
    ],
    techStack: [
      { name: "C++", slug: "logos/c-plusplus", color: "00599C", iconColor: "" },
      {
        name: "ESP32",
        slug: "simple-icons/espressif",
        color: "FFFFFF",
        iconColor: "invert",
      },
      {
        name: "Telegram",
        slug: "logos/telegram",
        color: "26A5E4",
        iconColor: "",
      },
      {
        name: "Arduino",
        slug: "logos/arduino",
        color: "00979D",
        iconColor: "",
      },
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/WakeBot32",
      live_link: "https://youtu.be/fOirqvQiiFo",
    },
  },
  {
    id: "tv-plus",
    title: "TradingviewPlus",
    tagline:
      "Open-source browser extension enhancing the TradingView ecosystem",
    description: "An open-source utility for advanced charting tools.",
    image_url: "../assets/images/projects/project-6.png",
    tag: "OSS Contribution",
    highlights: [
      "Contributed to core extension architecture",
      "Developed custom CSS injection engine",
      "Optimized DOM manipulation",
      "Managed community PRs",
    ],
    techStack: [
      {
        name: "JavaScript",
        slug: "logos/javascript",
        color: "F7DF1E",
        iconColor: "",
      },
      { name: "CSS3", slug: "logos/css-3", color: "1572B6", iconColor: "" },
      { name: "Chrome", slug: "logos/chrome", color: "4285F4", iconColor: "" },
    ],
    links: {
      github_link: "https://github.com/Tiqur/TradingviewPlus",
      live_link: "https://chromewebstore.google.com/...",
    },
  },
  {
    id: "portfolio-web",
    title: "Portfolio Website",
    tagline: "High-performance interactive developer showcase",
    description: "A bespoke portfolio built with 3D interactions.",
    image_url: "../assets/images/preview.png",
    tag: "Personal Website",
    highlights: [
      "100/100 performance score on Lighthouse",
      "Advanced CSS 3D transforms",
      "Fully responsive layout",
      "Utilized Framer Motion",
    ],
    techStack: [
      { name: "React", slug: "logos/react", color: "61DAFB", iconColor: "" },
      {
        name: "Tailwind",
        slug: "logos/tailwindcss-icon",
        color: "06B6D4",
        iconColor: "",
      },
      { name: "Vite", slug: "logos/vitejs", color: "646CFF", iconColor: "" },
      {
        name: "Framer",
        slug: "logos/framer",
        color: "0055FF",
        iconColor: "invert",
      },
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/xoTEMPESTox.github.io",
      live_link: "https://priyanshusah.com",
    },
  },
  {
    id: "ml-kaggle",
    title: "ML Kaggle Competition",
    tagline: "Organized machine learning challenge",
    description: "Planned and hosted a competitive data science event.",
    image_url: "../assets/images/projects/project-8.png",
    tag: "Competition Host",
    highlights: [
      "Curated proprietary dataset",
      "Managed platform for 200+ participants",
      "Conducted post-competition workshops",
      "Collaborated with industry partners",
    ],
    techStack: [
      { name: "Python", slug: "logos/python", color: "3776AB", iconColor: "" },
      {
        name: "Pandas",
        slug: "logos/pandas-icon",
        color: "FFFFFF",
        iconColor: "",
      },
      {
        name: "Scikit-learn",
        slug: "skill-icons/scikitlearn-light",
        color: "F7931E",
        iconColor: "",
      },
    ],
    links: {
      github_link: "https://github.com/xoTEMPESTox/TCET_ACM_SIGAI_KAGGLE_COMP",
      live_link: "https://www.kaggle.com/competitions/acm-sigai-tcet",
    },
  },
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
const [fullscreenImage, setFullscreenImage] = useState(null);
const { theme } = useTheme();
  // --- Responsive Logic ---
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1000
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
  const visibleContainerWidth = 3 * cubeWidth + 2 * gapWidth;

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

  const getTranslation = useCallback(
    (index) => {
      // Center the active index within the visible container
      // Offset = (ContainerWidth / 2) - (Index * ItemWidth + CubeWidth/2)
      return visibleContainerWidth / 2 - (index * itemWidth + cubeWidth / 2);
    },
    [visibleContainerWidth, itemWidth, cubeWidth]
  );

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
      setActiveIndex((prev) => prev + 1);
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
      wrapperRef.current.style.transform = `translateX(${currentTranslateRef.current + delta
        }px)`;
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
    setActiveIndex((prev) => prev + direction);
    if (!isHoveringRef.current) startAutoSlide();
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden selection:bg-indigo-500/30">
      {/* 1. Header (Top) */}
      <header className=" mt-26 md:my-6  text-center px-4 z-20 flex-none">
        <div className={`
  backdrop-blur-sm rounded-4xl inline-block p-4 md:p-6 border 
  ${theme === 'dark' 
    ? 'bg-black/50 border-white/5' 
    : 'bg-white/50 border-black/5 shadow-xl'}
`}>
  <p className={`
    text-8xl md:text-9xl font-black mb-0! tracking-tighter bg-clip-text text-transparent uppercase
    ${theme === 'dark'
      ? 'bg-gradient-to-b from-white to-white/50'
      : 'bg-gradient-to-b from-gray-900 to-gray-500'}
  `}>
    Portfolio
  </p>
</div>
      </header>

      {/* 2. Main Center Area (Carousel) 
          - flex-grow takes up remaining space
          - justify-center centers vertically
          - pb-[10rem] adds the "safe zone" for the navbar (5rem offset + 5rem height)
      */}
      <div className="flex-grow flex flex-col items-center justify-center relative pb-[12rem] ">
        <div
          ref={containerRef}
          className="relative h-full touch-none select-none cursor-grab active:cursor-grabbing overflow-hidden "
          style={{
            perspective: "750px",
            // Enforce strictly 3 items visible width
            width: `${visibleContainerWidth}px`,
            // Add vertical padding for 3D rotation clearance
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
          onMouseEnter={() => {
            isHoveringRef.current = true;
            stopAutoSlide();
          }}
          onMouseLeave={(e) => {
            isHoveringRef.current = false;
            if (draggingRef.current) handleDragEnd(e.clientX);
            else startAutoSlide();
          }}
          onPointerDown={(e) => {
            if (e.target.closest("button") || e.target.closest("a")) return;
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
              transition: isTransitioning
                ? "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
                : "none",
              transformStyle: "preserve-3d",
              // paddingLeft: `${cubeWidth/2}px` // Initial offset helper
            }}
          >
            {cubeList.map((item, idx) => (
              <Cube
                key={`${idx}-${item.id}`}
                item={item}
                onViewDetails={setSelectedProject}
                isDragging={isDragging}
                width={cubeWidth}
                height={cubeWidth} // Keeping it square
                onImageOpen={(project) => setFullscreenImage(project)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* RE-ENGINEERED FULLSCREEN IMAGE MODAL */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setFullscreenImage(null)}
        >
          <div
            className="relative flex flex-col items-center justify-center max-w-[95vw] max-h-[60vh] animate-in zoom-in-95 duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The Image - Scaled to 80% screen height */}
            <div className="relative group">
              <img
                src={fullscreenImage.image_url}
                alt={fullscreenImage.title}
                className="h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
              />

              {/* Close Button UI */}
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/50 hover:text-white transition-colors group/btn"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">Close Preview</span>
                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full border border-white/20 group-hover/btn:bg-white/20 group-hover/btn:scale-110 transition-all">
                  <X size={16} />
                </div>
              </button>
            </div>

            {/* Bottom Caption Area */}
            <div className="mt-6 text-center">
              <h3 className="text-white font-bold text-2xl font-bold uppercase tracking-tight">{fullscreenImage.title}</h3>
              <p className="text-zinc-400 text-lg mt-1">{fullscreenImage.tag}</p>
            </div>
          </div>
        </div>
      )}
      <DetailCard
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
};

export default Portfolio;
