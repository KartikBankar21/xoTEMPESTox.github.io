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
    <div className="relative h-full w-full overflow-hidden">
      <div
        className=" absolute inset-0 bg-[#000000] pointer-events-none"
        style={{
          filter: "url(#nnnoise-filter)",
        }}
        // onClick={onExpand}
      />
      <div
        id="mini-player-content"
        className=" flex flex-row items-end justify-center lg:flex-col lg:rotate-180 lg:justify-between lg:items-center h-full w-full px-2 py-1 lg:p-2"
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
            className="flex flex-col rotated-text-container lg:vertical-rl lg:-rotate-90 lg:justify-center lg:items-start space-y-0 lg:space-y-1 truncate flex-grow mx-0 lg:mx-0 lg:mt-4 lg:mb-4 text-center group"
            style={verticalTextStyle}
          >
            <p className="text-xs text-white opacity-80 group-hover:opacity-100 lg:text-xl font-bold tracking-wide truncate max-w-[100px] lg:max-w-none">
              {currentTrack.title}
            </p>
            {/* Artist visible only on larger screens, including desktop minimized */}
            <p className="text-lg text-white opacity-70 sm:block lg:block">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Volume/Mute Icon: Hidden on mobile (lack of space), visible on desktop vertical bar */}
        <div className="flex flex-row-reverse items-center justify-center lg:flex lg:flex-col lg:items-center lg:justify-between lg:rotate-180 space-y-2 flex-shrink-0">
          {/* Play/Pause Button */}
          <button
            onClick={() => handleAudioPlay()}
            className="group relative p-3 lg:p-4 rounded-full active:scale-95 transition-transform flex items-center justify-center"
            aria-label="Play/Pause"
          >
            {/* Gradient Glow - Hidden by default, shows on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-pink-500/40 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            {/* Icon - relative z-10 ensures it sits above the glow */}
            <div className="relative z-10">
              {isPlaying ? (
                <Pause className="text-white group-hover:text-sky-400 w-5 h-5 lg:w-9 lg:h-9 fill-current transition-colors" />
              ) : (
                <Play className="text-white group-hover:text-sky-400 w-5 h-5 lg:w-9 lg:h-9 fill-current transition-colors" />
              )}
            </div>
          </button>

          {/* Mute Button */}
          <button
            onClick={() => handleMuteToggle()}
            className="group relative p-3 active:scale-95 transition-transform flex items-center justify-center"
            aria-label={isMuted ? "Unmute Volume" : "Mute Volume"}
          >
            {/* Gradient Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/40 to-cyan-400/40 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            <div className="relative z-10">
              {isMuted ? (
                <VolumeX className="text-white group-hover:text-sky-400 w-5 h-5 lg:w-8 lg:h-8 fill-current transition-colors" />
              ) : (
                <Volume2 className="text-white group-hover:text-sky-400 w-5 h-5 lg:w-8 lg:h-8 fill-current transition-colors" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
