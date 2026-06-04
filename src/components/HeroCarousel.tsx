"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import slide1 from "@/assets/img/2QDty8qU.jpg";
import slide2 from "@/assets/img/34EIc0HB.jpg";
import slide3 from "@/assets/img/EUiFCcXR.jpg";
import slide4 from "@/assets/img/FxNe6pva.jpg";

const slides = [slide1, slide2, slide3, slide4];

const newsTickerItems = [
  "Thông báo: Văn phòng làm việc từ Thứ hai đến Thứ sáu (08:00 đến 12:00 – 13:00 đến 17:00), Thứ bảy (08:00 đến 12:00)",
  "ASN thông báo lịch nghỉ Lễ 30/4 và 1/5 năm 2026",
  "Dịch vụ công chứng ngoài trụ sở – Gọi ngay 079 992 1998",
  "Báo động ủy quyền giả đổ về TP.HCM – Chọn văn phòng công chứng uy tín",
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-[340px] md:h-[440px] lg:h-[520px]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* BG image */}
            <Image
              src={slide}
              alt="ASN Công Chứng Châu Á"
              fill
              className="object-cover"
              priority={idx === 0}
              unoptimized
            />
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-white rounded-full"
                  : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
