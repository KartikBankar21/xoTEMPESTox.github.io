import React, { useState, useEffect } from 'react';
import { Play, SkipBack, SkipForward, Pause, Heart, Volume2, ChevronDown } from 'lucide-react';

// Custom CSS for the fixed positioning and transitions
const customStyles = `
/* Custom Tailwind Configuration (replicated here for self-containment) */
.lo-fi-config {
    --lo-fi-bg: #f8f4ff;
    --lo-fi-ui: #e5d4f9;
    --lo-fi-accent: #c6aee3;
    --lo-fi-dark: #5a3d8b;
}

body {
    background-color: #f3eaf8;
    min-height: 100vh;
    padding: 0;
    font-family: 'Inter', sans-serif;
    transition: background-color 0.5s ease;
}

.icon-btn {
    padding: 0.5rem;
    border-radius: 0.75rem; /* rounded-xl */
    transition: all 150ms ease-in-out;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); /* shadow-inner */
}

/* --- Custom Transition Classes for Player Expansion --- */
.player-container {
    /* Fixed positioning to the bottom left corner */
    position: fixed; 
    bottom: 1rem; 
    left: 1rem;
    z-index: 1000;
    
    /* Smoother default transition for collapse */
    transition: all 0.4s ease-in-out; 
    /* Transform Origin remains 'bottom left' for expansion outwards and upwards */
    transform-origin: bottom left; 
}

/* Class to apply the exaggerated elastic effect ONLY on opening */
.elastic-in {
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.minimized {
    /* New dimensions for the vertical bar */
    width: 4.5rem; /* Narrow */
    height: 20rem; /* Tall */
    padding: 0.5rem;
    border-radius: 1rem; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    background-color: var(--lo-fi-ui);
    border: 2px solid var(--lo-fi-accent);
}

.expanded {
    /* Expanded size (same as before) */
    width: 100%;
    max-width: 384px; 
    height: auto;
    padding: 1rem;
    border-radius: 2.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
}

/* Styles for rotated text/elements in the vertical bar */
.vertical-text {
    writing-mode: vertical-rl; /* Rotate text 90 degrees clockwise */
    transform: rotate(180deg); /* Flip it to read bottom-to-top */
    white-space: nowrap;
    text-align: right;
    line-height: 1.2;
}
`;

const TRANSITION_DURATION = 400; // Match CSS 0.4s

const LoFiPlayer = ({ isExpanded, onCollapse }) => {
    // Tailwind classes use the CSS variables defined above
    return (
        <div 
            id="lofi-player" 
            className={`w-full bg-[var(--lo-fi-ui)] rounded-[2.5rem] border-4 border-[var(--lo-fi-accent)]`}
        >
            {/* Header: Title and Top Collapse Button */}
            <div className="w-full bg-[var(--lo-fi-accent)] rounded-xl px-4 py-2 mb-3 shadow-md border border-[var(--lo-fi-dark)]/20">
                <div className="flex justify-between items-center relative">
                    <div className="w-6 h-6"></div> {/* Left Spacer */}

                    <h1 className="font-mono text-xl md:text-2xl text-[var(--lo-fi-dark)] uppercase tracking-widest text-center flex-1">
                        doehli - denial is a river
                    </h1>

                    {/* Top Right Minimize Button */}
                    <button 
                        onClick={onCollapse}
                        className="bg-[var(--lo-fi-ui)] text-[var(--lo-fi-dark)] p-1 rounded-full hover:bg-[var(--lo-fi-bg)] active:scale-95 transition-all shadow-inner border border-[var(--lo-fi-dark)]/20"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Media Window */}
            <div className="w-full aspect-[3/4] bg-gray-600 rounded-xl overflow-hidden relative shadow-inner border-2 border-[var(--lo-fi-accent)]/50">
                <img 
                    src="https://placehold.co/400x533/c6aee3/ffffff?text=Lo-Fi+Window+View"
                    alt="Lo-fi animated landscape"
                    className="w-full h-full object-cover opacity-70"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x533/c6aee3/ffffff?text=Lo-Fi+Window+View'; }}
                />

                {/* Faux Playback Bar Area Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-[var(--lo-fi-dark)]/30 rounded-full mb-2 relative">
                        <div className="h-full bg-white rounded-full" style={{ width: '70%' }}></div>
                        <div className="absolute top-1/2 -mt-1.5 right-[30%] w-3 h-3 rounded-full bg-[var(--lo-fi-dark)] shadow-xl border-2 border-[var(--lo-fi-bg)]"></div>
                    </div>

                    {/* Time/Heart Indicator */}
                    <div className="flex justify-between items-center text-[var(--lo-fi-dark)] text-sm">
                        <span className="font-mono">2:45 / 3:52</span>
                        <div className="icon-btn bg-[var(--lo-fi-accent)] text-[var(--lo-fi-dark)]/90 p-1.5 flex items-center justify-center">
                            <Heart className="w-4 h-4 fill-current" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Panel */}
            <div className="w-full bg-[var(--lo-fi-accent)] p-4 mt-3 rounded-xl shadow-md border border-[var(--lo-fi-dark)]/20">
                <div className="flex justify-between items-center">
                    <button className="bg-[var(--lo-fi-ui)] icon-btn text-[var(--lo-fi-dark)] text-xl font-mono px-4 py-2 shadow-inner border border-[var(--lo-fi-dark)]/20">
                        Menu
                    </button>

                    <div className="flex items-center space-x-2 md:space-x-3">
                        <button className="bg-[var(--lo-fi-ui)] icon-btn text-[var(--lo-fi-dark)] shadow-inner border border-[var(--lo-fi-dark)]/20">
                            <SkipBack className="w-6 h-6" />
                        </button>
                        <button className="bg-[var(--lo-fi-ui)] icon-btn text-[var(--lo-fi-dark)] shadow-inner border border-[var(--lo-fi-dark)]/20">
                            <Pause className="w-6 h-6" />
                        </button>
                        <button className="bg-[var(--lo-fi-ui)] icon-btn text-[var(--lo-fi-dark)] shadow-inner border border-[var(--lo-fi-dark)]/20">
                            <SkipForward className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex space-x-1">
                        <Heart className="w-5 h-5 text-[var(--lo-fi-dark)] fill-[var(--lo-fi-dark)]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const MiniPlayer = ({ onExpand }) => {
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
            >
                <Play className="w-5 h-5 fill-[var(--lo-fi-dark)] text-[var(--lo-fi-dark)]" />
            </button>
            
            {/* Song Info (Rotated) */}
            <div className="vertical-text flex flex-col items-start space-y-1">
                <p className="text-sm font-semibold tracking-wide">Happy Birthday</p>
                <p className="text-xs opacity-70">Birthday Song</p>
            </div>
            
            {/* Album Art Placeholder (Bottom Left) */}
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center text-xs font-bold text-white">
                N&Q
            </div>
        </div>
    );
};


