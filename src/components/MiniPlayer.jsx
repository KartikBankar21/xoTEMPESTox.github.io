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
            className="w-full flex flex-col items-center justify-center lg:vertical-rl lg:-rotate-90 lg:space-y-1 truncate"
            style={verticalTextStyle}
          >
            <p className="w-full text-center text-xs text-white opacity-80 lg:text-xl font-bold tracking-wide truncate">
              {currentTrack.title}
            </p>
            <p className="w-full text-center text-[10px] text-white opacity-70 lg:text-lg truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls: Flex-shrink-0 ensures this block NEVER disappears */}
        <div className="flex flex-row-reverse items-center justify-center lg:flex lg:flex-col lg:items-center lg:justify-between lg:rotate-180 space-x-2 space-x-reverse lg:space-x-0 lg:space-y-4 flex-shrink-0">
          <button
            onClick={onPrev}
            className="group relative p-2 active:scale-95 flex-shrink-0"
          >
            <div className="relative z-10">
              <SkipBack className="text-white group-hover:text-sky-400 w-5 h-5 lg:w-7 lg:h-7 fill-current  rotate-180 lg:rotate-90" />
            </div>
          </button>

          <button
            onClick={handleAudioPlay}
            className="group relative p-2 lg:p-3 rounded-full active:scale-95 flex-shrink-0"
          >
            <div className="relative z-10">
              {isPlaying ? (
                <Pause className="text-white group-hover:text-sky-400 w-6 h-6 lg:w-8 lg:h-8 fill-current" />
              ) : (
                <Play className="text-white group-hover:text-sky-400 w-6 h-6 lg:w-8 lg:h-8 fill-current" />
              )}
            </div>
          </button>

          <button
            onClick={onNext}
            className="group relative p-2 active:scale-95 flex-shrink-0"
          >
            <div className="relative z-10">
              <SkipForward className="text-white group-hover:text-sky-400 w-5 h-5 lg:w-7 lg:h-7 fill-current rotate-180 lg:rotate-90" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
