import React from "react";
import HeaderBackground from "./components/HeaderBackground";
import FooterNavbar from "./components/FooterNavbar";
import AnimatedOutlet from "./AnimatedOutlet";

function App() {
  return (
    <div className="App " style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <HeaderBackground />
      </div>
      <div className="page-overlay" style={{ position: 'relative', width: '100%', minHeight: 'calc(100vh)', zIndex: 10,   }}>
        <AnimatedOutlet />
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
        <FooterNavbar />
      </div>
    </div>
  );
}

export default App;