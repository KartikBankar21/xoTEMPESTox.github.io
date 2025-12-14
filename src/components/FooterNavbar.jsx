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

const FooterNavbar = () => {
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
    text-white 
    w-[80%] md:w-[64%] max-w-9xl 
    min-h-[5rem] rounded-[1.4rem] 
    text-[2.2rem] sm:text-[2.1rem] 
    isolation-isolate z-[999999999999] 
    overflow-hidden transition-all duration-300
    max-lg:w-[93%] max-lg:bottom-6
    
  `;

  return (
    <div
      ref={listRef}
      className={listClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <ul className="flex justify-evenly items-center w-full relative z-10 p-0 m-0  media-object">
        {navItems.map((item) => (
          <li key={item.to} className="list-item">
            {/* NavLink for routing and active state */}
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `demo-icon ${item.icon} ${
                  isActive ? "text-[#00d9ff]" : "text-white hover:text-gray-300"
                } transition-colors duration-300`
              }
            >
              {/* Icon is rendered via the demo-icon class and custom font */}
            </NavLink>
          </li>
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

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/main.css";

// const FooterNavbar = () => {
//   const navItems = [
//     { to: "/", label: "Home", icon: "homeicon-" },
//     { to: "/about", label: "About", icon: "help-circledicon-" },
//     { to: "/journey", label: "Journey", icon: "chart-baricon-" },
//     { to: "/skills", label: "Skills", icon: "toolsicon-" },
//     { to: "/services", label: "Services", icon: "clipboardicon-" },
//     { to: "/portfolio", label: "Portfolio", icon: "briefcaseicon-" },
//     // { to: "/reviews", label: "Reviews", icon: "staricon-" },
//     { to: "/socials", label: "Socials", icon: "linkicon-" },
//   ];

//   return (
//     <ul className="list" id="list">
//       {navItems.map((item) => (
//         <li key={item.to} className="list-item">
//           <NavLink
//             to={item.to}
//             className={({ isActive }) =>
//               `demo-icon ${item.icon} ${isActive ? "active" : ""} `
//             }
//           >
//           </NavLink>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default FooterNavbar;

// import React from 'react'
// import '../styles/styles.css'
// const FooterNavbar = () => {
//   return (
//     <div>
//         <ul class="list" id="list">
//             <li id="item-home" class="list-item" data-name-sec="home">
//                 <i class="demo-icon homeicon-"></i>
//             </li>

//             <li id="item-about" class="list-item" data-name-sec="about">
//                 <i class="demo-icon help-circledicon-"></i>
//             </li>

//             <li id="item-journey" class="list-item" data-name-sec="journey">
//                 <i class="demo-icon chart-baricon-"></i>
//             </li>

//             <li id="item-skills" class="list-item" data-name-sec="skills">
//                 <i class="demo-icon toolsicon-"></i>
//             </li>

//             <li id="item-services" class="list-item" data-name-sec="services">
//                 <i class="demo-icon clipboardicon-"></i>
//             </li>

//             <li id="item-portfolio" class="list-item" data-name-sec="portfolio">
//                 <i class="demo-icon briefcaseicon-"></i>
//             </li>

//             <li id="item-socials" class="list-item" data-name-sec="socials">
//                 <i class="demo-icon linkicon-"></i>
//             </li>
//         </ul>
//     </div>
//   )
// }

// export default FooterNavbar
