import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/main.css"; // We'll put the complex CSS/Animations here

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
    isolation-isolate z-[999999999999] 
    overflow-hidden transition-all duration-300
    max-lg:w-[93%] max-lg:bottom-6
    bg-gray-700/20
  `;

  return (
    <div
      ref={listRef}
      className={listClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <ul className="flex justify-evenly items-center w-full relative z-10 p-0 m-0 media-object group">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate} // <--- Trigger the audio here
            className="relative list-none" // Relative container for the absolute background
          >
            {({ isActive }) => (
              <>
                {/* 1. Gradient Background: Only visible if isActive is true */}
                <div
                  className={`absolute -inset-2 rounded-full blur-lg bg-gradient-to-r from-blue-500/60 to-purple-500/60 pointer-events-none transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                {/* 2. The Icon */}
                <span
                  className={`demo-icon ${
                    item.icon
                  } relative z-10 transition-colors duration-300 ${
                    isActive
                      ? "text-white" // Always white if active
                      : "text-gray-400 group-hover:text-white" // Gray by default, white when nav is hovered
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
          // Tailwind-like style for the glow itself:
          background:
            "radial-gradient(circle, rgba(169, 169, 169, 0.4) 0%, transparent 70%)",
        }}
      ></div>
    </div>
  );
};

export default FooterNavbar;
