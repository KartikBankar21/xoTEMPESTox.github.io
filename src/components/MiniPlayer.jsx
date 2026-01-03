import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

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
