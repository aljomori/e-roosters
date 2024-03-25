import { useEffect, useState, useMemo } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  });

  useEffect(() => {
    const resizeHandler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return useMemo(
    () => ({
      width: size.width,
      height: size.height,
    }),
    [size.width, size.height],
  );
};

export default useWindowSize;
