import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/main.css";


const FooterNavbar = () => {
  const navItems = [
    { to: "/", label: "Home", icon: "homeicon-" },
    { to: "/about", label: "About", icon: "help-circledicon-" },
    { to: "/journey", label: "Journey", icon: "chart-baricon-" },
    { to: "/skills", label: "Skills", icon: "toolsicon-" },
    { to: "/services", label: "Services", icon: "clipboardicon-" },
    { to: "/portfolio", label: "Portfolio", icon: "briefcaseicon-" },
    // { to: "/reviews", label: "Reviews", icon: "staricon-" },
    { to: "/socials", label: "Socials", icon: "linkicon-" },
  ];

  return (
    <ul className="list" id="list">
      {navItems.map((item) => (
        <li key={item.to} className="list-item">
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `demo-icon ${item.icon} ${isActive ? "active" : ""} `
            }
          >
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default FooterNavbar;


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