



// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useCallback,
// } from "react";
// import {
//   Github,
//   ExternalLink,
//   Activity,
//   Server,
//   Database,
//   Code,
//   Cloud,
//   Box,
// } from "lucide-react";

// // --- Configuration Constants ---
// const CUBE_WIDTH = 200;
// const GAP_WIDTH = 64; // 4rem
// const ITEM_WIDTH = CUBE_WIDTH + GAP_WIDTH;
// const AUTO_SLIDE_DELAY = 2500;
// const SWIPE_THRESHOLD = 50;
// const NUM_PHANTOM = 3;

// // --- Data ---
// const rawPortfolioData = [
//   {
//     title: "Organizational Chatbot",
//     description:
//       "RAG-powered HR & IT assistant with secure 2FA and tool calling.",
//     image_url: "https://placehold.co/200x200/0d1e3d/FFFFFF?text=Chatbot",
//     tag: "AI/ML Project",
//     links: {
//       github_link: "https://github.com/xoTEMPESTox/Enerzal",
//       live_link: "https://www.youtube.com/watch?v=azj_7OdSxcY",
//     },
//   },
//   {
//     title: "Eco Chain",
//     description:
//       "MERN + Blockchain marketplace for carbon credit tokenization.",
//     image_url: "https://placehold.co/200x200/1e3a8a/FFFFFF?text=EcoChain",
//     tag: "Web3 Ecosystem",
//     links: {
//       github_link: "https://github.com/xoTEMPESTox/EcoChain",
//       live_link: "https://eco-chain-ashen.vercel.app/",
//     },
//   },
//   {
//     title: "Supplyzal",
//     description:
//       "Blockchain-based supply tracking with verified sustainability.",
//     image_url: "https://placehold.co/200x200/2563eb/FFFFFF?text=Supplyzal",
//     tag: "Blockchain Dapp",
//     links: {
//       github_link: "https://github.com/xoTEMPESTox/Supplyzal",
//       live_link: "https://www.youtube.com/watch?v=CEGqZsqdnN8",
//     },
//   },
//   {
//     title: "LedgerPlay",
//     description: "ERC20 based Staking Logic with Web socket based Multiplayer.",
//     image_url: "https://placehold.co/200x200/3b82f6/FFFFFF?text=LedgerPlay",
//     tag: "Gaming/Web3",
//     links: {
//       github_link: "https://github.com/xoTEMPESTox/LedgerPlay",
//       live_link: "https://www.youtube.com/watch?v=w-SHifenCqE",
//     },
//   },
//   {
//     title: "WakeBot32",
//     description: "ESP32 based WOL bot using Telegram API and Arduino IDE",
//     image_url: "https://placehold.co/200x200/60a5fa/FFFFFF?text=WakeBot32",
//     tag: "Hardware/IoT",
//     links: {
//       github_link: "https://github.com/xoTEMPESTox/WakeBot32",
//       live_link: "https://youtu.be/fOirqvQiiFo",
//     },
//   },
//   {
//     title: "TradingviewPlus",
//     description: "Open Source Contributor for Trading View extension.",
//     image_url: "https://placehold.co/200x200/93c5fd/FFFFFF?text=TVPlus",
//     tag: "OSS Contribution",
//     links: {
//       github_link: "https://github.com/Tiqur/TradingviewPlus",
//       live_link:
//         "https://chromewebstore.google.com/detail/tradingviewplus/pkcgjgllebhppgegpedlhjmabmnpcpec?hl=en&authuser=0",
//     },
//   },
//   {
//     title: "Portfolio Website",
//     description: "Portfolio website Built with Quality and Performance in mind",
//     image_url: "https://placehold.co/200x200/bfdbfe/000000?text=Portfolio",
//     tag: "Personal Website",
//     links: {
//       github_link: "https://github.com/xoTEMPESTox/xoTEMPESTox.github.io",
//       live_link: "https://priyanshusah.com",
//     },
//   },
//   {
//     title: "ML Kaggle Competition",
//     description: "Hosted a Kaggle Competition under TCET ACM SIG AI 2025",
//     image_url: "https://placehold.co/200x200/e0f2fe/000000?text=Kaggle",
//     tag: "Competition Host",
//     links: {
//       github_link: "https://github.com/xoTEMPESTox/TCET_ACM_SIGAI_KAGGLE_COMP",
//       live_link: "https://www.kaggle.com/competitions/acm-sigai-tcet",
//     },
//   },
// ];

