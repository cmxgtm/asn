"use client";
import { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Stamp,
  Copy,
  Scale,
  Clock,
  ArrowRight,
  Users,
  KeyRound,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Mua bán, tặng cho tài sản",
    description:
      "Công chứng hợp đồng mua bán, tặng cho tài sản; hợp đồng chuyển nhượng; hợp đồng mua bán bất động sản và động sản có giá trị.",
    href: "#",
  },
  {
    icon: Scale,
    title: "Thế chấp, cầm cố tài sản",
    description:
      "Công chứng hợp đồng thế chấp, cầm cố tài sản đảm bảo nghĩa vụ tại các tổ chức tín dụng, ngân hàng và cá nhân.",
    href: "#",
  },
  {
    icon: Copy,
    title: "Phân chia di sản thừa kế",
    description:
      "Công chứng văn bản thỏa thuận phân chia di sản, khai nhận di sản thừa kế theo di chúc hoặc theo pháp luật.",
    href: "#",
  },
  {
    icon: Users,
    title: "Thuê và cho thuê tài sản",
    description:
      "Công chứng hợp đồng thuê, cho thuê nhà ở, mặt bằng kinh doanh, phương tiện và các loại tài sản khác.",
    href: "#",
  },
  {
    icon: KeyRound,
    title: "Ủy quyền",
    description:
      "Công chứng hợp đồng ủy quyền quản lý, sử dụng, định đoạt tài sản và thực hiện các giao dịch dân sự khác.",
    href: "#",
  },
  {
    icon: Stamp,
    title: "Chứng thực chữ ký & bản sao",
    description:
      "Chứng thực chữ ký, chứng thực chữ ký người dịch, chứng thực bản sao từ bản chính theo quy định pháp luật.",
    href: "#",
  },
  {
    icon: Clock,
    title: "Các loại giao dịch khác",
    description:
      "Lưu giữ di chúc, niêm yết danh sách thừa kế, hợp đồng góp vốn, văn bản thỏa thuận tài sản vợ chồng và nhiều dịch vụ pháp lý khác.",
    href: "#",
  },
];

export default function ServicesSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const totalSlides = services.length;
  const visibleCards = 3;
  const maxIndex = totalSlides - visibleCards;

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
    <section id="dich-vu" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left sidebar - 30% */}
          <div className="lg:w-[30%] flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-700 section-heading mb-6 whitespace-nowrap">
                Các dịch vụ công chứng
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                ASN cung cấp đầy đủ các dịch vụ công chứng, chứng thực theo quy
                định pháp luật với quy trình chuyên nghiệp, nhanh chóng.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="/dat-lich"
                  className="bg-gradient-to-r from-navy-500 to-navy-400 hover:from-navy-600 hover:to-navy-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  
                >
                  Đặt lịch hẹn
                </a>
              </div>
            </div>
          </div>

          {/* Right content - 70% carousel */}
          <div
            className="lg:w-[70%] relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Arrows */}
            <button
              onClick={prev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white hover:bg-navy-50 border border-gray-200 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft size={18} className="text-navy-700" />
            </button>
            <button
              onClick={next}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white hover:bg-navy-50 border border-gray-200 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight size={18} className="text-navy-700" />
            </button>

            {/* Carousel track */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${current * (100 / visibleCards)}%)`,
                }}
              >
                {services.map((svc, i) => {
                  const Icon = svc.icon;
                  return (
                    <a
                      key={svc.title}
                      href={svc.href}
                      className="w-1/3 flex-shrink-0 px-2.5"
                    >
                      <div className="group rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white border border-gray-100 hover:border-navy-100 hover:shadow-navy-100">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 bg-navy-50 group-hover:bg-navy-100">
                          <Icon size={22} className="text-navy-600" />
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-3 leading-snug text-navy-700">
                          {svc.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-600">
                          {svc.description}
                        </p>
                        <div className="mt-5 text-xs font-semibold flex items-center gap-1 text-navy-500 group-hover:text-navy-700 transition-colors">
                          Tìm hiểu thêm{" "}
                          <ArrowRight
                            size={12}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </a>
                  );
                })}
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
                      ? "w-6 h-2 bg-navy-600"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
