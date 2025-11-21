import React, { useState, useEffect } from 'react';
import { Play, SkipBack, SkipForward, Pause, Heart, Volume2, ChevronDown, ListMusic } from 'lucide-react';

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
    padding: 0.5rem;
    border-radius: 1rem; 
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
.vertical-text {
    writing-mode: vertical-rl; /* Rotate text 90 degrees clockwise */
    transform: rotate(180deg); /* Flip it to read bottom-to-top */
    white-space: nowrap;
    text-align: right;
    line-height: 1.2;
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
    { id: 0, title: "doehli - denial is a river", duration: 232, artist: "Doehli", img: "https://placehold.co/400x533/c6aee3/ffffff?text=Denial" },
    { id: 1, title: "Daylight - Chill Beats", duration: 180, artist: "Chill Flow", img: "https://placehold.co/400x533/aee3c6/5a3d8b?text=Daylight" },
    { id: 2, title: "Rainy Cafe - Study Mix", duration: 250, artist: "Aesthetic Sounds", img: "https://placehold.co/400x533/3d8b85/ffffff?text=Rainy+Cafe" },
    { id: 3, title: "Midnight Drive - Synthwave", duration: 210, artist: "Neon City", img: "https://placehold.co/400x533/3b3e66/aee3c6?text=Synthwave" },
];


