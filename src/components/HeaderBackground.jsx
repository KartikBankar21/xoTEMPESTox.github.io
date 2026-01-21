import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { Sun, Moon, Image as ImageIcon, X } from "lucide-react";

// -----------------------------------------------------------------------------
// 1. CONTEXT & HOOKS (Unchanged)
// -----------------------------------------------------------------------------

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => { },
  allWallpapers: [],
  currentAsset: null,
  handleThemeChange: () => { },
  handleWallpaperSelect: () => { },
});

export const useTheme = () => useContext(ThemeContext);

// -----------------------------------------------------------------------------
// 2. CONSTANTS & UTILS (Unchanged)
// -----------------------------------------------------------------------------

const getBaseUrl = () => {
  try {
    const url = import.meta?.env?.BASE_URL ?? "/";
    return url.endsWith("/") ? url : `${url}/`;
  } catch (e) {
    return "/";
  }
};

const baseUrl = getBaseUrl();
const backgroundImageBasePath = "assets/images/backgrounds";
const backgroundVideoBasePath = "assets/videos/backgrounds";
const videoExtensions = ["mp4", "webm", "ogv", "ogg"];
const storageKey = "portfolio:lastBackground";
const themeStorageKey = "portfolio:theme";

const withBase = (path) => {
  if (!path) return baseUrl;
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
};

const sanitizePathValue = (value) => {
  return typeof value === "string" ? value.trim() : "";
};

const sanitizeBasePath = (value) => {
  const sanitized = sanitizePathValue(value);
  return sanitized ? sanitized.replace(/\/+$/, "") : "";
};

const getThemeFromFilename = (filename) => {
  const lower = filename.toLowerCase();
  if (lower.includes("-night") || lower.includes("-dark")) return "dark";
  if (lower.includes("-day") || lower.includes("-light")) return "light";
  return "neutral";
};

const createAssetConfig = (entry) => {
  if (!entry) return null;
  if (typeof entry === "string") {
    const sanitizedSrc = sanitizePathValue(entry);
    if (!sanitizedSrc) return null;
    const extension = sanitizedSrc.includes(".")
      ? sanitizedSrc.split(".").pop()
      : "";
    const type =
      extension && videoExtensions.includes(extension.toLowerCase())
        ? "video"
        : "image";
    const basePath =
      type === "video" ? backgroundVideoBasePath : backgroundImageBasePath;
    return {
      src: sanitizedSrc,
      type,
      srcBasePath: basePath,
      poster: null,
      posterBasePath: backgroundImageBasePath,
    };
  }
  if (typeof entry === "object") {
    const videoSrc = sanitizePathValue(entry.video);
    const imageSrc = sanitizePathValue(entry.image);
    const posterSrc = sanitizePathValue(entry.poster);
    const rawSrc = sanitizePathValue(entry.src);
    const declaredType = sanitizePathValue(entry.type).toLowerCase();

    if (videoSrc || declaredType === "video") {
      const resolvedVideoSrc = videoSrc || rawSrc;
      if (!resolvedVideoSrc) return null;
      const basePath =
        sanitizeBasePath(entry.videoBasePath) ||
        sanitizeBasePath(entry.basePath) ||
        backgroundVideoBasePath;
      const posterCandidate = posterSrc || imageSrc;
      const posterBase =
        sanitizeBasePath(entry.imageBasePath) ||
        sanitizeBasePath(entry.posterBasePath) ||
        backgroundImageBasePath;
      return {
        src: resolvedVideoSrc,
        type: "video",
        srcBasePath: basePath,
        poster: posterCandidate || null,
        posterBasePath: posterBase || backgroundImageBasePath,
      };
    }
    const resolvedImageSrc = rawSrc || imageSrc || posterSrc;
    if (!resolvedImageSrc) return null;
    const imageBase =
      sanitizeBasePath(entry.imageBasePath) ||
      sanitizeBasePath(entry.basePath) ||
      backgroundImageBasePath;
    return {
      src: resolvedImageSrc,
      type: "image",
      srcBasePath: imageBase || backgroundImageBasePath,
      poster: null,
      posterBasePath: backgroundImageBasePath,
    };
  }
  return null;
};

const normalizeBackgroundAssets = (assets) => {
  if (!Array.isArray(assets)) return [];
  return assets
    .map((asset) => createAssetConfig(asset))
    .filter((asset) => asset !== null);
};

