"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const team = [
  {
    name: "Nguyễn Tiến Luyện",
    role: "Công chứng viên – Trưởng văn phòng",
    photo: "https://congchungchaua.vn/wp-content/uploads/2018/09/A-Luyen.jpg",
    experience: "15+ năm kinh nghiệm",
    href: "#",
  },
  {
    name: "Hà Đức Cường",
    role: "Công chứng viên",
    photo: "https://congchungchaua.vn/wp-content/uploads/2018/09/A-Cuong.jpg",
    experience: "12+ năm kinh nghiệm",
    href: "#",
  },
  {
    name: "Nguyễn Thị Hoa Mỹ",
    role: "Công chứng viên",
    photo: "https://congchungchaua.vn/wp-content/uploads/2019/09/hoa-my.jpg",
    experience: "10+ năm kinh nghiệm",
    href: "#",
  },
  {
    name: "Nguyễn Thị Lý",
    role: "Công chứng viên",
    photo:
      "https://congchungchaua.vn/wp-content/uploads/2019/09/Hinh_Ms-LY.jpg",
    experience: "8+ năm kinh nghiệm",
    href: "#",
  },
  {
    name: "Nguyễn Minh Tuấn",
    role: "Công chứng viên",
    photo:
      "https://congchungchaua.vn/wp-content/uploads/2018/09/CCV-Nguyen-Minh-Tuan.jpg",
    experience: "8+ năm kinh nghiệm",
    href: "#",
  },
  {
    name: "Lương Thị Nguyên Ngọc",
    role: "Công chứng viên",
    photo:
      "https://congchungchaua.vn/wp-content/uploads/2018/09/CCV-Luong-Thi-Nguyen-Ngoc.jpg",
    experience: "7+ năm kinh nghiệm",
    href: "#",
  },
];

export default function TeamSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const visibleCards = 4;
  const maxIndex = team.length - visibleCards;

  const next = useCallback(
    () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)),
    [maxIndex],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1)),
    [maxIndex],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section id="doi-ngu" className="py-20 bg-navy-gradient">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Công Chứng Viên
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-sm">
            Đội ngũ công chứng viên của ASN được đào tạo bài bản, có chứng chỉ
            hành nghề và nhiều năm kinh nghiệm thực tiễn.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          >
            <ChevronRight size={18} className="text-white" />
          </button>

          {/* Track */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / visibleCards)}%)`,
              }}
            >
              {team.map((member) => (
                <a
                  key={member.name}
                  href={member.href}
                  className="w-1/4 flex-shrink-0 px-2.5"
                >
                  <div className="group relative rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl border border-white/[0.15] hover:border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_12px_40px_rgba(0,0,0,0.3)]">
                    {/* Glass highlight */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none" />

                    <div className="relative mx-auto mb-4 w-24 h-24">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="relative z-10 w-24 h-24 rounded-full object-cover object-top border-2 border-white/30 group-hover:border-white/60 transition-all"
                        unoptimized
                      />
                    </div>
                    <h3 className="font-display font-semibold text-white text-sm leading-snug mb-1">
                      {member.name}
                    </h3>
                    <p className="text-white/60 text-xs mb-2">{member.role}</p>
                    <span className="inline-block bg-white/15 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {member.experience}
                    </span>
                    <div className="mt-3 flex items-center justify-center gap-1 text-white/40 group-hover:text-white transition-colors text-xs">
                      Xem hồ sơ <ExternalLink size={10} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
