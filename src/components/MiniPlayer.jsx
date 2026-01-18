import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
} from "lucide-react";

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
  handleAudioPlay,
  onNext,
  onPrev,
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-[#000000] pointer-events-none"
        style={{ filter: "url(#nnnoise-filter)" }}
      />

      {/* FIX 1: Added 'items-center' and 'w-full' to ensure children stay centered.
          FIX 2: Ensure the container is exactly the height/width of the parent.
      */}
      <div
        id="mini-player-content"
        className="relative flex flex-row items-center justify-between lg:flex-col lg:rotate-180 h-full w-full px-4 lg:p-2"
      >
        {/* Album Art: Fixed size, will not shrink */}
        <div
          className="w-10 h-10 lg:w-16 lg:h-16 rounded-lg lg:-rotate-90 shadow-md flex-shrink-0 overflow-hidden cursor-pointer active:scale-95 transition"
          onClick={onExpand}
        >
          <img
            src={currentTrack.img}
            alt="Album Art"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Song Info: Fixed constraints to prevent pushing icons */}
        <div
          className="flex-grow flex flex-col items-center justify-center px-4 overflow-hidden cursor-pointer select-none"
          onClick={onExpand}
        >
          {/* FIX 3: Added 'w-full' and 'text-center' to the container.
              FIX 4: Applied 'truncate' to BOTH the container and the text elements.
          */}
          <div
            className="w-full flex flex-col items-center justify-center lg:vertical-rl lg:-rotate-90 lg:space-y-1 truncate group"
            style={verticalTextStyle}
          >
            <p className="w-full text-center text-xs text-white opacity-80 lg:text-xl font-bold tracking-wide truncate group-hover:opacity-100">
              {currentTrack.title}
            </p>
            <p className="w-full text-center text-[10px] text-white opacity-70 lg:text-lg truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls: Flex-shrink-0 ensures this block NEVER disappears */}
        <div className="flex flex-row items-center justify-center lg:flex lg:flex-col lg:items-center lg:justify-between lg:rotate-180 space-x-2 lg:space-x-0 lg:space-y-4 flex-shrink-0">

          {/* Previous Button */}
          {/* <button
              onClick={onPrev}
              className="group relative p-2 active:scale-95 transition-all duration-300 flex-shrink-0"
            >
              <div className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-110" />
              
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                <SkipBack className="text-gray-400 group-hover:text-white w-5 h-5 lg:w-7 lg:h-7 fill-current rotate-180 lg:rotate-90 transition-colors duration-300" />
              </div>
          </button> */}

          {/* Play/Pause Button */}
          <button
            onClick={handleAudioPlay}
            className="group relative p-2 lg:p-3 rounded-full active:scale-95 transition-all duration-300 flex-shrink-0"
          >
            {/* Subtle Bloom Effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              {isPlaying ? (
                <Pause className="text-gray-400 group-hover:text-white w-6 h-6 lg:w-8 lg:h-8 fill-current transition-colors duration-300 lg:rotate-90" />
              ) : (
                <Play className="text-gray-400 group-hover:text-white w-6 h-6 lg:w-8 lg:h-8 fill-current transition-colors duration-300 lg:rotate-90" />
              )}
            </div>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="group relative p-2 active:scale-95 transition-all duration-300 flex-shrink-0"
          >
            {/* Animated Glow Background */}
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-110" />

            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <SkipForward className="text-gray-400 group-hover:text-white w-5 h-5 lg:w-7 lg:h-7 fill-current lg:rotate-90 transition-colors duration-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
