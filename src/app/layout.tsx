import type { Metadata } from "next";
import ChatbotWidget from "@/components/ChatbotWidget";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "ASN – Văn phòng Công Chứng Châu Á | Chính xác – Chuyên nghiệp – Nhanh chóng",
  description:
    "Văn phòng Công Chứng Châu Á (ASN) – Dịch vụ công chứng uy tín tại Quận 3, TP.HCM. Chính xác – Chuyên nghiệp – Nhanh chóng.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head />
      <body className="font-body antialiased bg-[#F8FAFD]">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
