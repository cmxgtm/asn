import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="lien-he" className="bg-[#071529] text-white">
      {/* Map + info bar */}
      <div className="grid lg:grid-cols-2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.435907224764!2d106.68917891474415!3d10.777887662114006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a64061603%3A0xe1516a2d2af40d2a!2zVsSDbiBwaMOybmcgQ8O0bmcgQ2jhu6luZyBDaMOidSDDgQ!5e0!3m2!1svi!2s!4v1548733640966"
          className="w-full h-full min-h-[16rem]"
          loading="lazy"
          title="ASN Map"
        />
        <div className="bg-[#0B1F3D] px-8 py-10 flex flex-col justify-center">
          <h3 className="font-display text-lg font-bold text-white mb-6 tracking-tight">
            Thông tin liên hệ
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <MapPin
                size={15}
                className="text-white/40 flex-shrink-0 mt-0.5"
              />
              <div className="text-white/60">
                <p>44 Võ Văn Tần, Phường Xuân Hòa, TP.HCM</p>
                <p className="text-white/50 text-xs mt-0.5">
                  (Địa chỉ cũ: Phường Võ Thị Sáu, Quận 3, TP.HCM)
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone size={16} className="text-white flex-shrink-0" />
              <div>
                <a
                  href="tel:02839300903"
                  className="text-white/60 hover:text-accent-400 transition-colors block"
                >
                  (028) 39 300 903
                </a>
                <span className="text-white/60 block">
                  Fax: (028) 39 300 908
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={15} className="text-white/40 flex-shrink-0" />
              <a
                href="mailto:info@asn.vn"
                className="text-white/60 hover:text-accent-400 transition-colors"
              >
                info@asn.vn
              </a>
            </div>
            <div className="flex gap-3">
              <Clock size={15} className="text-white/40 flex-shrink-0" />
              <span className="text-white/60">
                Thứ hai – Thứ sáu: 08:00 đến 12:00 – 13:00 đến 17:00
                &nbsp;|&nbsp; Thứ bảy: 08:00 đến 12:00
              </span>
            </div>
          </div>
          <div className="flex gap-2.5 mt-6">
            <a
              href="#"
              className="w-8 h-8 bg-white/[0.06] hover:bg-white/[0.12] rounded-lg flex items-center justify-center transition-colors"
            >
              <Facebook size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-white/[0.06] hover:bg-white/[0.12] rounded-lg flex items-center justify-center transition-colors"
            >
              <Youtube size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 bg-white/[0.06] hover:bg-white/[0.12] rounded-lg flex items-center justify-center transition-colors"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <Image
            src="https://congchungchaua.vn/wp-content/themes/asn/asset/images/logo.png"
            alt="ASN"
            width={140}
            height={60}
            className="h-12 w-auto object-contain mb-4"
            unoptimized
          />
          <p className="text-white/60 text-xs leading-relaxed">
            Văn phòng Công Chứng Châu Á – đơn vị công chứng uy tín hàng đầu tại
            TP.HCM với hơn 20 năm kinh nghiệm phục vụ người dân và doanh nghiệp.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm">Dịch vụ</h4>
          <ul className="space-y-2 text-xs text-white/60">
            {[
              "Công chứng hợp đồng giao dịch",
              "Công chứng bản dịch",
              "Chứng thực chữ ký",
              "Chứng thực bản sao",
              "Tư vấn pháp luật",
            ].map((s) => (
              <li key={s}>
                <a
                  href="#dich-vu"
                  className="hover:text-accent-400 transition-colors"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm">Hỗ trợ</h4>
          <ul className="space-y-2 text-xs text-white/60">
            {[
              "Quy trình công chứng",
              "Thủ tục công chứng",
              "Mục hỏi đáp",
              "Văn bản pháp luật",
              "Đặt lịch hẹn",
            ].map((s) => (
              <li key={s}>
                <a href="#" className="hover:text-accent-400 transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm">Về ASN</h4>
          <ul className="space-y-2 text-xs text-white/60">
            {[
              "Giới thiệu văn phòng",
              "Công chứng viên",
              "Đối tác ngân hàng",
              "Tin tức",
              "Tuyển dụng",
            ].map((s) => (
              <li key={s}>
                <a href="#" className="hover:text-accent-400 transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>
            © 2024 – 2026 ASN – Văn phòng Công Chứng Châu Á. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>

      {/* Floating Zalo button */}
      <a
        href="https://zalo.me/0799921998"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 transition-all hover:scale-110 group"
        title="Chat Zalo"
      >
        <span className="text-white font-bold text-xs">Zalo</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
          1
        </span>
      </a>
    </footer>
  );
}
