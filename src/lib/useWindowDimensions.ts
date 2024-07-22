import { useState, useEffect } from 'react';

interface WindowDimensions {
  width: number;
  height: number;
  isMounted: boolean
}

function getWindowDimensions(): WindowDimensions {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
      isMounted: true
    };
  }

  // Default values when window is not defined (e.g., server-side rendering)
  return {
    width: 0,
    height: 0,
    isMounted: false
  };
}

export default function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        setWindowDimensions(getWindowDimensions());
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
}