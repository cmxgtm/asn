"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const partners = [
  {
    name: "VIB",
    logo: "https://congchungchaua.vn/wp-content/uploads/2022/10/vib-1.jpg",
    url: "https://www.vib.com.vn/",
  },
  {
    name: "Techcombank",
    logo: "https://congchungchaua.vn/wp-content/uploads/2022/10/Techcombank_logo.jpg",
    url: "https://www.techcombank.com.vn/",
  },
  {
    name: "VPBank",
    logo: "https://congchungchaua.vn/wp-content/uploads/2022/10/vpbank.jpg",
    url: "https://www.vpbank.com.vn/",
  },
  {
    name: "BIDV",
    logo: "https://congchungchaua.vn/wp-content/uploads/2022/10/bidv.jpg",
    url: "https://www.bidv.com.vn/",
  },
  {
    name: "OCB",
    logo: "https://congchungchaua.vn/wp-content/uploads/2022/10/ocb.jpg",
    url: "#",
  },
  {
    name: "UOB",
    logo: "https://congchungchaua.vn/wp-content/uploads/2022/10/uob.jpg",
    url: "https://www.uob.com.vn/",
  },
  {
    name: "OceanBank",
    logo: "https://congchungchaua.vn/wp-content/uploads/2020/08/oceabank-1.jpg",
    url: "https://www.oceanbank.vn/",
  },
  {
    name: "BIDC",
    logo: "https://congchungchaua.vn/wp-content/uploads/2020/08/bidc.jpg",
    url: "https://bidc.com.vn/",
  },
  {
    name: "MBBank",
    logo: "https://congchungchaua.vn/wp-content/uploads/2023/04/Logo_MB_new.jpg",
    url: "#",
  },
];

const ITEM_WIDTH = 176; // w-36 (144px) + gap-8 (32px)
const AUTO_SPEED = 0.5; // px per frame

export default function PartnersSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollX = useRef(0);
  const rafId = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);
  const hasDragged = useRef(false);
  const [paused, setPaused] = useState(false);

  const totalWidth = partners.length * ITEM_WIDTH;

  const applyScroll = useCallback(() => {
    if (!trackRef.current) return;
    // Wrap around seamlessly
    if (scrollX.current >= totalWidth) scrollX.current -= totalWidth;
    if (scrollX.current < 0) scrollX.current += totalWidth;
    trackRef.current.style.transform = `translateX(-${scrollX.current}px)`;
  }, [totalWidth]);

  // Auto-scroll loop
  useEffect(() => {
    const tick = () => {
      if (!isDragging.current && !paused) {
        scrollX.current += AUTO_SPEED;
        applyScroll();
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [paused, applyScroll]);

  // Mouse drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollStart.current = scrollX.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 3) hasDragged.current = true;
    scrollX.current = dragScrollStart.current - dx;
    applyScroll();
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  // Render 3x items for seamless infinite loop
  const tripled = [...partners, ...partners, ...partners];

  return (
    <section
      id="doi-tac"
      className="py-16 bg-white border-t border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div
            className="inline-block rounded-full py-2 px-5"
            style={{
              background:
                "linear-gradient(to right, #2651A6, #0477BF, #049DD9)",
            }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Doanh nghiệp &amp; Đối tác
            </h2>
          </div>
        </div>

        {/* Infinite scroll carousel with drag */}
        <div
          className="overflow-hidden relative w-full select-none"
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="inline-flex gap-8 items-center will-change-transform"
          >
            {tripled.map((partner, i) => (
              <a
                key={`${partner.name}-${i}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 group"
                draggable={false}
                onClick={(e) => {
                  if (hasDragged.current) e.preventDefault();
                }}
              >
                <div className="w-36 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-3 transition-all duration-300 group-hover:border-navy-200 group-hover:shadow-lg group-hover:bg-white group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-12 transition-all duration-300 pointer-events-none"
                    unoptimized
                    draggable={false}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
