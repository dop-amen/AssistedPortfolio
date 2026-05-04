"use client";
import { useEffect, useRef } from "react";

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollEl = document.querySelector(".custom-scrollbar") as HTMLElement;
    if (!scrollEl) return;

    container.innerHTML = "";
    const count = 80;
    const stars: { el: HTMLDivElement; initialY: number; speed: number }[] = [];

    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const isStatic = Math.random() < 0.3;
      const z = isStatic ? 0 : 0.2 + Math.random() * 0.6;
      const size = isStatic ? 1 + Math.random() : 1 + Math.random() * 2;

      s.style.cssText = `
        position: absolute;
        background: white;
        border-radius: 50%;
        opacity: 0.8;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        animation: twinkle ${2 + Math.random() * 4}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
        will-change: transform, opacity;
      `;

      container.appendChild(s);
      stars.push({ el: s, initialY: y, speed: z });
    }

    let lastScroll = 0;
    let lastTime = performance.now();

    const onScroll = () => {
      const scroll = scrollEl.scrollTop;
      const now = performance.now();
      const dt = now - lastTime || 1;
      const velocity = (scroll - lastScroll) / dt * 16;
      lastScroll = scroll;
      lastTime = now;

      const stretch = Math.max(1, Math.min(1 + Math.abs(velocity) * 0.15, 4));

      stars.forEach((star) => {
        if (star.speed === 0) {
          star.el.style.transform = "scaleY(1)";
          return;
        }
        let pos = (star.initialY - (scroll * star.speed * 0.05)) % 100;
        if (pos < 0) pos += 100;
        star.el.style.top = pos + "%";
        star.el.style.transform = `scaleY(${stretch})`;
      });
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
}