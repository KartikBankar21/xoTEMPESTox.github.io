import React, { useEffect, useRef, useState } from 'react';
import '../styles/main.css'
// Constants
const getBaseUrl = () => {
  try {
    const url = import.meta?.env?.BASE_URL ?? '/';
    return url.endsWith('/') ? url : `${url}/`;
  } catch (e) {
    return '/';
  }
};

const baseUrl = getBaseUrl();

const backgroundImageBasePath = 'assets/images/backgrounds';
const backgroundVideoBasePath = 'assets/videos/backgrounds';
const videoExtensions = ['mp4', 'webm', 'ogv', 'ogg'];
const storageKey = 'portfolio:lastBackground';

// Utility functions
const withBase = (path) => {
  if (!path) return baseUrl;
  return `${baseUrl}${path.replace(/^\/+/, '')}`;
};

const sanitizePathValue = (value) => {
  return typeof value === 'string' ? value.trim() : '';
};

const sanitizeBasePath = (value) => {
  const sanitized = sanitizePathValue(value);
  return sanitized ? sanitized.replace(/\/+$/, '') : '';
};

const HeaderComponent = () => {
  const mainRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const cleanupRef = useRef(null);
  const parallaxCleanupRef = useRef(null);
  const parallaxPositionCache = useRef(new Map());
  
  const [currentAsset, setCurrentAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper: Get stored background from localStorage
  const getStoredBackground = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  };

  // Helper: Set stored background in localStorage
  const setStoredBackground = (value) => {
    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
      console.error('Failed to store background:', error);
    }
  };

  // Helper: Parse stored background
  const parseStoredBackground = (rawValue) => {
    if (!rawValue) return null;
    
    try {
      const parsed = JSON.parse(rawValue);
      return createAssetConfig(parsed);
    } catch (error) {
      return createAssetConfig(rawValue);
    }
  };

  // Helper: Create asset config from various input formats
  const createAssetConfig = (entry) => {
    if (!entry) return null;

    if (typeof entry === 'string') {
      const sanitizedSrc = sanitizePathValue(entry);
      if (!sanitizedSrc) return null;

      const extension = sanitizedSrc.includes('.') 
        ? sanitizedSrc.split('.').pop() 
        : '';
      const type = extension && videoExtensions.includes(extension.toLowerCase()) 
        ? 'video' 
        : 'image';
      const basePath = type === 'video' 
        ? backgroundVideoBasePath 
        : backgroundImageBasePath;

      return {
        src: sanitizedSrc,
        type,
        srcBasePath: basePath,
        poster: null,
        posterBasePath: backgroundImageBasePath
      };
    }

    if (typeof entry === 'object') {
      const videoSrc = sanitizePathValue(entry.video);
      const imageSrc = sanitizePathValue(entry.image);
      const posterSrc = sanitizePathValue(entry.poster);
      const rawSrc = sanitizePathValue(entry.src);
      const declaredType = sanitizePathValue(entry.type).toLowerCase();

      if (videoSrc || declaredType === 'video') {
        const resolvedVideoSrc = videoSrc || rawSrc;
        if (!resolvedVideoSrc) return null;

        const basePath = sanitizeBasePath(entry.videoBasePath) || 
                        sanitizeBasePath(entry.basePath) || 
                        backgroundVideoBasePath;
        const posterCandidate = posterSrc || imageSrc;
        const posterBase = sanitizeBasePath(entry.imageBasePath) || 
                          sanitizeBasePath(entry.posterBasePath) || 
                          backgroundImageBasePath;

        return {
          src: resolvedVideoSrc,
          type: 'video',
          srcBasePath: basePath,
          poster: posterCandidate || null,
          posterBasePath: posterBase || backgroundImageBasePath
        };
      }

      const resolvedImageSrc = rawSrc || imageSrc || posterSrc;
      if (!resolvedImageSrc) return null;

      const imageBase = sanitizeBasePath(entry.imageBasePath) || 
                       sanitizeBasePath(entry.basePath) || 
                       backgroundImageBasePath;

      return {
        src: resolvedImageSrc,
        type: 'image',
        srcBasePath: imageBase || backgroundImageBasePath,
        poster: null,
        posterBasePath: backgroundImageBasePath
      };
    }

    return null;
  };

  // Helper: Resolve asset URL
  const resolveAssetUrl = (src, type, basePath) => {
    if (!src) return '';
    if (/^(?:https?:)?\/\//i.test(src)) return src;

    const normalizedSrc = src.replace(/^\/+/, '');
    if (normalizedSrc.startsWith('assets/')) {
      return withBase(normalizedSrc);
    }

    const normalizedBase = (basePath && basePath.length 
      ? basePath 
      : type === 'video' ? backgroundVideoBasePath : backgroundImageBasePath
    ).replace(/\/+$/, '');

    return withBase(`${normalizedBase}/${normalizedSrc}`);
  };

  // Helper: Serialize background config
  const serializeBackgroundConfig = (asset) => {
    if (!asset) return '';

    let payload;
    if (asset.type === 'video') {
      payload = {
        video: asset.src,
        image: asset.poster || null,
        videoBasePath: asset.srcBasePath,
        imageBasePath: asset.posterBasePath
      };
    } else {
      payload = {
        image: asset.src,
        imageBasePath: asset.srcBasePath
      };
    }

    return JSON.stringify(payload);
  };

  // Helper: Normalize background assets
  const normalizeBackgroundAssets = (assets) => {
    if (!Array.isArray(assets)) return [];
    return assets
      .map(asset => createAssetConfig(asset))
      .filter(asset => asset !== null);
  };

  // Helper: Check if parallax should be enabled
  const shouldEnableParallax = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    const hasTouchInput = (
      typeof navigator !== 'undefined' &&
      ((navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0))
    ) || 'ontouchstart' in window;

    if (hasTouchInput) return false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    return hasFinePointer;
  };

  // Setup parallax effect
  const enableBackgroundParallax = (asset) => {
    if (parallaxCleanupRef.current) {
      parallaxCleanupRef.current();
      parallaxCleanupRef.current = null;
    }

    if (!asset || !shouldEnableParallax() || !mainRef.current) {
      resetParallax(asset);
      return;
    }

    const main = mainRef.current;
    const backgroundContainer = asset.type === 'video' 
      ? containerRef.current 
      : null;

    const cacheKey = `${asset.type}|${asset.srcBasePath || ''}|${asset.src}`;
    const cachedPosition = parallaxPositionCache.current.get(cacheKey);
    
    const initialPosition = cachedPosition
      ? {
          x: Math.min(1, Math.max(0, typeof cachedPosition.x === 'number' ? cachedPosition.x : 0.5)),
          y: Math.min(1, Math.max(0, typeof cachedPosition.y === 'number' ? cachedPosition.y : 0.5))
        }
      : { x: 0.5, y: 0.5 };

    const state = {
      target: { x: initialPosition.x, y: initialPosition.y },
      current: { x: initialPosition.x, y: initialPosition.y }
    };

    const smoothingFactor = 0.1;
    const settleThreshold = 0.00000000001;
    let animationFrameId = null;

    const applyParallaxOffset = (position) => {
      const clampedX = Math.min(1, Math.max(0, position.x));
      const clampedY = Math.min(1, Math.max(0, position.y));

      if (asset.type === 'video' && backgroundContainer) {
        const offsetIntensity = 50;
        const offsetX = (clampedX - 0.5) * offsetIntensity;
        const offsetY = (clampedY - 0.5) * offsetIntensity;

        backgroundContainer.style.setProperty('--parallax-offset-x', `${offsetX}px`);
        backgroundContainer.style.setProperty('--parallax-offset-y', `${offsetY}px`);
        backgroundContainer.style.setProperty('--parallax-scale', '1.08');
      } else {
        const offsetIntensityPercent = 50;
        const offsetXPercent = (clampedX - 0.5) * offsetIntensityPercent;
        const offsetYPercent = (clampedY - 0.5) * offsetIntensityPercent;
        main.style.backgroundPosition = `${50 + offsetXPercent}% ${50 + offsetYPercent}%`;
      }

      parallaxPositionCache.current.set(cacheKey, { x: clampedX, y: clampedY });
    };

    const stepAnimation = () => {
      const deltaX = state.target.x - state.current.x;
      const deltaY = state.target.y - state.current.y;
      const remainsActive = Math.abs(deltaX) > settleThreshold || Math.abs(deltaY) > settleThreshold;

      if (remainsActive) {
        state.current.x += deltaX * smoothingFactor;
        state.current.y += deltaY * smoothingFactor;
        animationFrameId = window.requestAnimationFrame(stepAnimation);
      } else {
        state.current.x = state.target.x;
        state.current.y = state.target.y;
        animationFrameId = null;
      }

      applyParallaxOffset(state.current);
    };

    const ensureAnimationRunning = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(stepAnimation);
      }
    };

    const handlePointerMove = (event) => {
      const bounds = main.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const relativeX = (event.clientX - bounds.left) / bounds.width;
      const relativeY = (event.clientY - bounds.top) / bounds.height;
      
      state.target.x = relativeX;
      state.target.y = relativeY;
      ensureAnimationRunning();
    };

    const handlePointerLeave = () => {
      state.target.x = 0.5;
      state.target.y = 0.5;
      ensureAnimationRunning();
    };

