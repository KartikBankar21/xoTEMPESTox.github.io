import React, { useEffect, useState } from "react";
import HeaderBackground from "./components/HeaderBackground";
import FooterNavbar from "./components/FooterNavbar";
import AnimatedOutlet from "./AnimatedOutlet";
import SvgText from "./components/SvgText";
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* 1. Background is ALWAYS mounted so the video can load */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none", // so loader still reacts normally
        }}
      >
        <HeaderBackground />
      </div>

      {/* 2. Loader overlays everything until animation completes */}
      {loading && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-[9999]"
        >
          <SvgText onFinish={() => setLoading(false)} />
        </div>
      )}

      {/* 3. Main content shows only after loading */}
      {!loading && (
        <>
          <div
            className="page-overlay"
            style={{
              position: "relative",
              width: "100%",
              minHeight: "calc(100vh)",
              zIndex: 10,
            }}
          >
            <AnimatedOutlet />
          </div>

          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 100,
            }}
          >
            <FooterNavbar />
          </div>
        </>
      )}
    </div>
  );
}

export default App;