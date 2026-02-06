import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useTheme } from "./HeaderBackground";
import "../styles/main.css";

// --- 3. COMPONENTS ---

// Custom component for the glow aesthetic
const BlogHeader = ({ search, setSearch, setFilters }) => {
  const { theme } = useTheme();

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    // 1. Prevent double injection
    if (container.querySelector(".typed-text__wrapper")) {
      return;
    }

    // 2. Initialize and capture the cleanup function
    const cancelTyping = initHomeRoleTyper();

    // --- FIX: Check for existing wrapper before creating new ones ---
    return () => {
      if (cancelTyping) cancelTyping();
      // Also physically remove the injected elements to keep the DOM clean
      const wrapper = container.querySelector(".typed-text__wrapper");
      if (wrapper) wrapper.remove();
    };
    // initHomeRoleTyper();
  }, []);

  const initHomeRoleTyper = () => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const container = document.querySelector(
      ".typing-animation-container[data-roles]",
    );

    if (!container) {
      return;
    }

    if (
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const parseRoles = () => {
      const rawRoles = container.getAttribute("data-roles");

      if (!rawRoles) {
        return [];
      }

      try {
        // Try parsing as JSON first (as defined in the HTML)
        const parsed = JSON.parse(rawRoles);
        if (Array.isArray(parsed)) {
          return parsed.map((role) => String(role).trim()).filter(Boolean);
        }
      } catch (error) {
        // Fallback to pipe | separated if JSON fails
        const fallbackRoles = rawRoles
          .split("|")
          .map((role) => role.trim())
          .filter(Boolean);
        if (fallbackRoles.length > 0) {
          return fallbackRoles;
        }
      }

      return [];
    };

    const roles = parseRoles();

    if (roles.length === 0) {
      return;
    }

    const fallback = container.querySelector(".typed-text__fallback");
    const wrapper = document.createElement("span");
    wrapper.className = "typed-text__wrapper";

    const content = document.createElement("span");
    content.className = "typed-text__content";
    content.textContent = "";

    const cursor = document.createElement("span");
    cursor.className = "typed-text__cursor";
    cursor.setAttribute("aria-hidden", "true");

    wrapper.appendChild(content);
    wrapper.appendChild(cursor);

    const insertionPoint = fallback ?? null;
    container.insertBefore(wrapper, insertionPoint);

    if (fallback) {
      fallback.setAttribute("aria-hidden", "true");
    }

    container.classList.add("typed-text--ready");
    container.setAttribute("aria-live", "polite");

    let roleIndex = 0;
    let charIndex = 0;
    let typingTimeoutId = 0;
    let eraseFrameId = 0;
    let expandFallbackTimeoutId = 0;
    let expandListener = null;
    let eraseStarted = false;
    let isActive = true;

    const typeSpeed = 75; // Time in ms between characters (higher is Slower)
    const holdDelay = 750; // Time in ms to hold before starting erase
    const transitionDelay = 350; // Time in ms before starting the next type
    const expandDuration = 450; // Cursor expansion animation time
    const eraseDuration = 300; // Total time for text erase animation
    const widthBuffer = 0;

    // Initialize cursor width properties
    const computedCursor = window.getComputedStyle(cursor);
    const baseCursorWidth = Number.parseFloat(computedCursor.width) || 6;
    const cursorTransition =
      "width 0.48s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease";

    cursor.style.width = `${baseCursorWidth}px`;
    cursor.style.transition = cursorTransition;

    const schedule = (callback, delay) => {
      typingTimeoutId = window.setTimeout(() => {
        typingTimeoutId = 0;
        callback();
      }, delay);
    };

    const ensureActive = () => isActive;

    const clearAnimationFrame = () => {
      if (eraseFrameId) {
        window.cancelAnimationFrame(eraseFrameId);
        eraseFrameId = 0;
      }
    };

    const clearExpandListener = () => {
      if (expandListener) {
        cursor.removeEventListener("transitionend", expandListener);
        expandListener = null;
      }
      if (expandFallbackTimeoutId) {
        window.clearTimeout(expandFallbackTimeoutId);
        expandFallbackTimeoutId = 0;
      }
    };

    const jumpCursorToBase = () => {
      const previousTransition = cursor.style.transition;
      cursor.style.transition = "none";
      cursor.style.width = `${baseCursorWidth}px`;
      // Force reflow/repaint for instant change
      void cursor.offsetWidth;
      const restoredTransition =
        previousTransition && previousTransition !== "none"
          ? previousTransition
          : cursorTransition;
      cursor.style.transition = restoredTransition;
    };

    // Easing function for smooth erase animation
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const finishErase = () => {
      if (!ensureActive()) {
        return;
      }

      clearAnimationFrame();
      container.classList.remove("typed-text--deleting");
      content.textContent = "";
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      eraseStarted = false;

      jumpCursorToBase();
      schedule(typeNextChar, transitionDelay);
    };

    const startErase = (expandedWidth) => {
      if (!ensureActive()) {
        return;
      }

      const currentRole = roles[roleIndex];

      if (!currentRole) {
        finishErase();
        return;
      }

      container.classList.remove("typed-text--expanding");
      container.classList.add("typed-text--deleting");

      clearAnimationFrame();
      cursor.style.transition = "none";

      const initialLength = currentRole.length;
      const startTime = window.performance.now();
      let lastRenderedLength = charIndex;

      const animateErase = (timestamp) => {
        if (!ensureActive()) {
          return;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / eraseDuration, 1);
        const eased = easeInOutCubic(progress);
        const targetLength = Math.max(
          Math.round(initialLength * (1 - eased)),
          0,
        );

        if (targetLength !== lastRenderedLength) {
          charIndex = targetLength;
          content.textContent = currentRole.slice(0, charIndex);
          lastRenderedLength = targetLength;
        }

        const nextWidth =
          baseCursorWidth + (expandedWidth - baseCursorWidth) * (1 - eased);
        cursor.style.width = `${nextWidth}px`;

        if (progress < 1) {
          eraseFrameId = window.requestAnimationFrame(animateErase);
          return;
        }

        cursor.style.transition = cursorTransition;
        finishErase();
      };

      eraseFrameId = window.requestAnimationFrame(animateErase);
    };

    const launchErase = (expandedWidth) => {
      if (!ensureActive() || eraseStarted) {
        return;
      }

      eraseStarted = true;
      clearExpandListener();
      startErase(expandedWidth);
    };

    const startExpand = () => {
      if (!ensureActive()) {
        return;
      }

      const currentRole = roles[roleIndex];

      if (!currentRole) {
        return;
      }

      // Calculate the width of the currently typed text
      const measuredWidth = Math.ceil(content.getBoundingClientRect().width);
      const expandedWidth = Math.max(
        measuredWidth + widthBuffer,
        baseCursorWidth,
      );

      container.classList.add("typed-text--expanding");
      cursor.style.transition = cursorTransition;
      cursor.style.width = `${expandedWidth}px`;

      // Use transitionend to know when the cursor expansion is finished
      expandListener = (event) => {
        if (event.propertyName !== "width") {
          return;
        }
        launchErase(expandedWidth);
      };

      cursor.addEventListener("transitionend", expandListener, { once: true });

      // Fallback timeout in case transitionend fails
      expandFallbackTimeoutId = window.setTimeout(
        () => launchErase(expandedWidth),
        expandDuration + 60,
      );
    };

    function typeNextChar() {
      if (!ensureActive()) {
        return;
      }

      const currentRole = roles[roleIndex];

      if (!currentRole) {
        return;
      }

      container.classList.remove(
        "typed-text--expanding",
        "typed-text--deleting",
      );

      if (charIndex === 0) {
        jumpCursorToBase();
        content.textContent = "";
      }

      // Type the next character
      if (charIndex < currentRole.length) {
        charIndex += 1;
        content.textContent = currentRole.slice(0, charIndex);
        schedule(typeNextChar, typeSpeed);
        return;
      }

      // Finished typing, start the hold delay and then expansion
      schedule(startExpand, holdDelay);
    }

    // Initial start
    schedule(typeNextChar, transitionDelay);

    // Cleanup function
    const cancelTyping = () => {
      if (!isActive) {
        return;
      }

      isActive = false;

      if (typingTimeoutId) {
        window.clearTimeout(typingTimeoutId);
        typingTimeoutId = 0;
      }

      clearAnimationFrame();
      clearExpandListener();

      container.classList.remove(
        "typed-text--expanding",
        "typed-text--deleting",
      );
      cursor.style.transition = "none";
      cursor.style.width = "";
    };

    // Add event listeners for cleanup on navigation
    window.addEventListener("pagehide", cancelTyping, { once: true });
    window.addEventListener("beforeunload", cancelTyping, { once: true });

    return cancelTyping;
  };

  // Handle shift+s shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === "S") {
        e.preventDefault();
        document.getElementById("search-input").focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearch(newSearchTerm);
  };

  // 1. Find the longest word to use as a spacer
  const roles = ["AI & ML", "Full Stack", "Robotics"];
  const longestRole = roles.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <header className="max-w-3xl mx-auto text-center mb-20">
      <div
        className={`inline-block p-4 rounded-2xl mb-8 transition-all duration-300 border ${
          theme === "dark"
            ? "bg-zinc-950 border-zinc-800 shadow-2xl shadow-white/5"
            : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
        }`}
      >
        <svg
          className={`w-8 h-8 ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      </div>

      <h1 className="text-6xl sm:text-8xl font-black mb-6 tracking-tighter">
        <span className="text-slate-500">The</span>
        <span
          className={`transition-all duration-500 ${
            theme === "dark"
              ? "text-slate-50 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              : "text-slate-900 drop-shadow-none"
          }`}
        >
          Blog
        </span>
      </h1>

      <div
        className={`text-lg sm:text-xl mb-12 pb-6 max-w-xl mx-auto leading-relaxed ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
      >
        Thoughts, mental models, and tutorials about{" "}
        <span
          ref={containerRef}
          className={`typing-animation-container inline-flex font-medium ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}
          data-roles='["AI & ML", "Full Stack", "Robotics"]'
        >
          <span className="typed-text__fallback">
            AI & ML, Full Stack, & Robotics
          </span>
        </span>
      </div>

      <div
        className={`relative flex items-center w-full max-w-xl mx-auto p-1.5 rounded-2xl transition-all duration-500 border ${
          theme === "dark"
            ? "bg-zinc-950 border-zinc-800 focus-within:border-slate-500 focus-within:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            : "bg-white border-slate-200 focus-within:border-slate-400 focus-within:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        }`}
      >
        <div className="flex-shrink-0 pl-4">
          <Search
            className={`w-5 h-5 ${theme === "dark" ? "text-slate-500" : "text-slate-400"}`}
          />
        </div>

        <input
          type="text"
          id="search-input"
          placeholder="Search titles, tags, or topics..."
          /* Added pr-20 to ensure text doesn't type 'under' the absolute button */
          className={`flex-grow min-w-0 bg-transparent text-lg py-3 px-3 pr-20 focus:outline-none ${
            theme === "dark"
              ? "text-slate-100 placeholder-slate-600"
              : "text-slate-900 placeholder-slate-400"
          }`}
          value={search}
          onChange={handleChange}
        />

        {/* FIXED POSITIONING: Using absolute and right-4 to lock it in place */}
        <div
          className={`hidden sm:flex absolute right-4 items-center space-x-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border uppercase tracking-widest whitespace-nowrap pointer-events-none ${
            theme === "dark"
              ? "text-slate-400 bg-zinc-900 border-zinc-800"
              : "text-slate-500 bg-slate-50 border-slate-200"
          }`}
        >
          <span>Shift</span>
          <span>S</span>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
