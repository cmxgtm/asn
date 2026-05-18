"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

export default function DatLichPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Static site: open phone/Zalo instead of calling backend
    const message = `Đặt lịch: ${name}, SĐT: ${phone}, Dịch vụ: ${service || "Chưa chọn"}, Ngày: ${date || "Chưa chọn"}`;
    window.open(
      `https://zalo.me/0799921998?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setSubmitting(false);
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
        onClick={() => router.push("/")}
      />

      {/* Form card */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl p-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-navy-600 rounded-xl flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-navy-800 text-xl">
              Đặt lịch hẹn
            </h1>
            <p className="text-gray-500 text-sm">Xác nhận trong vòng 30 phút</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Họ và tên *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nguyễn Văn A"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Số điện thoại *
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="tel"
              placeholder="0xx xxx xxxx"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Dịch vụ cần công chứng
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300 transition appearance-none"
            >
              <option value="">Chọn dịch vụ...</option>
              <option value="hop-dong-giao-dich">
                Công chứng hợp đồng giao dịch
              </option>
              <option value="ban-dich">Công chứng bản dịch</option>
              <option value="chung-thuc-chu-ky">Chứng thực chữ ký</option>
              <option value="chung-thuc-ban-sao">Chứng thực bản sao</option>
              <option value="tu-van">Tư vấn pháp luật</option>
              <option value="khac">Khác</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Ngày hẹn mong muốn
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-300 transition"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navy-600 hover:bg-navy-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? (
              "Đang xử lý..."
            ) : (
              <>
                <Calendar size={15} /> Xác nhận đặt lịch
              </>
            )}
          </button>
          <p className="text-gray-400 text-xs text-center">
            Hoặc gọi ngay:{" "}
            <a
              href="tel:0799921998"
              className="text-navy-600 font-semibold hover:underline"
            >
              079 992 1998
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
