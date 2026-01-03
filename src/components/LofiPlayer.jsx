import React, { useState, useEffect } from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Pause,
  Heart,
  ChevronDown,
  ListMusic,
} from "lucide-react";

// --- LoFiPlayer Component (Expanded View) ---
export const LoFiPlayer = ({
  isExpanded,
  onCollapse,
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onNext,
  onPrev,
  isMenuOpen,
  onMenuToggle,
  onTrackSelect,
  tracks,
  trackIndex,
}) => {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Helper for time formatting
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === null || timeInSeconds === undefined) {
      return "--:--";
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden p-[1rem]">
      <div
        className="absolute inset-0 bg-[#000000] pointer-events-none"
        style={{
          filter: "url(#nnnoise-filter)",
        }}
      // onClick={onExpand}
      />
      <div
        id="lofi-player"
        className={`w-full bg-transparent rounded-[2.5rem] border-4 border-transparent relative overflow-hidden`}
      >
        {/* <div
    className="absolute inset-0 bg-[black]"
    style={{ filter: "url(#nnnoise-filter)" }}
  /> */}
        {/* --- Menu Overlay (Hidden/Shown) --- */}
        <div
          className={`menu-overlay rounded-[2.5rem] p-6 flex flex-col overflow-x-hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
          <div className="flex justify-between items-center mb-6">
            <p className="font-mono font-bold text-xl md:text-2xl text-[white] uppercase tracking-widest flex items-center mb-0!">
              <ListMusic className="w-8 h-8 mr-2" /> Track List
            </p>
            <button
              onClick={onMenuToggle}
              className="bg-[white]/5 border border-current text-white hover:text-sky-400 p-2 rounded-full hover:bg-[white]/10 active:scale-95 transition-all shadow-md"
              aria-label="Close Menu"
            >
              <ChevronDown className=" w-5 h-5 rotate-90 rounded-full fill-current " />
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 pr-2">
            {tracks.map((track, index) => (
              <li
                key={track.id}
                onClick={() => onTrackSelect(index)}
                className={`p-3 rounded-xl cursor-pointer transition-all border-2 ${trackIndex != index
                    ? "bg-[var(--lo-fi-dark)] text-white shadow-xl scale-[1.01]"
                    : "bg-[var(--lo-fi-ui)] text-[var(--lo-fi-dark)] hover:bg-[var(--lo-fi-accent)]/50 border-current text-sky-400"
                  }`}
              >
                <div className="font-semibold text-sm md:text-base truncate">
                  {track.title}
                </div>
                <div
                  className={`text-xs ${trackIndex === index ? "opacity-80" : "opacity-60"
                    }`}
                >
                  {track.artist} - {formatTime(track.duration)}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* --- End Menu Overlay --- */}

        {/* Header: Title and Top Collapse Button */}
        <div className="w-full bg-[var(--lo-fi-accent)] rounded-xl rounded-t-[2.5rem] px-4 py-2 mb-3 shadow-md border border-[var(--lo-fi-dark)]/20">
          <div className="flex justify-between items-center relative">
            <div className="w-6 h-6"></div> {/* Left Spacer */}
            <h1 className="font-mono text-lg md:text-xl text-[white] uppercase tracking-widest text-center flex-1 truncate">
              {currentTrack.title}
            </h1>
            {/* Top Right Minimize Button */}
            <button
              onClick={onCollapse}
              className="bg-[var(--lo-fi-ui)] text-[var(--lo-fi-dark)] p-1 rounded-full hover:bg-[var(--lo-fi-bg)] active:scale-95 transition-all shadow-inner border border-current text-white hover:text-sky-400"
              aria-label="Minimize Player"
            >
              <ChevronDown className=" w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Media Window */}
        <div className="w-full aspect-[3/4] bg-gray-600 rounded-xl overflow-hidden relative shadow-inner border-2 border-[var(--lo-fi-accent)]/50">
          <img
            src={currentTrack.img}
            alt="Lo-fi animated landscape"
            className="w-full h-full object-cover opacity-70 transition-opacity duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x533/c6aee3/ffffff?text=No+Art";
            }}
          />

          {/* Faux Playback Bar Area Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-[var(--lo-fi-dark)]/30 rounded-full mb-2 relative">
              <div
                className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progressPercent}%` }}
              ></div>
              <div
                className="absolute top-1/2 -mt-1.5 w-3 h-3 rounded-full bg-[var(--lo-fi-dark)] shadow-xl border-2 border-[var(--lo-fi-bg)] transition-all duration-100 ease-linear"
                style={{
                  left: `${progressPercent}%`,
                  transform: "translateX(-50%)",
                }}
              ></div>
            </div>

            {/* Time/Heart Indicator */}
            <div className="flex justify-between items-center text-[var(--lo-fi-dark)] text-lg">
              <span className="font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              {/* Reduced padding and icon size for mobile */}
              <div className="icon-btn bg-[var(--lo-fi-accent)] text-[var(--lo-fi-dark)]/90 p-1 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Panel - Optimized for Mobile */}
        <div className="w-full bg-[var(--lo-fi-accent)] p-3 md:p-4 mt-3 rounded-xl rounded-b-[2.5rem] shadow-md border border-[var(--lo-fi-dark)]/20">
          <div className="flex justify-between items-center">
            {/* Menu Button: Calls new handler */}
            <button
              onClick={onMenuToggle}
              className="bg-[var(--lo-fi-ui)] icon-btn text-xs md:text-xl font-mono px-2 py-1 md:px-4 md:py-2 shadow-inner border border-current hover:bg-[white]/10 text-white hover:text-sky-400 fill-current"
              aria-label="Open Track List Menu"
            >
              Menu
            </button>

            {/* Transport Controls: Functional hooks */}
            <div className="flex items-center space-x-1 md:space-x-3 ">
              {/* Skip Back */}
              <button
                onClick={onPrev}
                className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-[var(--lo-fi-dark)] shadow-inner border border-current text-white hover:text-sky-400  hover:bg-[white]/10"
                aria-label="Skip Back"
              >
                <SkipBack className=" w-6 h-6 md:w-6 md:h-6 fill-current" />
              </button>
              {/* Play/Pause */}
              <button
                onClick={onPlayPause}
                className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-[var(--lo-fi-dark)] shadow-inner border border-current text-white hover:text-sky-400 hover:bg-[white]/10 "
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className=" w-6 h-6 md:w-6 md:h-6 fill-current" />
                ) : (
                  <Play className=" w-6 h-6 md:w-6 md:h-6  fill-current" />
                )}
              </button>
              {/* Skip Forward */}
              <button
                onClick={onNext}
                className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-[var(--lo-fi-dark)] shadow-inner border border-current text-white hover:text-sky-400 hover:bg-[white]/10"
                aria-label="Skip Forward"
              >
                <SkipForward className="w-6 h-6 md:w-6 md:h-6  fill-current" />
              </button>
            </div>

            {/* Heart/Like Icon */}
            <div className="flex space-x-1 text-white hover:text-sky-400">
              <Heart className="w-6 h-6 md:w-6 md:h-6  fill-current" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