// --- LoFiPlayer Component (Expanded View) ---
export const LoFiPlayer = ({ 
    isExpanded, onCollapse, currentTrack, isPlaying, 
    currentTime, duration, onPlayPause, onNext, onPrev,
    isMenuOpen, onMenuToggle, onTrackSelect, tracks, trackIndex
}) => {
    
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
    
    // Helper for time formatting
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div 
            id="lofi-player" 
            className={`w-full bg-[var(--lo-fi-ui)] rounded-[2.5rem] border-4 border-[var(--lo-fi-accent)] relative overflow-hidden`}
        >
            {/* --- Menu Overlay (Hidden/Shown) --- */}
            <div className={`menu-overlay rounded-[2rem] p-6 flex flex-col overflow-x-hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-mono text-xl md:text-2xl text-[var(--lo-fi-dark)] uppercase tracking-widest flex items-center">
                        <ListMusic className="w-5 h-5 mr-2" /> Track List
                    </h2>
                    <button 
                        onClick={onMenuToggle}
                        className="bg-[var(--lo-fi-accent)] text-[var(--lo-fi-dark)] p-2 rounded-full hover:bg-[var(--lo-fi-dark)]/10 active:scale-95 transition-all shadow-md"
                        aria-label="Close Menu"
                    >
                        <ChevronDown className="w-5 h-5 rotate-90" />
                    </button>
                </div>
                
                <ul className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 pr-2">
                    {tracks.map((track, index) => (
                        <li 
                            key={track.id} 
                            onClick={() => onTrackSelect(index)}
                            className={`p-3 rounded-xl cursor-pointer transition-all border-2 ${
                                trackIndex === index 
                                    ? 'bg-[var(--lo-fi-dark)] text-white shadow-xl scale-[1.01]' 
                                    : 'bg-[var(--lo-fi-ui)] text-[var(--lo-fi-dark)] hover:bg-[var(--lo-fi-accent)]/50'
                            }`}
                        >
                            <div className="font-semibold text-sm md:text-base truncate">{track.title}</div>
                            <div className={`text-xs ${trackIndex === index ? 'opacity-80' : 'opacity-60'}`}>{track.artist} - {formatTime(track.duration)}</div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* --- End Menu Overlay --- */}

            {/* Header: Title and Top Collapse Button */}
            <div className="w-full bg-[var(--lo-fi-accent)] rounded-xl px-4 py-2 mb-3 shadow-md border border-[var(--lo-fi-dark)]/20">
                <div className="flex justify-between items-center relative">
                    <div className="w-6 h-6"></div> {/* Left Spacer */}

                    <h1 className="font-mono text-lg md:text-xl text-[var(--lo-fi-dark)] uppercase tracking-widest text-center flex-1 truncate">
                        {currentTrack.title}
                    </h1>

                    {/* Top Right Minimize Button */}
                    <button 
                        onClick={onCollapse}
                        className="bg-[var(--lo-fi-ui)] text-[var(--lo-fi-dark)] p-1 rounded-full hover:bg-[var(--lo-fi-bg)] active:scale-95 transition-all shadow-inner border border-[var(--lo-fi-dark)]/20"
                        aria-label="Minimize Player"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Media Window */}
            <div className="w-full aspect-[3/4] bg-gray-600 rounded-xl overflow-hidden relative shadow-inner border-2 border-[var(--lo-fi-accent)]/50">
                <img 
                    src={currentTrack.img}
                    alt="Lo-fi animated landscape"
                    className="w-full h-full object-cover opacity-70 transition-opacity duration-500"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x533/c6aee3/ffffff?text=No+Art'; }}
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
                            style={{ left: `${progressPercent}%`, transform: 'translateX(-50%)' }}
                        ></div>
                    </div>

                    {/* Time/Heart Indicator */}
                    <div className="flex justify-between items-center text-[var(--lo-fi-dark)] text-lg">
                        <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                        {/* Reduced padding and icon size for mobile */}
                        <div className="icon-btn bg-[var(--lo-fi-accent)] text-[var(--lo-fi-dark)]/90 p-1 flex items-center justify-center">
                            <Heart className="w-4 h-4 fill-current" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Panel - Optimized for Mobile */}
            <div className="w-full bg-[var(--lo-fi-accent)] p-3 md:p-4 mt-3 rounded-xl shadow-md border border-[var(--lo-fi-dark)]/20">
                <div className="flex justify-between items-center">
                    {/* Menu Button: Calls new handler */}
                    <button 
                        onClick={onMenuToggle}
                        className="bg-[var(--lo-fi-ui)] icon-btn text-xs md:text-xl font-mono px-2 py-1 md:px-4 md:py-2 shadow-inner border border-[var(--lo-fi-dark)]/20 hover:bg-[var(--lo-fi-bg)]"
                        aria-label="Open Track List Menu"
                    >
                        Menu
                    </button>

                    {/* Transport Controls: Functional hooks */}
                    <div className="flex items-center space-x-1 md:space-x-3">
                        {/* Skip Back */}
                        <button 
                            onClick={onPrev}
                            className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-[var(--lo-fi-dark)] shadow-inner border border-[var(--lo-fi-dark)]/20 hover:bg-[var(--lo-fi-bg)]" 
                            aria-label="Skip Back"
                        >
                            <SkipBack className="w-6 h-6 md:w-6 md:h-6" />
                        </button>
                        {/* Play/Pause */}
                        <button 
                            onClick={onPlayPause}
                            className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-[var(--lo-fi-dark)] shadow-inner border border-[var(--lo-fi-dark)]/20 hover:bg-[var(--lo-fi-bg)]" 
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
                                <Pause className="w-6 h-6 md:w-6 md:h-6 fill-current" />
                            ) : (
                                <Play className="w-6 h-6 md:w-6 md:h-6 fill-current" />
                            )}
                        </button>
                        {/* Skip Forward */}
                        <button 
                            onClick={onNext}
                            className="bg-[var(--lo-fi-ui)] icon-btn p-1.5 md:p-2 text-[var(--lo-fi-dark)] shadow-inner border border-[var(--lo-fi-dark)]/20 hover:bg-[var(--lo-fi-bg)]" 
                            aria-label="Skip Forward"
                        >
                            <SkipForward className="w-6 h-6 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Heart/Like Icon */}
                    <div className="flex space-x-1">
                        <Heart className="w-6 h-6 md:w-6 md:h-6 text-[var(--lo-fi-dark)] fill-[var(--lo-fi-dark)]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MiniPlayer Component (Minimized View) ---
const MiniPlayer = ({ onExpand, currentTrack }) => {
    return (
        <div id="mini-player-content" className="flex flex-col justify-between items-center h-full p-2 text-[var(--lo-fi-dark)]">
            
            {/* Volume/Mute Icon */}
            <div className="flex flex-col items-center space-y-2">
                <Volume2 className="w-5 h-5" />
            </div>

            {/* Play/Expand Button (Click to transition) */}
            <button 
                onClick={onExpand}
                className="bg-[var(--lo-fi-accent)] p-2 rounded-full hover:bg-[var(--lo-fi-dark)]/10 active:scale-95 shadow-lg flex items-center justify-center"
                aria-label="Expand Player"
            >
                <Play className="w-5 h-5 fill-[var(--lo-fi-dark)] text-[var(--lo-fi-dark)]" />
            </button>
            
            {/* Song Info (Rotated) */}
            <div className="vertical-text flex flex-col items-start space-y-1">
                <p className="text-sm font-semibold tracking-wide truncate">{currentTrack.title}</p>
                <p className="text-xs opacity-70">{currentTrack.artist}</p>
            </div>
            
            {/* Album Art Placeholder (Bottom Left) */}
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                <img src={currentTrack.img} alt="Album Art" className="w-full h-full object-cover"/>
            </div>
        </div>
    );
};