import React, { useState, useEffect } from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Pause,
  Heart,
  Volume2,
  ChevronDown,
  ListMusic,
  VolumeX,
} from "lucide-react";

// --- Custom CSS & Color Variables ---
const customStyles = `
/* Custom Tailwind Configuration (replicated here for self-containment) */
.lo-fi-config {
    --lo-fi-bg: #f8f4ff;
    --lo-fi-ui: #e5d4f9;
    --lo-fi-accent: #c6aee3;
    --lo-fi-dark: #5a3d8b;
}

.icon-btn {
    /* Base padding is now handled via utility classes in JSX for responsiveness */
    border-radius: 0.75rem; /* rounded-xl */
    transition: all 150ms ease-in-out;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); /* shadow-inner */
}

/* Base styles for the player states, sizing is handled by Tailwind utility classes */
.minimized {
    /* Use custom rounding for the mobile top-right bar shape */
    padding: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    background-color: #f3eaf8c3;
    border: 2px solid var(--lo-fi-accent);
}

.expanded {
    height: auto;
    padding: 1rem;
    border-radius: 2.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
    background-color:#f3eaf8c3;
}

/* Styles for rotated text/elements in the vertical bar */
/* We remove the rotation properties here so we can control them via Tailwind utilities (lg:...) */
.rotated-text-container { 
    white-space: nowrap;
    line-height: 1.2;
}

/* Utility classes for Desktop (lg:) breakpoint, applied via JSX */
.lg\:vertical-rl {
    writing-mode: vertical-rl; /* Rotate text 90 degrees clockwise */
}

.lg\:rotate-180 {
    transform: rotate(0deg); /* Flip it to read bottom-to-top */
}


/* Transition class for the elastic effect */
.elastic-in {
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Specific style for the menu overlay */
.menu-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
    background-color: rgba(243, 234, 248, 0.9); /* Semi-transparent background */
    z-index: 10;
}
`;

const TRANSITION_DURATION = 500; // Match CSS 0.5s

// --- Mock Track Data ---
const TRACKS = [
  {
    id: 0,
    title: "doehli - denial is a river",
    duration: 232,
    artist: "Doehli",
    img: "https://placehold.co/400x533/c6aee3/ffffff?text=Denial",
  },
  {
    id: 1,
    title: "Daylight - Chill Beats",
    duration: 180,
    artist: "Chill Flow",
    img: "https://placehold.co/400x533/aee3c6/5a3d8b?text=Daylight",
  },
  {
    id: 2,
    title: "Rainy Cafe - Study Mix",
    duration: 250,
    artist: "Aesthetic Sounds",
    img: "https://placehold.co/400x533/3d8b85/ffffff?text=Rainy+Cafe",
  },
  {
    id: 3,
    title: "Midnight Drive - Synthwave",
    duration: 210,
    artist: "Neon City",
    img: "https://placehold.co/400x533/3b3e66/aee3c6?text=Synthwave",
  },
];

const verticalTextStyle = {
  writingMode: "vertical-rl",
  transform: "rotate(270deg)",
  whiteSpace: "nowrap",
};

// --- MiniPlayer Component (Minimized View) ---
export const MiniPlayer = ({
  onExpand,
  currentTrack,
  isPlaying,
  isMuted,
  setIsMuted,
  handleMuteToggle,
  handleAudioPlay,
}) => {
  return (
    // Default (Mobile/Tablet): Horizontal (flex-row)
    // Desktop (lg:): Vertical (lg:flex-col)
    <div className="relative h-full w-full overflow-hidden group ">
      <div
        className=" absolute inset-0 bg-[#000000] pointer-events-none"
        style={{
          filter: "url(#nnnoise-filter)",
        }}
        // onClick={onExpand}
      />
      <div
        id="mini-player-content"
        className=" flex flex-row items-end justify-center lg:flex-col lg:rotate-180 lg:justify-between lg:items-center h-full w-full px-2 py-1 lg:p-2 text-[var(--lo-fi-dark)] "
      >
        {/* Album Art: Always visible, fixed size */}
        <div
          className="w-9 h-9 lg:w-16 lg:h-16 rounded-lg lg:-rotate-90 shadow-md flex-shrink-0 overflow-hidden cursor-pointer select-none hover:opacity-100 active:scale-95 transition"
          onClick={onExpand}
        >
          <img
            src={currentTrack.img}
            alt="Album Art"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Song Info: Horizontal on mobile, Rotated on desktop */}
        <div
          className="flex-grow flex items-center justify-center p-2 cursor-pointer select-none hover:opacity-100 active:scale-95 transition"
          onClick={onExpand}
        >
          <div
            className="flex flex-col rotated-text-container lg:vertical-rl lg:-rotate-90 lg:justify-center lg:items-start space-y-0 lg:space-y-1 truncate flex-grow mx-0 lg:mx-0 lg:mt-4 lg:mb-4 text-center"
            style={verticalTextStyle}
          >
            <p className="text-xs text-white lg:text-xl font-bold tracking-wide truncate max-w-[100px] lg:max-w-none">
              {currentTrack.title}
            </p>
            {/* Artist visible only on larger screens, including desktop minimized */}
            <p className="text-lg text-white opacity-70 sm:block lg:block">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Volume/Mute Icon: Hidden on mobile (lack of space), visible on desktop vertical bar */}
        <div className="flex flex-row-reverse items-center justify-center lg:flex lg:flex-col lg:items-center lg:justify-between lg:rotate-180 space-y-2 flex-shrink-0  ">
          <button 
            onClick={() => {
              handleAudioPlay();
              console.log("Play Pause");
            }}
            className="bg-[#c6aee3] p-2 lg:p-2 rounded-full  active:scale-95 flex-shrink-0 bg-transparent relative"
            aria-label="Expand Player"
          >
            <div class="absolute inset-0 rounded-full opacity-0 blur transition-all duration-300 group-hover:opacity-100 group-[.active]:opacity-100 group-[.active]: bg-gradient-to-r from-blue-500/30 to-purple-500/30 pointer-events-none "></div>
            {isPlaying ? (
              // Icon when playing
              <Pause className="text-white hover:text-sky-400 w-5 h-5 lg:w-9 lg:h-9 fill-current" />
            ) : (
              // Icon when paused
              <Play className=" text-white hover:text-sky-400  w-5 h-5 lg:w-9 lg:h-9 fill-current" />
            )}
          </button>
          <button
            onClick={() => {
              handleMuteToggle();
              console.log("hello");
            }}
            className="p-2 active:scale-95 flex-shrink-0 bg-transparent text-[var(--lo-fi-dark)] relative"
            aria-label={isMuted ? "Unmute Volume" : "Mute Volume"}
          >
             <div class="absolute inset-0 rounded-full opacity-0 blur transition-all duration-300 group-hover:opacity-100 group-[.active]:opacity-100 group-[.active]: bg-gradient-to-r from-blue-500/30 to-purple-500/30 pointer-events-none "></div>
            {isMuted ? (
              // Icon when muted
              <VolumeX className="text-white hover:text-sky-400 w-5 h-5 lg:w-8 lg:h-8 fill-current" />
            ) : (
              // Icon when audible
              <Volume2 className="text-white hover:text-sky-400 w-5 h-5 lg:w-8 lg:h-8 fill-current" />
            )}
          </button>
          {/* Play/Expand Button: Always visible */}
        </div>
      </div>
    </div>
  );
};
