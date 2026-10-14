import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const glow = cursorGlowRef.current;
    if (!cursor || !dot || !glow) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

      gsap.set(cursor, {
        x: pos.current.x - 20,
        y: pos.current.y - 20,
      });
      gsap.set(dot, {
        x: mouse.current.x - 4,
        y: mouse.current.y - 4,
      });
      gsap.set(glow, {
        x: pos.current.x - 75,
        y: pos.current.y - 75,
      });

      requestAnimationFrame(tick);
    };

    // Handle magnetic elements
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    const onMagneticEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(cursor, { scale: 2, borderColor: '#C28E3A', duration: 0.3 });
      gsap.to(glow, { opacity: 0.6, scale: 1.5, duration: 0.3 });
      target.style.transition = 'transform 0.3s ease';
    };

    const onMagneticLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      gsap.to(cursor, { scale: 1, borderColor: 'rgba(194,142,58,0.5)', duration: 0.3 });
      gsap.to(glow, { opacity: 0.3, scale: 1, duration: 0.3 });
      gsap.to(target, { x: 0, y: 0, duration: 0.3 });
    };

    const onMagneticMove = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const mouseEvent = e as MouseEvent;
      const rect = target.getBoundingClientRect();
      const relX = mouseEvent.clientX - rect.left - rect.width / 2;
      const relY = mouseEvent.clientY - rect.top - rect.height / 2;
      gsap.to(target, { x: relX * 0.3, y: relY * 0.3, duration: 0.3 });
    };

    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', onMagneticEnter);
      el.addEventListener('mouseleave', onMagneticLeave);
      el.addEventListener('mousemove', onMagneticMove);
    });

    // Detect hover on clickable elements
    const onLinkEnter = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
    };
    const onLinkLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(tick);

    // Watch for clickable elements
    const addLinkListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onLinkEnter);
        el.addEventListener('mouseleave', onLinkLeave);
      });
    };
    addLinkListeners();
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMagneticEnter);
        el.removeEventListener('mouseleave', onMagneticLeave);
        el.removeEventListener('mousemove', onMagneticMove);
      });
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Glow */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(194,142,58,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.3,
          mixBlendMode: 'screen',
        }}
      />
      {/* Ring */}
      <div
        ref={cursorRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(194,142,58,0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#C28E3A',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />
    </>
  );
};
