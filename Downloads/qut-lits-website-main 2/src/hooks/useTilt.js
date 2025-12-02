import { useRef, useEffect } from 'react';

export function useTilt(options = {}) {
  const ref = useRef(null);
  const {
    maxTilt = 5,
    perspective = 1000,
    scale = 1.02,
    reverse = false,
    disabled = false
  } = options;

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    let isHovering = false;
    let rafId = null;

    const handleMouseMove = (e) => {
      if (!isHovering || rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = reverse 
          ? ((y - centerY) / centerY) * maxTilt 
          : -((y - centerY) / centerY) * maxTilt;
        const rotateY = reverse
          ? -((x - centerX) / centerX) * maxTilt
          : ((x - centerX) / centerX) * maxTilt;

        element.style.transform = `
          perspective(${perspective}px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(${scale})
        `;
        element.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
        rafId = null;
      });
    };

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      element.style.transform = `
        perspective(${perspective}px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale(1)
      `;
      element.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxTilt, perspective, scale, reverse, disabled]);

  return ref;
}