// // --- Tech Stack Icons (SVG Components) ---
// const TechIcon = ({ name, className }) => {
//   switch (name) {
//     case "React":
//       return (
//         <svg
//           className={className}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M7 12l3 3 7-7" />
//           <path d="M12 2l-8 5v10l8 5 8-5V7l-8-5z" />
//         </svg>
//       );
//     case "Node.js":
//       return (
//         <svg
//           className={className}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
//           <line x1="8" y1="21" x2="16" y2="21" />
//           <line x1="12" y1="17" x2="12" y2="21" />
//         </svg>
//       );
//     case "MongoDB":
//       return (
//         <svg
//           className={className}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <ellipse cx="12" cy="5" rx="9" ry="3" />
//           <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
//           <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
//         </svg>
//       );
//     case "Tailwind CSS":
//       return (
//         <svg
//           className={className}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <polyline points="16 18 22 12 16 6" />
//           <polyline points="8 6 2 12 8 18" />
//         </svg>
//       );
//     case "DigitalOcean":
//       return (
//         <svg
//           className={className}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
//           <path d="M12 2a10 10 0 0 0-8 4h16a10 10 0 0 0-8-4z" />
//           <path d="M12 22a10 10 0 0 1-8-4h16a10 10 0 0 1-8 4z" />
//           <path d="M2 12h20" />
//           <path d="M12 2v20" />
//         </svg>
//       );
//     case "TypeScript":
//       return (
//         <svg
//           className={className}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
//           <line x1="9" y1="12" x2="15" y2="12" />
//           <line x1="12" y1="9" x2="12" y2="15" />
//         </svg>
//       );
//     default:
//       return <Box className={className} />;
//   }
// };

// const availableTech = [
//   { name: "React", color: "text-blue-400" },
//   { name: "Node.js", color: "text-green-400" },
//   { name: "MongoDB", color: "text-yellow-400" },
//   { name: "Tailwind CSS", color: "text-cyan-400" },
//   { name: "DigitalOcean", color: "text-gray-400" },
//   { name: "TypeScript", color: "text-blue-500" },
// ];

// const Cube = ({ item, isDragging }) => {
//   const [rotation, setRotation] = useState({ x: 0, y: 0 });
//   const [overrideClass, setOverrideClass] = useState(""); // 'show-right' | 'show-left' | ''
//   const cubeRef = useRef(null);

//   // Inside your Cube component
//   const isFront = overrideClass === "";
//   const isRight = overrideClass.includes("rotate-y-[-90deg]");
//   const isLeft = overrideClass.includes("rotate-y-[90deg]");

//   const transformString = overrideClass
//     ? ` ${overrideClass
//         .replace("rotate-y-[", "rotateY(")
//         .replace("]", ")")}`
//     : ``;

//     // 2. Apply a "Z-Bump" to the active face
// // We add an extra 1px to the translateZ of the active face
// const face1Style = {
//   transform: `rotateY(0deg) translateZ(${isFront ? '101px' : '100px'})`,
//   zIndex: isFront ? 50 : 1,
// };

// const face2Style = {
//   transform: `rotateY(-90deg) translateZ(${isLeft ? '101px' : '100px'})`,
//   zIndex: isLeft ? 50 : 1,
// };

// const face3Style = {
//   transform: `rotateY(90deg) translateZ(${isRight ? '101px' : '100px'})`,
//   zIndex: isRight ? 50 : 1,
// };
//   // Handle manual rotation interaction
//   const handleMouseMove = (e) => {
//     if (isDragging) return;

