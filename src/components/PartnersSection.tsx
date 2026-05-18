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

export default function PartnersSection() {
  // Duplicate for infinite scroll
  const doubled = [...partners, ...partners];

  return (
    <section
      id="doi-tac"
      className="py-16 bg-white border-t border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-navy-500 text-sm font-semibold tracking-wider uppercase mb-2">
            Đối tác tin cậy
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-700 section-heading inline-block">
            Doanh nghiệp &amp; Đối tác
          </h2>
        </div>

        {/* Infinite scroll carousel */}
        <div className="overflow-hidden relative w-full">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            className="inline-flex gap-8 items-center"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {doubled.map((partner, i) => (
              <a
                key={`${partner.name}-${i}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 group"
              >
                <div className="w-36 h-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-3 transition-all duration-300 group-hover:border-navy-200 group-hover:shadow-lg group-hover:bg-white group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain max-h-12 grayscale group-hover:grayscale-0 transition-all duration-300"
                    unoptimized
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
