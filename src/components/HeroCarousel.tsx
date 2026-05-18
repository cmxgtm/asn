"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

const slides = [
  {
    src: "https://congchungchaua.vn/wp-content/uploads/2023/03/Slider-04-812x220.jpg",
    alt: "ASN Công Chứng Châu Á",
    headline: "Chính xác · Chuyên nghiệp · Nhanh chóng",
    sub: "Văn phòng Công Chứng hàng đầu Quận 3, TP.HCM",
    cta: { label: "Đặt lịch hẹn ngay", href: "/dat-lich" },
  },
  {
    src: "https://congchungchaua.vn/wp-content/uploads/2023/03/Slide-02-812x220.jpg",
    alt: "Dịch vụ công chứng đa dạng",
    headline: "Đa dạng dịch vụ công chứng",
    sub: "Hợp đồng · Bản dịch · Chứng thực · Tư vấn pháp luật",
    cta: { label: "Khám phá dịch vụ", href: "#dich-vu" },
  },
  {
    src: "https://congchungchaua.vn/wp-content/uploads/2023/03/Slider-03-812x220.jpg",
    alt: "Đội ngũ công chứng viên chuyên nghiệp",
    headline: "Đội ngũ công chứng viên giàu kinh nghiệm",
    sub: "Hơn 20 năm đồng hành cùng người dân và doanh nghiệp",
    cta: { label: "Tìm hiểu thêm", href: "#doi-ngu" },
  },
  {
    src: "https://congchungchaua.vn/wp-content/uploads/2023/03/Slider-01-812x220.jpg",
    alt: "Công chứng nhanh chóng",
    headline: "Thủ tục nhanh – Hồ sơ gọn – Hiệu quả cao",
    sub: "Công chứng trong ngày với quy trình tối ưu, minh bạch",
    cta: { label: "Nộp hồ sơ online", href: "#nop-ho-so" },
  },
];

const newsTickerItems = [
  "Thông báo: Văn phòng làm việc bình thường từ thứ Hai đến thứ Sáu (8:00–17:00), thứ Bảy (8:00–12:00)",
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
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={idx === 0}
              unoptimized
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-800/60 to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div
                  key={`content-${idx}-${current}`}
                  className={idx === current ? "animate-fade-up" : ""}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-0.5 bg-gold-400" />
                    <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
                      Văn phòng Công Chứng Châu Á
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white text-shadow max-w-2xl leading-tight mb-4">
                    {slide.headline}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base max-w-lg mb-6">
                    {slide.sub}
                  </p>
                  <a
                    href={slide.cta.href}
                    className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-navy-900 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-gold-400/40 hover:scale-105"
                  >
                    {slide.cta.label} →
                  </a>
                </div>
              </div>
            </div>
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
                  ? "w-6 h-2 bg-gold-400 rounded-full"
                  : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
