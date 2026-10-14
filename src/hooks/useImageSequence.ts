import { useState, useEffect } from 'react';

const FRAME_COUNT = 240;

const currentFrame = (index: number) => {
  // The files are named ezgif-frame-001.jpg up to ezgif-frame-240.jpg
  const paddedIndex = index.toString().padStart(3, '0');
  return `/images/ezgif-frame-${paddedIndex}.jpg`;
};

export const useImageSequence = () => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        if (isMounted) {
          setLoaded((prev) => prev + 1);
        }
      };
      loadedImages.push(img);
    }

    if (isMounted) {
      setImages(loadedImages);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    images,
    isFullyLoaded: loaded === FRAME_COUNT,
    progress: (loaded / FRAME_COUNT) * 100,
  };
};
