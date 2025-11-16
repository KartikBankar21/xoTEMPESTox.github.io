import React from "react";
import HeaderBackground from "./components/HeaderBackground";
import FooterNavbar from "./components/FooterNavbar";
import AnimatedOutlet from "./AnimatedOutlet";

function App() {
  return (
    <div className="App horizontal-wrapper" style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <HeaderBackground />
      </div>
      <div className="page-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
        <AnimatedOutlet />
      </div>
      <div style={{ position: 'relative', zIndex: 100 }}>
        <FooterNavbar />
      </div>
    </div>
  );
}

export default App;