const App = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [transitionClass, setTransitionClass] = useState('');

    const TRANSITION_MS = 400; // Match CSS 0.4s for smooth transition
    const ELASTIC_MS = 550; // Match CSS 0.5s for elastic transition

    const handleExpand = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTransitionClass('elastic-in'); // Use elastic transition for opening

        // 1. Start the container expansion immediately
        setIsExpanded(true);

        // 2. Wait for the elastic transition to complete, then remove the class
        setTimeout(() => {
            setTransitionClass('');
            setIsAnimating(false);
        }, ELASTIC_MS + 50); // Small buffer
    };

    const handleCollapse = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        // Collapse uses the default smooth transition (0.4s ease-in-out)
        
        // 1. Start the container shrinking immediately
        setIsExpanded(false);

        // 2. Wait for the collapse transition to complete
        setTimeout(() => {
            setIsAnimating(false);
        }, TRANSITION_MS);
    };

    // useEffect to inject the custom styles into the document head once
    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = customStyles;
        document.head.appendChild(styleTag);
        return () => {
            document.head.removeChild(styleTag);
        };
    }, []);

    // Helper to join classes
    const containerClasses = `
        player-container
        ${transitionClass}
        ${isExpanded ? 'expanded bg-[var(--lo-fi-ui)]' : 'minimized bg-[var(--lo-fi-ui)] border-[var(--lo-fi-accent)]'}
    `;

    return (
        <div className="lo-fi-config">
            {/* This is simulated website content */}
            <div className="absolute inset-0 bg-[#f3eaf8] p-8 flex items-center justify-center text-[var(--lo-fi-dark)]/70 text-4xl font-bold z-0">
                <h1>React Website Main Content Area</h1>
            </div>

            {/* Player Container */}
            <div id="player-container" className={containerClasses}>
                {/* Minimized Player (Visible when not expanded) */}
                <div 
                    id="mini-player" 
                    className={!isExpanded ? 'h-full' : 'hidden'}
                >
                    <MiniPlayer onExpand={handleExpand} />
                </div>

                {/* Expanded Lo-Fi Player (Visible when expanded) */}
                <div 
                    id="lofi-player" 
                    className={isExpanded ? '' : 'hidden'}
                >
                    <LoFiPlayer isExpanded={isExpanded} onCollapse={handleCollapse} />
                </div>
            </div>
        </div>
    );
};

export default App;