document.addEventListener('mousemove', handlePointerMove);
document.addEventListener('mouseleave', handlePointerLeave);


    applyParallaxOffset(state.current);
    ensureAnimationRunning();

    parallaxCleanupRef.current = () => {
document.removeEventListener('mousemove', handlePointerMove);
document.removeEventListener('mouseleave', handlePointerLeave);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
      resetParallax(asset);
    };
  };

  // Reset parallax
  const resetParallax = (asset) => {
    if (!asset || !mainRef.current) return;

    if (asset.type === 'video') {
      const target = containerRef.current;
      if (target) {
        target.style.removeProperty('--parallax-offset-x');
        target.style.removeProperty('--parallax-offset-y');
        target.style.removeProperty('--parallax-scale');
      }
    } else {
      mainRef.current.style.backgroundPosition = '';
    }
  };

  // Apply background (video or image)
  const applyBackground = (asset) => {
    if (!asset || !mainRef.current) return;

    const main = mainRef.current;
    const assetUrl = resolveAssetUrl(asset.src, asset.type, asset.srcBasePath);

    console.log('Applying background:', { asset, assetUrl });

    if (asset.type === 'video') {
      // Clean up previous video if exists
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      const video = document.createElement('video');
      video.className = 'main__background-media';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true; // Add autoplay back
      video.defaultMuted = true;
      video.preload = 'auto';
      video.disableRemotePlayback = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('autoplay', ''); // Add autoplay attribute
      video.style.backgroundColor = 'transparent';
      video.style.opacity = '0';
      video.style.transition = 'opacity 0.6s ease-in-out';

      // Add event listeners for debugging
      video.addEventListener('loadstart', () => {
        console.log('🔵 Video load started:', assetUrl);
      });

      video.addEventListener('progress', () => {
        console.log('🔵 Video downloading...', assetUrl);
      });

      video.addEventListener('loadedmetadata', () => {
        console.log('✅ Video metadata loaded:', assetUrl, {
          duration: video.duration,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight
        });
      });

      video.addEventListener('loadeddata', () => {
        console.log('✅ Video data loaded:', assetUrl, 'readyState:', video.readyState);
        // Try to play as soon as data is loaded
        video.play()
          .then(() => {
            console.log('✅ Video started playing (loadeddata)');
            video.style.opacity = '1';
            video.classList.add('is-active');
            setTimeout(() => {
              main.style.backgroundImage = '';
            }, 600);
          })
          .catch(err => console.warn('⚠️ Play failed at loadeddata:', err));
      });

      video.addEventListener('error', (e) => {
        console.error('❌ Video error:', assetUrl);
        console.error('❌ Error details:', {
          error: video.error,
          code: video.error?.code,
          message: video.error?.message,
          networkState: video.networkState,
          readyState: video.readyState
        });
        // Fallback to image if video fails
        if (asset.poster) {
          const posterUrl = resolveAssetUrl(asset.poster, 'image', asset.posterBasePath);
          main.style.backgroundImage = `url("${posterUrl}")`;
        }
      });

      video.addEventListener('canplay', () => {
        console.log('✅ Video can play:', assetUrl);
        video.play()
          .then(() => {
            console.log('✅ Video started playing (canplay)');
            video.style.opacity = '1';
            video.classList.add('is-active');
          })
          .catch(err => console.warn('⚠️ Play failed at canplay:', err));
      });

      video.addEventListener('canplaythrough', () => {
        console.log('✅ Video can play through:', assetUrl);
        video.style.opacity = '1';
        video.classList.add('is-active');
        
        video.play()
          .then(() => {
            console.log('✅ Video playing successfully');
            // Clear background image once video is playing
            setTimeout(() => {
              main.style.backgroundImage = '';
            }, 600);
          })
          .catch((err) => {
            console.warn('⚠️ Autoplay failed:', err);
          });
      });

      video.addEventListener('playing', () => {
        console.log('✅ Video is now playing!', assetUrl);
      });

      video.addEventListener('stalled', () => {
        console.warn('⚠️ Video stalled:', assetUrl);
      });

      video.addEventListener('waiting', () => {
        console.warn('⚠️ Video waiting for data:', assetUrl);
      });

      video.addEventListener('suspend', () => {
        console.log('🔵 Video suspended:', assetUrl);
        console.log('Network state:', video.networkState, 'Ready state:', video.readyState);
        
        // If suspended and no data after 2 seconds, fallback to image
        setTimeout(() => {
          if (video.readyState === 0 || video.networkState === 3) {
            console.warn('⚠️ Video failed to load, falling back to poster image');
            if (asset.poster) {
              const posterUrl = resolveAssetUrl(asset.poster, 'image', asset.posterBasePath);
              main.style.backgroundImage = `url("${posterUrl}")`;
              video.style.display = 'none';
            }
          }
        }, 2000);
      });

      // Set poster image first
      if (asset.poster) {
        const posterUrl = resolveAssetUrl(asset.poster, 'image', asset.posterBasePath);
        video.setAttribute('poster', posterUrl);
        main.style.backgroundImage = `url("${posterUrl}")`;
      }

      // Append video to container first
      if (containerRef.current) {
        containerRef.current.appendChild(video);
      }

      // Use direct src instead of source element for better compatibility
      video.src = assetUrl;
      console.log('Video src directly set to:', video.src);
      console.log('Video element appended to DOM');
      
      // Check if video starts loading
      setTimeout(() => {
        console.log('Video status after 500ms:', {
          networkState: video.networkState,
          readyState: video.readyState,
          paused: video.paused,
          src: video.src,
          currentSrc: video.currentSrc
        });
      }, 500);

      videoRef.current = video;
      
      // Store cleanup function
      cleanupRef.current = () => {
        try {
          video.pause();
          video.src = '';
          video.load();
        } catch (e) {
          console.error('Video cleanup error:', e);
        }
      };
    } else {
      // Image background
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      main.style.backgroundImage = `url("${assetUrl}")`;
      console.log('Image background set to:', assetUrl);
    }

    setCurrentAsset(asset);
    enableBackgroundParallax(asset);
  };

  // Load and apply stored background placeholder
  useEffect(() => {
    const storedBackgroundRaw = getStoredBackground();
    const storedBackground = parseStoredBackground(storedBackgroundRaw);
    
    if (storedBackground && mainRef.current) {
      if (storedBackground.type === 'video' && storedBackground.poster) {
        const posterUrl = resolveAssetUrl(
          storedBackground.poster, 
          'image', 
          storedBackground.posterBasePath
        );
        mainRef.current.style.backgroundImage = `url("${posterUrl}")`;
      } else if (storedBackground.type === 'image') {
        const imageUrl = resolveAssetUrl(
          storedBackground.src, 
          'image', 
          storedBackground.srcBasePath
        );
        mainRef.current.style.backgroundImage = `url("${imageUrl}")`;
      }
    }
  }, []);

  // Fetch and apply background from manifest
  useEffect(() => {
    const manifestUrl = withBase('assets/images/backgrounds/backgrounds.json');
    const storedBackgroundRaw = getStoredBackground();
    const storedBackground = parseStoredBackground(storedBackgroundRaw);

    let isMounted = true; // Prevent state updates after unmount

    fetch(manifestUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Unable to load background manifest: ${response.status}`);
        }
        return response.json();
      })
      .then(assets => {
        if (!isMounted) return; // Component unmounted, abort

        const normalizedAssets = normalizeBackgroundAssets(assets);
        
        if (!normalizedAssets.length) {
          console.warn('No background assets available.');
          setIsLoading(false);
          return;
        }

        let selectedAsset = null;

        if (!storedBackground && normalizedAssets.length) {
          selectedAsset = normalizedAssets[0];
        } else {
          const lastAssetSrc = storedBackground?.src || 
            (typeof storedBackgroundRaw === 'string' ? storedBackgroundRaw : null);
          
          const candidateAssets = normalizedAssets.filter(
            asset => asset.src !== lastAssetSrc
          );
          
          const selectionPool = candidateAssets.length 
            ? candidateAssets 
            : normalizedAssets;
          
          selectedAsset = selectionPool[
            Math.floor(Math.random() * selectionPool.length)
          ];
        }

        if (!selectedAsset) {
          selectedAsset = normalizedAssets[0];
        }

        if (isMounted) {
          applyBackground(selectedAsset);
          setStoredBackground(serializeBackgroundConfig(selectedAsset));
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Failed to set background:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (parallaxCleanupRef.current) {
        parallaxCleanupRef.current();
        parallaxCleanupRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <div 
      ref={mainRef} 
      id="main" 
      className="main"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div 
        ref={containerRef}
        className="main__background"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          transform: `translate(
            var(--parallax-offset-x, 0), 
            var(--parallax-offset-y, 0)
          ) scale(var(--parallax-scale, 1))`,
          transformOrigin: 'center center',
          willChange: 'transform'
        }}
      />
      
      {/* Your other content goes here */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Add your header content, navigation, etc. */}
      </div>
    </div>
  );
};

export default HeaderComponent;