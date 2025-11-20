import React, { useState, useEffect } from 'react';

const CopiedCard = () => {
  const [rotation, setRotation] = useState(-90); // Start at -90deg (edge-on)
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Animate in after mount
    const timer = setTimeout(() => {
      setRotation(0); // Rotate to front face
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (rotation === 0) {
      setRotation(180); // Flip to back
      setIsFlipped(true);
    } else if (rotation === 180) {
      setRotation(0); // Flip to front
      setIsFlipped(false);
    }
  };

  return (
      <div
        className="h-75 md:h-110 md:w-126 w-96 relative cursor-pointer perspective overflow-visible antialiased"
        style={{ opacity: 1, transform: 'none', perspective: '1000px' }}
        onClick={handleClick}
      >
        <div
          className="w-full h-full relative transition-transform duration-700 ease-in-out will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 w-full h-full rounded-xl bg-black backdrop-blur-md border border-white/20 p-4 flex flex-col justify-between shadow-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute -top-3 -right-5 px-2 py-1 rounded-full overflow-hidden z-10">
              <div className="relative z-10 px-2 py-1 rounded-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white text-xs font-medium">
                Top 10 Amazon Smbhav GenAI Hackathon
              </div>
            </div>
            <div>
              <div className="text-3xl mb-2 text-white/90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bot text-blue-400"
                >
                  <path d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path d="M2 14h2"></path>
                  <path d="M20 14h2"></path>
                  <path d="M15 13v2"></path>
                  <path d="M9 13v2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">GenAI SmartLister</h3>
              <p className="text-gray-300 text-xs">
                AI-powered product listing generator built during Amazon Smbhav
                Hackathon
              </p>
            </div>
            <div className="md:hidden flex flex-wrap gap-1 my-3">
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                <span className="text-white/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-code"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </span>
                <span className="text-xs text-gray-300">Python</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                <span className="text-white/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-globe"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </span>
                <span className="text-xs text-gray-300">Gemini API</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                <span className="text-white/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-globe"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </span>
                <span className="text-xs text-gray-300">Stable Diffusion</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                <span className="text-white/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-code"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </span>
                <span className="text-xs text-gray-300">Streamlit</span>
              </div>
            </div>
            <div
              className="text-blue-400 text-xs flex items-center gap-1"
              style={{ transform: 'none' }}
            >
              View Details →
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 w-full h-full rounded-xl bg-blue-700  backdrop-blur-md border border-white/20 p-4 flex flex-col justify-between shadow-lg"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div>
              <h3 className="text-sm font-bold text-white mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                  <span className="text-white/90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-code"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </span>
                  <span className="text-xs text-gray-300">Python</span>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                  <span className="text-white/90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-globe"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </span>
                  <span className="text-xs text-gray-300">Gemini API</span>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                  <span className="text-white/90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-globe"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </span>
                  <span className="text-xs text-gray-300">Stable Diffusion</span>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                  <span className="text-white/90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-code"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </span>
                  <span className="text-xs text-gray-300">Streamlit</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="https://inferno2211-amazon-smbhav.streamlit.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors text-xs group"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Website</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-external-link opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </a>
              <div className="text-blue-400 text-xs flex items-center gap-1">
                Click for more →
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CopiedCard;