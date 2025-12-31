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

const Cube = ({ item, isDragging, onViewDetails, size }) => {
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
      className="relative pointer-events-auto shrink-0 touch-pan-y"
      style={{ 
        width: size, 
        height: size, 
        perspective: '1000px'
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
            overrideClass === "" ? "opacity-100" : "opacity-40"
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
              className="mt-auto flex items-baseline justify-center text-[10px] text-zinc-400 font-bold hover:text-white transition-all uppercase tracking-widest pt-3"
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

const DetailCard = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md border border-white/10"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="h-40 md:h-64 w-full relative shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">{project.title}</h2>
            <p className="text-sm md:text-lg text-blue-400 font-medium">{project.tagline}</p>
          </div>

          <p className="text-gray-300 leading-relaxed mb-8 text-base md:text-lg">
            {project.description}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-3 md:mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
                <Activity size={16} className="text-blue-400"/> Highlights
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-gray-400 text-xs md:text-sm flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-3 md:mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
                <Layers size={16} className="text-purple-400"/> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech.name} label={tech.name} icon={tech.icon} colorClass={tech.color} textColor={tech.textColor} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-white/10">
            <a href={project.links.github_link} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white hover:bg-white hover:text-black transition-all font-medium text-sm md:text-base group">
              <Github size={20} className="group-hover:scale-110 transition-transform"/> GitHub Repo
            </a>
            <a href={project.links.live_link} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition-all font-medium text-sm md:text-base shadow-lg group">
              <ExternalLink size={20} className="group-hover:scale-110 transition-transform"/> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Data (same as before) ---
const rawPortfolioData = [
  {
    id: "org-chatbot",
    title: "Organizational Chatbot",
    tagline: "RAG-powered AI assistant for streamlined HR & IT support",
    description: "A sophisticated AI-driven assistant utilizing Retrieval-Augmented Generation (RAG) to provide accurate answers from internal documentation. It features secure authentication and dynamic tool calling for real-time task execution.",
    image_url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
    tag: "AI/ML Project",
    highlights: ["Implemented RAG architecture", "Integrated 2FA security protocols", "Built dynamic tool-calling functionality", "Developed a custom React-based chat interface"],
    techStack: [
      { name: 'Python', icon: Code, color: 'text-blue-400', textColor: 'text-blue-300' },
      { name: 'OpenAI', icon: Zap, color: 'text-green-400', textColor: 'text-green-300' },
      { name: 'React', icon: Terminal, color: 'text-cyan-400', textColor: 'text-cyan-300' },
      { name: 'PostgreSQL', icon: Database, color: 'text-indigo-400', textColor: 'text-indigo-300' }
    ],
    links: { github_link: "https://github.com/xoTEMPESTox/Enerzal", live_link: "https://www.youtube.com/watch?v=azj_7OdSxcY" }
  },
  {
    id: "eco-chain",
    title: "Eco Chain",
    tagline: "Blockchain marketplace for transparent carbon credit tokenization",
    description: "A decentralized ecosystem designed to tokenize carbon credits, enabling businesses to trade environmental assets with full auditability and transparency on the blockchain.",
    image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    tag: "Web3 Ecosystem",
    highlights: ["Developed smart contracts for ERC-20", "Built a MERN-stack dashboard", "Integrated MetaMask", "Designed a custom ledger view"],
    techStack: [
      { name: 'Solidity', icon: ShieldCheck, color: 'text-gray-400', textColor: 'text-gray-300' },
      { name: 'Ethereum', icon: Layers, color: 'text-indigo-400', textColor: 'text-indigo-300' },
      { name: 'React', icon: Terminal, color: 'text-cyan-400', textColor: 'text-cyan-300' },
      { name: 'Node.js', icon: Server, color: 'text-green-500', textColor: 'text-green-400' }
    ],
    links: { github_link: "https://github.com/xoTEMPESTox/EcoChain", live_link: "https://eco-chain-ashen.vercel.app/" }
  },
  {
    id: "supplyzal",
    title: "Supplyzal",
    tagline: "Blockchain-based supply tracking with verified sustainability markers",
    description: "A comprehensive supply chain management tool that leverages blockchain to verify the origin and sustainability of products at every stage of the logistics process.",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    tag: "Blockchain Dapp",
    highlights: ["Transparent tracking system", "Decentralized storage (IPFS)", "Reduced logistics verification time", "Integrated QR-code scanning"],
    techStack: [
      { name: 'Hardhat', icon: Box, color: 'text-yellow-500', textColor: 'text-yellow-400' },
      { name: 'React', icon: Terminal, color: 'text-cyan-400', textColor: 'text-cyan-300' },
      { name: 'Ethers.js', icon: Zap, color: 'text-purple-400', textColor: 'text-purple-300' }
    ],
    links: { github_link: "https://github.com/xoTEMPESTox/Supplyzal", live_link: "https://www.youtube.com/watch?v=CEGqZsqdnN8" }
  },
  {
    id: "ledger-play",
    title: "LedgerPlay",
    tagline: "Multiplayer Web3 gaming with real-time token staking mechanics",
    description: "A competitive multiplayer gaming platform where players can stake tokens in real-time matches. Uses WebSockets for low-latency synchronization and smart contracts for payout logic.",
    image_url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800",
    tag: "Gaming/Web3",
    highlights: ["WebSocket server for sync", "ERC-20 staking logic", "Global leaderboard integration", "Optimized game assets"],
    techStack: [
      { name: 'Socket.io', icon: Zap, color: 'text-white', textColor: 'text-white' },
      { name: 'Unity', icon: Box, color: 'text-gray-300', textColor: 'text-gray-200' },
      { name: 'Solidity', icon: ShieldCheck, color: 'text-blue-400', textColor: 'text-blue-300' }
    ],
    links: { github_link: "https://github.com/xoTEMPESTox/LedgerPlay", live_link: "https://www.youtube.com/watch?v=w-SHifenCqE" }
  },
  {
    id: "wakebot32",
    title: "WakeBot32",
    tagline: "IoT Wake-on-LAN controller with Telegram API integration",
    description: "A hardware-based solution using ESP32 to remotely wake computers over a local network, controlled via a secure Telegram bot interface for global accessibility.",
    image_url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
    tag: "Hardware/IoT",
    highlights: ["Programmed ESP32 microcontrollers", "Telegram bot bridge", "Auto-reconnect logic", "Custom PCB layout"],
    techStack: [
      { name: 'C++', icon: Code, color: 'text-blue-500', textColor: 'text-blue-400' },
      { name: 'ESP32', icon: Cpu, color: 'text-orange-500', textColor: 'text-orange-400' },
      { name: 'Telegram API', icon: Globe, color: 'text-sky-400', textColor: 'text-sky-300' }
    ],
    links: { github_link: "https://github.com/xoTEMPESTox/WakeBot32", live_link: "https://youtu.be/fOirqvQiiFo" }
  },
  {
    id: "tv-plus",
    title: "TradingviewPlus",
    tagline: "Open-source browser extension enhancing the TradingView ecosystem",
    description: "A popular open-source utility that adds advanced charting tools, custom themes, and trade automation features to the standard TradingView web interface.",
    image_url: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=800",
    tag: "OSS Contribution",
    highlights: ["Extension architecture", "Custom CSS injection engine", "Optimized DOM manipulation", "Maintained documentation"],
    techStack: [
      { name: 'JavaScript', icon: Code, color: 'text-yellow-400', textColor: 'text-yellow-300' },
      { name: 'CSS3', icon: Palette, color: 'text-blue-500', textColor: 'text-blue-400' },
      { name: 'Chrome API', icon: Layout, color: 'text-red-400', textColor: 'text-red-300' }
    ],
    links: { github_link: "https://github.com/Tiqur/TradingviewPlus", live_link: "https://chromewebstore.google.com/detail/tradingviewplus/pkcgjgllebhppgegpedlhjmabmnpcpec?hl=en&authuser=0" }
  },
  {
    id: "portfolio-web",
    title: "Portfolio Website",
    tagline: "High-performance interactive developer showcase",
    description: "A bespoke portfolio built with a focus on creative engineering, featuring 3D interactions, smooth transitions, and a clean, information-dense UI.",
    image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    tag: "Personal Website",
    highlights: ["100/100 performance score", "CSS 3D transforms", "Fully responsive layout", "Framer Motion animations"],
    techStack: [
      { name: 'React', icon: Terminal, color: 'text-cyan-400', textColor: 'text-cyan-300' },
      { name: 'Tailwind CSS', icon: Palette, color: 'text-sky-400', textColor: 'text-sky-300' },
      { name: 'Vite', icon: Zap, color: 'text-purple-400', textColor: 'text-purple-300' }
    ],
    links: { github_link: "https://github.com/xoTEMPESTox/xoTEMPESTox.github.io", live_link: "https://priyanshusah.com" }
  },
  {
    id: "ml-kaggle",
    title: "ML Kaggle Competition",
    tagline: "Organized machine learning challenge for aspiring data scientists",
    description: "Planned and hosted a competitive data science event featuring complex datasets and automated evaluation metrics, fostering community learning and innovation.",
    image_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    tag: "Competition Host",
    highlights: ["Curated proprietary dataset", "Managed competition platform", "Conducted post-competition analysis", "Collaborated with partners"],
    techStack: [
      { name: 'Python', icon: Code, color: 'text-blue-400', textColor: 'text-blue-300' },
      { name: 'Pandas', icon: Database, color: 'text-blue-600', textColor: 'text-blue-500' },
      { name: 'Scikit-learn', icon: Activity, color: 'text-orange-400', textColor: 'text-orange-300' }
    ],
    links: { github_link: "https://github.com/xoTEMPESTox/TCET_ACM_SIGAI_KAGGLE_COMP", live_link: "https://www.kaggle.com/competitions/acm-sigai-tcet" }
  }
];

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const realCount = rawPortfolioData.length;
  
  // --- Responsive Config Hook ---
  const [config, setConfig] = useState({ size: 200, gap: 64, visibleWidth: 860 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: Show mainly 1 cube (240px) with partial side visibility
        // Container width set to full screen to allow "peeking"
        setConfig({ size: 240, gap: 24, visibleWidth: '100%' }); 
      } else if (width < 1024) {
        // Tablet: 3 Smaller cubes
        setConfig({ size: 200, gap: 40, visibleWidth: 720 });
      } else {
        // Desktop: 3 Standard cubes
        setConfig({ size: 220, gap: 64, visibleWidth: 860 });
      }
    };
    
    // Initial call
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cubeList = useMemo(() => {
    const startClones = rawPortfolioData.slice(-NUM_PHANTOM);
    const endClones = rawPortfolioData.slice(0, NUM_PHANTOM);
    return [...startClones, ...rawPortfolioData, ...endClones];
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
  }, [config.visibleWidth]); // Recalculate when max-width changes

  const getTranslation = useCallback((index) => {
    if (!wrapperWidth) return 0;
    const itemWidth = config.size + config.gap;
    return (wrapperWidth / 2) - (index * itemWidth + (config.size / 2));
  }, [wrapperWidth, config]);

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
    <div className="page-section bg-[#050505] min-h-screen text-white overflow-hidden font-sans">
      <header className="pt-12 pb-8 text-center px-4 z-10 flex justify-center items-center">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl w-fit p-6 md:p-12 border border-white/5">
          <p className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-0 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-black/20 uppercase">
            Portfolio
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="w-full mx-auto h-[400px] relative flex items-center justify-center touch-none select-none cursor-grab active:cursor-grabbing overflow-hidden md:rounded-xl md:border-x border-white/5"
        style={{ 
          perspective: '1200px',
          maxWidth: config.visibleWidth
        }}
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
            gap: `${config.gap}px`,
            transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          {cubeList.map((item, index) => (
            <Cube 
              key={`${index}-${item.title}`} 
              item={item} 
              isDragging={isDragging} 
              onViewDetails={setSelectedProject}
              size={config.size}
            />
          ))}
        </div>

        {/* Responsive Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
      </div>

      {selectedProject && (
        <DetailCard 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <footer className="pb-16 pt-8 text-center text-gray-500 text-sm md:text-3xl tracking-widest uppercase opacity-60 px-4">
        Hover edges to rotate • Drag to navigate
      </footer>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Portfolio;