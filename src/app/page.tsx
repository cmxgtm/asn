import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ServicesSection from "@/components/ServicesSection";
import PartnersSection from "@/components/PartnersSection";
import TeamSection from "@/components/TeamSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";
import type { FaqItem } from "@/types";

const faqs: FaqItem[] = [
  {
    id: 1,
    question:
      "Tôi cần chuẩn bị những giấy tờ gì để công chứng hợp đồng mua bán nhà?",
    answer:
      "Bạn cần chuẩn bị: CMND/CCCD/Hộ chiếu còn hiệu lực của các bên; Hộ khẩu; Giấy tờ chứng minh tình trạng hôn nhân; Giấy chứng nhận quyền sở hữu nhà ở / quyền sử dụng đất; và dự thảo hợp đồng (nếu có). Đội ngũ tư vấn của ASN sẵn sàng hỗ trợ bạn kiểm tra đầy đủ hồ sơ.",
  },
  {
    id: 2,
    question: "Thời gian thực hiện công chứng mất bao lâu?",
    answer:
      "Thông thường, các giao dịch đơn giản như chứng thực chữ ký, bản sao được thực hiện trong ngày. Với hợp đồng phức tạp hơn như mua bán, thế chấp bất động sản, thời gian có thể từ 1–3 ngày làm việc tùy theo hồ sơ. Đặt lịch hẹn trước giúp rút ngắn thời gian chờ đợi.",
  },
  {
    id: 3,
    question: "ASN có thực hiện công chứng ngoài trụ sở không?",
    answer:
      "Có. ASN cung cấp dịch vụ công chứng tại nhà hoặc địa điểm theo yêu cầu cho khách hàng không thể đến trực tiếp văn phòng (người già, ốm đau, bận công tác...). Vui lòng liên hệ hotline 079 992 1998 để được sắp xếp.",
  },
  {
    id: 4,
    question: "Phí công chứng được tính như thế nào?",
    answer:
      "Phí công chứng được thu theo quy định của Nhà nước, tính dựa trên giá trị tài sản hoặc giá trị hợp đồng. Ngoài ra có thể phát sinh phí soạn thảo văn bản nếu khách hàng yêu cầu ASN thực hiện. Chúng tôi luôn thông báo rõ chi phí trước khi thực hiện.",
  },
  {
    id: 5,
    question: "Tôi có thể đặt lịch hẹn trực tuyến không?",
    answer:
      "Có. Bạn có thể đặt lịch hẹn trực tiếp qua website này, gọi hotline 079 992 1998 hoặc 028 39 300 903, hoặc nhắn tin qua Zalo. Chúng tôi xác nhận lịch hẹn trong vòng 30 phút trong giờ làm việc.",
  },
];

export default function HomePage() {
  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden">
      <Header />
      <HeroCarousel />
      <ServicesSection />
      <PartnersSection />
      <TeamSection />
      <NewsSection faqs={faqs} />
      <Footer />
    </main>
  );
}