//     // Calculate relative position inside the cube
//     const rect = cubeRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const mouseX = e.clientX;
//     const relX = (mouseX - centerX) / (rect.width / 2);

//     const THRESHOLD = 0.3;

//     if (relX < -THRESHOLD) {
//       setOverrideClass("rotate-y-[-90deg]"); // Show Right Face (Links)
//     } else if (relX > THRESHOLD) {
//       setOverrideClass("rotate-y-[90deg]"); // Show Left Face (Tech)
//     } else {
//       setOverrideClass("");
//     }
//   };

//   const resetRotation = () => setOverrideClass("");

//   // Handlers for click-based navigation
//   const showDetails = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setOverrideClass("rotate-y-[-90deg]");
//   };

//   const showTech = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setOverrideClass("rotate-y-[90deg]");
//   };

//   const showFront = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setOverrideClass("");
//   };

//   // Resolve the current transform string
//   // Base transform is translateZ(-100px). The override adds rotation.
//   const transformStyle = overrideClass
//     ? `translateZ(-100px) ${overrideClass
//         .replace("rotate-y-[", "rotateY(")
//         .replace("]", ")")}`
//     : `translateZ(-100px)`;

//     const activeZ = "12.5rem"; // Slightly more than your base 12rem
// const inactiveZ = "11rem"; // Slightly less than base

//   return (
//     <div
//       className="relative w-[200px] h-[200px] cursor-pointer   overflow-visible antialiased"
//       style={{ opacity: 1, transform:'none', perspective: '1000px',  }} // Local perspective for the cube content? No, parent handles it.
//       onMouseMove={handleMouseMove}
//       onMouseLeave={resetRotation}
//     >
//       <div
//         ref={cubeRef}
//         className="w-full h-full relative preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] will-change-transform"
//         style={{
//           transformStyle: "preserve-3d", // ensures children keep their 3D positions
//           WebkitTransformStyle: "preserve-3d",
//           willChange: "transform",
//           transform: transformString, // see note below about variable naming
//           pointerEvents: "auto",
//         }}
//       //    onMouseMove={handleMouseMove}
//       // onMouseLeave={resetRotation}
//       >
//         {/* FACE 1: Front (Project Info) */}
//         <div
//           className={`absolute inset-0 w-[200px] h-[200px] backface-hidden bg-[#1a1a2e] text-gray-100 rounded-xl shadow-2xl flex flex-col p-4 border border-white/10 `}
//           style={{
//             // face1Style,
//             transform: "rotateY(0deg) translateZ(100px) translateZ(0px)",
//             backfaceVisibility: "hidden",
//             WebkitBackfaceVisibility: "hidden",
//             pointerEvents: "auto"
         
//           }}
//         >
//           <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-bl-lg rounded-tr-lg shadow-lg flex-1">
//             {item.tag}
//           </div>

//           <div className="mt-2 flex-1">
//             <Activity className="w-5 h-5 text-green-400 mb-3" />
//             <h3 className="text-lg font-bold leading-tight mb-2">
//               {item.title}
//             </h3>
//             <p className="text-[11px] text-gray-400 leading-snug line-clamp-3">
//               {item.description}
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               showDetails;
//               console.log("Show Details");
//               setOverrideClass("rotate-y-[-90deg]");
//             }}
//             className="mt-auto flex items-center justify-center text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
//           >
//             View Details &rarr;
//           </button>
//         </div>

//         {/* FACE 2: Left (Tech Stack) */}
//         <div
//           className={`absolute inset-0 w-[200px] h-[200px] backface-hidden bg-[#1a1a2e] rounded-xl shadow-2xl overflow-hidden border border-white/10  `}
//           style={{
//             // face2Style,
//             transform: "rotateY(90deg) translateZ(100px) translateZ(0px)",
//             backfaceVisibility: "hidden",
//             WebkitBackfaceVisibility: "hidden",
//           // pointerEvents: "auto"
//           }}
//         >
//           <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-[#44002c] via-[#201323] to-[#150033]" />

