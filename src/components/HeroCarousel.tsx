"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

const slides = [
  "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/513334702_1313646060192648_4302284170197593359_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8XSCKp5YPuAQ7kNvwGIl2Of&_nc_oc=AdqRd28HQTAT1-sgD8FAobaNqHjf1BHJdqFWDhH88UKEQ4IHfT1XYGYVMh44UJoGdjalH_GF7gdL54a5S-8BQzOW&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=ziMVLPB6S_HyKAzK7YhrkA&_nc_ss=7b2a8&oh=00_Af5EfFPrp_l5yZ0Hyk_oWZg1FkfI5bOih-fC2H74OOox6w&oe=6A127D30",
  "https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/572978057_1434898898067363_8735653787833248287_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=gCeW1V_mxecQ7kNvwHAaOQM&_nc_oc=Adp50089rana5x1UL36aDwIUJYDySLjoJIRA0nfwK1LafgHTWp1nFsfj8_Yv0ld-wFUNSGnew0NGwlvT8xcxbn5j&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=Mit65wLIN2misCNEc9MgPA&_nc_ss=7b2a8&oh=00_Af6hzMKm0KOOhq9r5jumR-WGFwEOQuIWYZZTLXQ60VTBNA&oe=6A12685E",
  "https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/514579814_1317431703147417_740155071713170075_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=EdaMcj4KLXAQ7kNvwE9vKnk&_nc_oc=Adoz_OFNtv6CLGpOK9fwkIHQQ8As4ObTLw4QUXn4YtjpaKmskzWq_DXjq_iMZ5ATQJc885SdxGHTVe_rEHoJRn6h&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=4xD9CRSNJt5XlNkN3yilew&_nc_ss=7b2a8&oh=00_Af6aMOCLtwLHywmaSLXQ8uK7YVzQXwDFMo_9MOMGKuFyww&oe=6A12729D",
  "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/641448661_1547195136837738_7003651082199658759_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=j08d7arOnQQQ7kNvwFRtp6s&_nc_oc=Adrwv4jagDVA7dWmu2Vn6ngb1Vx5su86ASlB_CE4vZYCsUhbLJmrvDwzwpiireAts_gNv9jtudiA6ckOS4fP7amj&_nc_zt=23&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=rWQfLmEQBBTQ-KIqqZtmNQ&_nc_ss=7b2a8&oh=00_Af6Dw9jH0OPFC5Wbrlbx0Zu4zJaTpv9Hdj4gEaklcDPM1g&oe=6A124C47",
  "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/640326279_1547195143504404_3370145539689872442_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xxpJKHWezrIQ7kNvwEKJ0kU&_nc_oc=AdqBjCXqY939aUeoWyyWnnVIKeIq0wDHdGqL6dFvTjWPhcfT1nz9138msTg0QXgBcq52QtapPSnykX8B2hT5Gkhr&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=rWQfLmEQBBTQ-KIqqZtmNQ&_nc_ss=7b2a8&oh=00_Af5wdP8RNCl2-7gHkonwN5M2oBG5OM7qVmiZ3FsvFizCug&oe=6A124B7E",
];

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
