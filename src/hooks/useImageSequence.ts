import { useState, useEffect, useRef } from 'react';

const FRAME_COUNT = 240;

const currentFrame = (index: number) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/images/ezgif-frame-${paddedIndex}.jpg`;
};

export const useImageSequence = (shouldStartPreload: boolean = false) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const hasTriggeredFullPreload = useRef(false);

  // 1. Immediately load Frame 1 so the canvas can render immediately without delay
  useEffect(() => {
    let isMounted = true;
    const firstImg = new Image();
    firstImg.src = currentFrame(1);
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current[0] = firstImg;
      setLoadedCount(1);
      setHasFirstFrame(true);
    };

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Lazy load the remaining 239 frames in managed batches ONLY when user scrolls near the section
  useEffect(() => {
    if (!shouldStartPreload || hasTriggeredFullPreload.current) return;
    hasTriggeredFullPreload.current = true;

    let isMounted = true;
    let nextIndexToLoad = 2; // start from frame 2 (1-based)
    const MAX_CONCURRENT = 6; // Standard browser HTTP connection pool size
    let activeLoads = 0;

    const loadNext = () => {
      if (!isMounted) return;

      while (activeLoads < MAX_CONCURRENT && nextIndexToLoad <= FRAME_COUNT) {
        const frameIdx = nextIndexToLoad++;
        activeLoads++;

        const img = new Image();
        img.src = currentFrame(frameIdx);

        img.onload = () => {
          if (!isMounted) return;
          activeLoads--;
          imagesRef.current[frameIdx - 1] = img;
          setLoadedCount((prev) => prev + 1);
          loadNext();
        };

        img.onerror = () => {
          if (!isMounted) return;
          activeLoads--;
          loadNext();
        };
      }
    };

    // Begin batch loading
    loadNext();

    return () => {
      isMounted = false;
    };
  }, [shouldStartPreload]);

  return {
    imagesRef,
    isInitialLoaded: hasFirstFrame,
    isFullyLoaded: loadedCount >= FRAME_COUNT,
    loadedCount,
    progress: (loadedCount / FRAME_COUNT) * 100,
  };
};