const resolveAssetUrl = (src, type, basePath) => {
  if (!src) return "";
  if (/^(?:https?:)?\/\//i.test(src)) return src;
  const normalizedSrc = src.replace(/^\/+/, "");
  if (normalizedSrc.startsWith("assets/")) return withBase(normalizedSrc);
  const normalizedBase = (
    basePath && basePath.length
      ? basePath
      : type === "video"
        ? backgroundVideoBasePath
        : backgroundImageBasePath
  ).replace(/\/+$/, "");
  return withBase(`${normalizedBase}/${normalizedSrc}`);
};

const serializeBackgroundConfig = (asset) => {
  if (!asset) return "";
  let payload;
  if (asset.type === "video") {
    payload = {
      video: asset.src,
      image: asset.poster || null,
      videoBasePath: asset.srcBasePath,
      imageBasePath: asset.posterBasePath,
    };
  } else {
    payload = { image: asset.src, imageBasePath: asset.srcBasePath };
  }
  return JSON.stringify(payload);
};

// -----------------------------------------------------------------------------
// 3. THEME CONTROLS COMPONENT (Unchanged)
// -----------------------------------------------------------------------------

export const ThemeControls = ({
  theme,
  onThemeChange,
  wallpapers,
  currentWallpaper,
  onWallpaperSelect,
}) => {
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showWallpaperSelector &&
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowWallpaperSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showWallpaperSelector]);

  return (
    <>
      {/* Control Buttons Container */}
      <div className={`fixed top-5 left-5 z-[999] flex gap-2.5 `}>
        <button
          onClick={onThemeChange}
          className={`w-16 h-16 rounded-xl border-none backdrop-blur-sm cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg ${theme === "dark"
              ? "bg-black/50 text-white hover:bg-black/70"
              : "bg-white/70 text-black hover:bg-white/90 border border-black/5"
            }`}
          title={
            theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
        >
          {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          ref={buttonRef}
          onClick={() => setShowWallpaperSelector(!showWallpaperSelector)}
          className={`w-16 h-16 rounded-xl border-none backdrop-blur-sm cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg ${theme === "dark"
              ? "bg-black/50 text-white hover:bg-black/70"
              : "bg-white/70 text-black hover:bg-white/90 border border-black/5"
            }`}
          title="Change Wallpaper"
        >
          <ImageIcon size={20} />
        </button>
      </div>

      {/* Wallpaper Selector Panel */}
      <div
        ref={panelRef}
        className={`fixed top-24 left-5 mr-5 z-[10000] backdrop-blur-md rounded-2xl p-5 max-w-[400px] max-h-[70vh] shadow-2xl overflow-y-auto transition-all duration-300 border
          ${showWallpaperSelector
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none invisible"
          }
    ${theme === "dark"
            ? "bg-black/60 border-white/10 text-white"
            : "bg-white/90 border-black/10 text-black"
          }
    scrollbar-thin 
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-thumb]:rounded-full
    ${theme === "dark"
            ? "[&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-gray-400 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300"
            : "[&::-webkit-scrollbar-track]:bg-black/5 [&::-webkit-scrollbar-thumb]:bg-gray-600 hover:[&::-webkit-scrollbar-thumb]:bg-gray-800"
          }`}
      >
        <div className="flex justify-between items-center mb-[15px]">
          <h3
            className={`m-0 text-lg font-medium ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            Select Wallpaper
          </h3>
          <button
            onClick={() => setShowWallpaperSelector(false)}
            className={`bg-transparent border-none cursor-pointer p-1 flex items-center transition-colors ${theme === "dark"
                ? "text-white hover:text-gray-300"
                : "text-black hover:text-gray-600"
              }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {wallpapers && wallpapers.length > 0 ? (
            wallpapers.map((wallpaper, index) => {
              const wallpaperTheme = getThemeFromFilename(wallpaper.src);
              const isActive = currentWallpaper?.src === wallpaper.src;
              const posterUrl = wallpaper.poster
                ? withBase(`${wallpaper.posterBasePath}/${wallpaper.poster}`)
                : withBase(`${wallpaper.srcBasePath}/${wallpaper.src}`);

              return (
                <button
                  key={index}
                  onClick={() => {
                    onWallpaperSelect(wallpaper);
                    setShowWallpaperSelector(false);
                  }}
                  className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer bg-transparent p-0 transition-all duration-300 ease-in-out hover:scale-105
              ${isActive
                      ? theme === "dark"
                        ? "border-[3px] border-white"
                        : "border-[3px] border-purple-600 shadow-lg"
                      : theme === "dark"
                        ? "border-2 border-white/20 hover:border-white/50"
                        : "border-2 border-black/10 hover:border-black/30"
                    }`}
                >
                  <img
                    src={posterUrl}
                    alt={`Wallpaper ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">
                    {wallpaperTheme === "dark"
                      ? "🌙"
                      : wallpaperTheme === "light"
                        ? "☀️"
                        : "⚪"}
                  </div>
                </button>
              );
            })
          ) : (
            <p
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} col-span-2 text-center`}
            >
              Loading wallpapers...
            </p>
          )}
        </div>
      </div>
    </>
  );
};

// -----------------------------------------------------------------------------
// 4. THEME PROVIDER (Unchanged Logic)
// -----------------------------------------------------------------------------

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      // 1. Check if user has a MANUALLY saved preference
      const stored = localStorage.getItem(themeStorageKey);
      if (stored) return stored;
    } catch (e) { }

    // 2. Otherwise, use system default
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  // Sync HTML Class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    // We REMOVED the localStorage.setItem from here because 
    // we only want to save it when the user MANUALLY clicks.
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Only sync if the user hasn't locked in a preference manually
      const userHasManualPreference = localStorage.getItem(themeStorageKey);
      if (!userHasManualPreference) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    // Modern browsers use addEventListener, older use addListener
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ... (Keep your existing handleThemeChange, handleWallpaperSelect, and asset loading logic)

  const [allWallpapers, setAllWallpapers] = useState([]);
  const [currentAsset, setCurrentAsset] = useState(null);

  const getStoredBackground = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  };
  const setStoredBackground = (value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
      console.error("Failed to store background:", error);
    }
  };
  const parseStoredBackground = (rawValue) => {
    if (!rawValue) return null;
    try {
      return createAssetConfig(JSON.parse(rawValue));
    } catch (error) {
      return createAssetConfig(rawValue);
    }
  };

  const handleThemeChange = () => {
    // 1. Calculate the new theme
    const newTheme = theme === "light" ? "dark" : "light";

    // 2. Update the React state
    setTheme(newTheme);

    // 3. Persist the choice to localStorage
    try {
      localStorage.setItem(themeStorageKey, newTheme);
    } catch (e) {
      console.error("Failed to save theme to storage", e);
    }

    // Logic for filtering and setting random wallpapers removed
    // This ensures the current wallpaper stays exactly as it is.
  };

  const handleWallpaperSelect = (wallpaper) => {
    setCurrentAsset(wallpaper);
    setStoredBackground(serializeBackgroundConfig(wallpaper));

    const wallpaperTheme = getThemeFromFilename(wallpaper.src);
    if (wallpaperTheme !== "neutral") {
      setTheme(wallpaperTheme);
      try {
        localStorage.setItem(themeStorageKey, wallpaperTheme);
      } catch (e) { }
    }
  };

  useEffect(() => {
    const manifestUrl = withBase("assets/images/backgrounds/backgrounds.json");
    const storedBackgroundRaw = getStoredBackground();
    const storedBackground = parseStoredBackground(storedBackgroundRaw);
    let isMounted = true;

    fetch(manifestUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Manifest error");
        return res.json();
      })
      .then((assets) => {
        if (!isMounted) return;
        const normalizedAssets = normalizeBackgroundAssets(assets);
        setAllWallpapers(normalizedAssets);

        if (!normalizedAssets.length) return;

        let selectedAsset = null;
        if (storedBackground) {
          selectedAsset =
            normalizedAssets.find((a) => a.src === storedBackground.src) ||
            null;
        }
        if (!selectedAsset) {
          const themeWallpapers = normalizedAssets.filter((w) => {
            const wTheme = getThemeFromFilename(w.src);
            return wTheme === theme || wTheme === "neutral";
          });
          selectedAsset =
            themeWallpapers.length > 0
              ? themeWallpapers[
              Math.floor(Math.random() * themeWallpapers.length)
              ]
              : normalizedAssets[0];
        }

        if (selectedAsset) {
          setCurrentAsset(selectedAsset);
          setStoredBackground(serializeBackgroundConfig(selectedAsset));
        }
      })
      .catch((err) => console.error(err));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        allWallpapers,
        currentAsset,
        handleThemeChange,
        handleWallpaperSelect,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// 5. HEADER BACKGROUND (Updated with Parallax & Fallback Logic)
// -----------------------------------------------------------------------------

export const HeaderBackground = () => {
  const { currentAsset, theme } = useTheme();
  const mainRef = useRef(null);
  const containerRef = useRef(null); // Container for transform
  const videoRef = useRef(null);
  const cleanupRef = useRef(null);

  // Parallax Refs
  const requestRef = useRef();
  const targetPos = useRef({ x: 0, y: 0 }); // Target mouse position
  const currentPos = useRef({ x: 0, y: 0 }); // Current interpolated position

  // 1. Parallax Animation Loop
  const animateParallax = () => {
    // Linear Interpolation (Lerp) for smoothness: 0.05 is the speed/friction
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;

    // Apply Transform
    if (containerRef.current) {
      // Limit movement range (e.g., +/- 20px)
      const xOffset = currentPos.current.x * 70;
      const yOffset = currentPos.current.y * 70;
      // Scale slightly to prevent edges showing during movement
      containerRef.current.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(1.1)`;
    }

    requestRef.current = requestAnimationFrame(animateParallax);
  };

  useEffect(() => {
    // Start Animation Loop
    requestRef.current = requestAnimationFrame(animateParallax);

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to range -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;

      targetPos.current = { x, y };
    };

    // NOTE: Requirement 2 - We do NOT add a mouseLeave listener that resets targetPos.
    // By omitting it, the background stays in its last calculated position until mouse enters again.

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Asset Loading Logic
  useEffect(() => {
    if (!currentAsset || !mainRef.current) return;
    const main = mainRef.current;

    // Clear previous video setup
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (containerRef.current) containerRef.current.innerHTML = "";

    const assetUrl = resolveAssetUrl(
      currentAsset.src,
      currentAsset.type,
      currentAsset.srcBasePath,
    );

    // Apply Background Image (Backup for video, or primary for image type)
    let posterUrl = "";
    if (currentAsset.type === "video" && currentAsset.poster) {
      posterUrl = resolveAssetUrl(
        currentAsset.poster,
        "image",
        currentAsset.posterBasePath,
      );
    } else if (currentAsset.type === "image") {
      posterUrl = assetUrl;
    }

    // Always set the static background on the container initially
    // Requirement 3: This ensures if video fails, image is there.
    if (posterUrl) {
      main.style.backgroundImage = `url("${posterUrl}")`;
    }

    if (currentAsset.type === "video") {
      const video = document.createElement("video");
      video.className = "main__background-media";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.style.objectFit = "cover";
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.opacity = "0"; // Start hidden
      video.style.transition = "opacity 0.8s ease-in-out";

      // Video Fallback Logic
      video.onerror = () => {
        console.warn("Background video failed to load, falling back to image.");
        video.style.display = "none"; // Hide broken video element completely
        // The main.style.backgroundImage set above remains visible
      };

      if (posterUrl) video.setAttribute("poster", posterUrl);
      video.src = assetUrl;

      if (containerRef.current) containerRef.current.appendChild(video);

      // Only fade in video once it is actually playing data
      video.addEventListener("play", () => {
        video.style.opacity = "1";
        // Optional: We can clear the background image to save memory,
        // OR keep it for safety. Given Req 3, it's safer to keep it
        // behind the video in case the video freezes or crashes later.
      });

      videoRef.current = video;

      // Cleanup for this specific video instance
      cleanupRef.current = () => {
        video.pause();
        video.src = "";
        video.load();
        video.remove();
      };

      // Attempt play
      video.play().catch((e) => {
        console.warn("Autoplay failed/blocked", e);
        // Fallback image is already visible
      });
    }
  }, [currentAsset]);

  return (
    <div
      ref={mainRef}
      id="main"
      className="main"
      data-theme={theme}
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        ref={containerRef}
        className="main__parallax-container"
        style={{
          position: "absolute",
          top: -50, // Slight negative top/left to allow for movement without showing edges
          left: -50,
          width: "calc(100% + 100px)", // Larger width/height for parallax movement
          height: "calc(100% + 100px)",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default HeaderBackground;
