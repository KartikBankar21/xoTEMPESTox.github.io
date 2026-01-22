import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/main.css"; // We'll put the complex CSS/Animations here
import { useTheme } from "./HeaderBackground";

const navItems = [
  { to: "/", label: "Home", icon: "homeicon-" },
  { to: "/about", label: "About", icon: "help-circledicon-" },
  { to: "/journey", label: "Journey", icon: "chart-baricon-" },
  { to: "/skills", label: "Skills", icon: "toolsicon-" },
  { to: "/services", label: "Services", icon: "clipboardicon-" },
  { to: "/portfolio", label: "Portfolio", icon: "briefcaseicon-" },
  { to: "/socials", label: "Socials", icon: "linkicon-" },
];

const FooterNavbar = ({ onNavigate }) => {
  const listRef = useRef(null);
  const { theme } = useTheme();
  
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0, opacity: 0 });

  // Handle mouse movement to update the grey glow position
  const handleMouseMove = (e) => {
    if (listRef.current) {
      const rect = listRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setGlowPosition({ x, y, opacity: 1 });
    }
  };

  // 2. Get current route to determine visibility
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Hide the glow when the mouse leaves
  const handleMouseLeave = () => {
    setGlowPosition({ ...glowPosition, opacity: 0 });
  };

  // Show the glow when the mouse enters (for initial visibility if moved quickly)
  const handleMouseEnter = () => {
    setGlowPosition((prev) => ({ ...prev, opacity: 1 }));
  };

  // Tailwind classes define the main layout and basic styling
const listClasses = `
    padding-zero
    list 
    flex justify-evenly items-center 
    w-[80%] md:w-[64%] max-w-9xl 
    min-h-[5rem] rounded-[1.4rem] 
    text-[2.2rem] sm:text-[2.1rem] 
    isolation-isolate z-[999999] 
    overflow-hidden transition-all duration-300
    max-lg:w-[93%] max-lg:bottom-6
    ${theme === 'light' ? 'bg-white' : 'bg-black'}
  `;

  return (
    <div
      ref={listRef}
      className={listClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      data-theme={theme}
      style={{
        position: 'fixed',
        left: '50%', // Move to center
        bottom: '20px', // Spacing from bottom
        
        // This handles both Centering (-50% X) AND Hiding (200% Y)
        transform: isHome 
          ? 'translate(-50%, 200%)' // Move DOWN off-screen
          : 'translate(-50%, 0)',   // Move UP to normal position
          
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth animation
      }}
    >
      <ul className="flex justify-evenly items-center w-full relative z-10 p-0 m-0 media-object group">
       {navItems.map((item) => (
  <NavLink
    key={item.to}
    to={item.to}
    onClick={onNavigate}
    className="relative list-none"
  >
    {({ isActive }) => (
      <>
        {/* 1. Gradient Background: Adjusted for Light Mode */}
        <div
          className={`absolute -inset-2 rounded-full blur-lg pointer-events-none transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          } ${
            theme === 'light' 
              ? "bg-gradient-to-r from-blue-400 to-purple-400" // Softer for light mode
              : "bg-gradient-to-r from-blue-500/60 to-purple-500/60"
          }`}
        ></div>

        {/* 2. The Icon: Now theme-aware */}
        <span
          className={`demo-icon ${item.icon} relative z-10 transition-colors duration-300 ${
            isActive
              ? (theme === 'light' ? "text-black" : "text-white") // Blue in light, White in dark
              : (theme === 'light' 
                  ? "text-gray-500 group-hover:text-black" 
                  : "text-gray-400 group-hover:text-white")
          }`}
        ></span>
      </>
    )}
  </NavLink>
))}
      </ul>

      {/* Grey Cursor Glow Effect */}
     <div
  className="cursor-glow"
  style={{
    left: `${glowPosition.x}px`,
    top: `${glowPosition.y}px`,
    opacity: glowPosition.opacity,
    background: theme === 'light'
      ? "radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, transparent 70%)" // Subtle dark glow
      : "radial-gradient(circle, rgba(169, 169, 169, 0.4) 0%, transparent 70%)", // Light glow
  }}
></div>
    </div>
  );
};

export default FooterNavbar;