//           <div className="relative p-4 h-full flex flex-col">
//             <h3 className="text-lg font-bold text-white mb-3">Tech Stack</h3>
//             <div className="flex flex-wrap gap-2 content-start flex-grow">
//               {item.techStack.map((tech, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded text-[10px] text-white backdrop-blur-sm"
//                 >
//                   <TechIcon
//                     name={tech.name}
//                     className={`w-3 h-3 ${tech.color}`}
//                   />
//                   <span>{tech.name}</span>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={showFront}
//               className="mt-2 flex items-center text-xs text-blue-400 hover:text-blue-300 self-end"
//             >
//               Back &rarr;
//             </button>
//           </div>
//         </div>

//         {/* FACE 3: Right (Links & Image) */}
//         <div
//           className={`absolute inset-0 w-[200px] h-[200px] backface-hidden bg rounded-xl shadow-2xl flex items-end justify-end border border-white/10 overflow-hidden   `}
//           style={{
//             // face3Style,
//             transform: "rotateY(-90deg) translateZ(100px) translateZ(0px)",
//             backfaceVisibility: "hidden",
//             WebkitBackfaceVisibility: "hidden",
//            pointerEvents: "auto",
//           //  zIndex: isRight ? 100 : 1,
//            transformStyle: 'preserve-3d',

//           }}
//         >
//           <div
//             className="absolute inset-0 bg-cover bg-center opacity-90 mix-blend-overlay"
//             style={{ backgroundImage: `url(${item.image_url})` }}
//           />

//           <div className="relative flex flex-col gap-4 items-center px-3 pt-4 pb-2 bg-sky-400 rounded-tl-4xl ">
//             <div className="flex gap-3">
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   console.log("GitHub Clicked!");
//                   //   window.open(item.links.github_link, '_blank');
//                 }}
//                 className="p-3 bg-gray-900/80 backdrop-blur-md rounded-full text-white hover:scale-110 transition-transform hover:bg-black shadow-xl ring-1 ring-white/20 z-50"
//               >
//                 <Github size={20} />
//               </button>
//               <button
//                 onClick={(e) => {
//                   console.log("Open Github");
//                   e.stopPropagation();
//                   window.open(
//                     item.links.live_link,
//                     "_blank",
//                     "noopener,noreferrer"
//                   );
//                 }}
//                 className="p-3 bg-blue-900/80 backdrop-blur-md rounded-full text-white hover:scale-110 transition-transform hover:bg-blue-800 shadow-xl ring-1 ring-white/20 relative z-50"
//               >
//                 <ExternalLink size={20} />
//               </button>
//             </div>
//             {/* <button 
//                   onClick={showFront}
//                   className="px-3 py-1 bg-black/40 rounded-full text-[10px] text-white hover:bg-black/60 transition-colors"
//                 >
//                   Return to Front
//                </button> */}
//           </div>
//         </div>

        {/* FACE 4: Back (Source Hint) */}
        {/* <div
          className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-[#1a1a2e] flex flex-col items-center justify-center text-center p-4 border border-white/10"
          style={{ transform: "rotateY(180deg) translateZ(100px)" }}
        >
          <div className="text-gray-400 text-sm">Repository</div>
          <div className="text-white text-xs mt-1 font-mono break-all opacity-70">
            {item.links.github_link.split("/").pop()}
          </div>
        </div> */}

//         {/* FACE 5: Top (Decorative) */}
//         {/* <div className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-400 flex items-center justify-center text-blue-900 font-bold opacity-50"
//              style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}>
//         </div> */}

//         {/* FACE 6: Bottom (Decorative) */}
//         {/* <div
//           className="absolute inset-0 w-[200px] h-[200px] backface-hidden bg-blue-300 flex items-center justify-center text-blue-900 font-bold opacity-50"
//           style={{ transform: "rotateX(90deg) translateZ(100px)" }}
//         ></div> */}
//       </div>

      
//     </div>
//   );
// };

// export default Cube;
