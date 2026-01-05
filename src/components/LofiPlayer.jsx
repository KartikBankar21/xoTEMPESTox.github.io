import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  SkipBack,
  SkipForward,
  Pause,
  Heart,
  ChevronDown,
  SlidersVertical,
  ListMusic,
  VolumeX, // Added for mute state
  Volume2  // Added for active state
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
  volume,
  onVolumeChange,
}) => {
  const [showVolume, setShowVolume] = useState(false);
  const volumeRef = useRef(null);
  
  // Calculate percentages
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  // Handle clicking outside to close volume slider
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setShowVolume(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        style={{ filter: "url(#nnnoise-filter)" }}
      />
      
      <div id="lofi-player" className="w-full bg-transparent rounded-[2.5rem] border-4 border-transparent relative overflow-hidden">
        
        {/* --- Menu Overlay --- */}
        <div className={`menu-overlay z-20 rounded-[2.5rem] p-6 flex flex-col overflow-x-hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="flex justify-between items-center mb-6">
            <p className="font-mono font-bold text-xl md:text-2xl text-white uppercase tracking-widest flex items-center mb-0">
              <ListMusic className="w-8 h-8 mr-2" /> Track List
            </p>
            <button onClick={onMenuToggle} className="bg-white/5 border border-current text-white hover:text-sky-400 p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all shadow-md">
              <ChevronDown className="w-5 h-5 rotate-90 rounded-full fill-current" />
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 pr-2">
            {tracks.map((track, index) => (
              <li
                key={track.id}
                onClick={() => onTrackSelect(index)}
                className={`p-3 rounded-xl cursor-pointer transition-all border-2 ${trackIndex !== index ? "bg-[var(--lo-fi-dark)] text-white shadow-xl scale-[1.01]" : "bg-[var(--lo-fi-ui)] text-sky-400 border-current"}`}
              >
                <div className="font-semibold text-sm md:text-base truncate">{track.title}</div>
                <div className={`text-xs ${trackIndex === index ? "opacity-80" : "opacity-60"}`}>
                  {track.artist} - {formatTime(track.duration)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Header */}
        <div className="w-full bg-[var(--lo-fi-accent)] rounded-xl rounded-t-[2.5rem] px-4 py-2 mb-3 shadow-md border border-[var(--lo-fi-dark)]/20">
          <div className="flex justify-between items-center relative">
            <div className="w-6 h-6"></div>
            <h1 className="font-mono text-lg md:text-xl text-white uppercase tracking-widest text-center flex-1 truncate">{currentTrack.title}</h1>
            <button onClick={onCollapse} className="bg-[var(--lo-fi-ui)] text-[var(--lo-fi-dark)] p-1 rounded-full hover:bg-[var(--lo-fi-bg)] active:scale-95 transition-all shadow-inner border border-current text-white hover:text-sky-400">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Media Window */}
        <div className="w-full aspect-[3/4] bg-gray-600 rounded-xl overflow-hidden relative shadow-inner border-2 border-[var(--lo-fi-accent)]/50">
          <img
            src={currentTrack.img}
            alt={currentTrack.title}
            className="w-full h-full object-cover opacity-70 transition-opacity duration-500"
          />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-white/20 rounded-full mb-2 relative group cursor-pointer">
              <div className="h-full bg-white rounded-full transition-all duration-100 ease-linear" style={{ width: `${progressPercent}%` }} />
              <div className="absolute top-1/2 -mt-1.5 w-3 h-3 rounded-full bg-white shadow-xl transition-all duration-100 ease-linear group-hover:scale-125" style={{ left: `${progressPercent}%`, transform: "translateX(-50%)" }} />
            </div>

            {/* Time Indicator */}
            <div className="flex justify-between items-center text-white text-lg">
              <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="w-full bg-[var(--lo-fi-accent)] p-3 md:p-4 mt-3 rounded-xl rounded-b-[2.5rem] shadow-md border border-[var(--lo-fi-dark)]/20 z-30 relative">
          <div className="flex justify-between items-center">
            <button onClick={onMenuToggle} className="bg-[var(--lo-fi-ui)] icon-btn text-xs md:text-xl font-mono px-2 py-1 md:px-4 md:py-2 shadow-inner border border-current text-white hover:text-sky-400 rounded-lg transition-colors">
              Menu
            </button>

            <div className="flex items-center space-x-1 md:space-x-3">
              <button onClick={onPrev} className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-white hover:text-sky-400 border border-current rounded-full transition-transform active:scale-95"><SkipBack className="w-6 h-6 fill-current" /></button>
              <button onClick={onPlayPause} className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-white hover:text-sky-400 border border-current rounded-full transition-transform active:scale-95">
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
              </button>
              <button onClick={onNext} className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-white hover:text-sky-400 border border-current rounded-full transition-transform active:scale-95"><SkipForward className="w-6 h-6 fill-current" /></button>
            </div>

            {/* --- UPGRADED VOLUME CONTROLLER --- */}
            <div className="relative flex items-center" ref={volumeRef}>
              
              {/* Floating Slider Popup */}
              {showVolume && (
                <div 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-16 bg-black/60 backdrop-blur-xl p-3 pb-4 rounded-2xl shadow-2xl border border-white/10 z-50 flex flex-col items-center animate-in fade-in zoom-in duration-200 slide-in-from-bottom-4"
                  style={{ boxShadow: "0 0 20px rgba(0,0,0,0.5)" }}
                >
                  {/* Slider Track Area */}
                  <div className="relative h-32 w-full flex justify-center items-center">
                    
                    {/* The Visual Track */}
                    <div className="absolute w-1.5 h-full bg-white/20 rounded-full overflow-hidden">
                      {/* The Active Fill */}
                      <div 
                        className="absolute bottom-0 w-full bg-sky-400 transition-all duration-75"
                        style={{ height: `${volumePercentage}%` }}
                      />
                    </div>

                    {/* The Knob/Thumb (Visual Only) */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none border-2 border-sky-500 transition-all duration-75"
                      style={{ bottom: `calc(${volumePercentage}% - 8px)` }}
                    />

                    {/* The Real Input (Invisible overlay for interaction) */}
                    {/* Added inline styles to kill ANY browser default appearance and arrows */}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={onVolumeChange}
                      className="absolute w-[128px] h-8 opacity-0 cursor-pointer appearance-none -rotate-90 origin-center z-10 focus:outline-none bg-transparent"
                      style={{ 
                        touchAction: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        margin: 0,
                        padding: 0,
                        border: 'none',
                        background: 'transparent'
                      }} 
                    />
                  </div>

                  {/* Percentage Label */}
                  <span className="text-[10px] font-mono font-bold text-white/70 mt-3 tabular-nums">
                    {Math.round(volumePercentage)}%
                  </span>
                  
                  {/* Triangle Arrow pointing down */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[var(--lo-fi-dark)]/95"></div>
                </div>
              )}

              {/* Toggle Button */}
              <button 
                onClick={() => setShowVolume(!showVolume)}
                className={`icon-btn p-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                  showVolume 
                    ? 'bg-white text-sky-500 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                    : 'bg-[var(--lo-fi-ui)] text-white hover:bg-[var(--lo-fi-bg)] border border-current'
                }`}
                aria-label="Adjust Volume"
              >
                {volume === 0 ? <VolumeX className="w-5 h-5" /> : <SlidersVertical className="w-5 h-5" />}
              </button>
            </div>
            {/* --- END UPGRADED VOLUME CONTROLLER --- */}

          </div>
        </div>
      </div>
    </div>
  );
};