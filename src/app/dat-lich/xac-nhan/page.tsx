"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { Download, QrCode, ArrowRight, Ticket } from "lucide-react";

interface BookingData {
  id: string;
  queueNumber: number;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  createdAt: string;
}

export default function XacNhanPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("asn_booking");
    if (!data) {
      router.push("/dat-lich");
      return;
    }
    const parsed = JSON.parse(data) as BookingData;
    setBooking(parsed);

    // Generate QR code
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const checkinUrl = `${window.location.origin}${basePath}/dat-lich/check-in?id=${parsed.id}`;
    QRCode.toDataURL(checkinUrl, {
      width: 200,
      margin: 2,
      color: { dark: "#0f2040", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [router]);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(ticketRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const link = document.createElement("a");
    link.download = `phieu-hen-${booking?.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-navy-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Success Message */}
        <div className="text-center mb-6 animate-fade-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-navy-800">
            Đặt lịch thành công!
          </h1>
          <p className="text-gray-500 mt-1">Phiếu hẹn của bạn đã được tạo</p>
        </div>

        {/* Ticket Card */}
        <div
          ref={ticketRef}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-navy-700 to-navy-900 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-navy-200 text-xs uppercase tracking-wider">
                  Văn phòng Công chứng
                </p>
                <h2 className="font-bold text-lg">CHÂU Á (ASN)</h2>
              </div>
              <Ticket size={28} className="text-navy-200" />
            </div>
          </div>

          {/* Queue Number */}
          <div className="text-center py-5 border-b border-dashed border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Số thứ tự
            </p>
            <p className="text-5xl font-bold text-navy-800 mt-1">
              {String(booking.queueNumber).padStart(3, "0")}
            </p>
          </div>

          {/* Info Grid */}
          <div className="px-6 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase">Mã phiếu</span>
              <span className="font-mono font-bold text-navy-800 text-sm">
                {booking.id}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase">Họ tên</span>
              <span className="font-semibold text-navy-800 text-sm">
                {booking.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase">Dịch vụ</span>
              <span className="text-sm text-navy-700">{booking.service}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase">Ngày hẹn</span>
              <span className="font-semibold text-navy-800 text-sm">
                {booking.date}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase">Giờ hẹn</span>
              <span className="font-semibold text-navy-800 text-sm">
                {booking.time}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase">Đặt lúc</span>
              <span className="text-xs text-gray-500">
                {new Date(booking.createdAt).toLocaleString("vi-VN")}
              </span>
            </div>
          </div>

          {/* Tear line */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-to-br from-green-50 via-white to-navy-50 rounded-r-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-gradient-to-br from-green-50 via-white to-navy-50 rounded-l-full" />
            <div className="border-t-2 border-dashed border-gray-200 mx-4" />
          </div>

          {/* QR Code & Barcode */}
          <div className="px-6 py-5 text-center">
            <p className="text-xs text-gray-400 mb-3">
              Quét mã QR để check-in khi đến
            </p>
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="mx-auto w-40 h-40"
              />
            )}
            {/* Barcode simulation using CSS */}
            <div className="mt-4 flex justify-center">
              <svg className="w-48 h-12" viewBox="0 0 200 50">
                {booking.id.split("").map((char, i) => {
                  const w = (char.charCodeAt(0) % 3) + 1;
                  const x = i * 8 + i * 2;
                  return (
                    <rect
                      key={i}
                      x={x}
                      y="0"
                      width={w}
                      height="40"
                      fill="#0f2040"
                    />
                  );
                })}
                <text
                  x="100"
                  y="48"
                  textAnchor="middle"
                  fontSize="8"
                  fill="#666"
                >
                  {booking.id}
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleDownload}
            className="w-full bg-navy-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-navy-700 transition shadow-lg"
          >
            <Download size={18} /> Tải phiếu hẹn
          </button>

          <button
            onClick={() => router.push("/dat-lich/check-in?id=" + booking.id)}
            className="w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-lg"
          >
            <QrCode size={18} /> Mô phỏng Check-in (Demo)
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full border-2 border-gray-200 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
