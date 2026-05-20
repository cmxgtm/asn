"use client";
import { useState } from "react";
import { ChevronDown, Send, Calendar, CheckCircle } from "lucide-react";
import type { FaqItem } from "@/types";

interface Props {
  faqs: FaqItem[];
}

export default function FaqAppointmentSection({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [apptName, setApptName] = useState("");
  const [apptPhone, setApptPhone] = useState("");
  const [apptService, setApptService] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [apptSubmitting, setApptSubmitting] = useState(false);
  const [apptDone, setApptDone] = useState<string | null>(null);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiBase =
        typeof window !== "undefined"
          ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
          : "http://localhost:4000";
      await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, question }),
      });
      setSubmitted(true);
      setQuestion("");
      setName("");
      setEmail("");
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleApptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApptSubmitting(true);
    try {
      const apiBase =
        typeof window !== "undefined"
          ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
          : "http://localhost:4000";
      const res = await fetch(`${apiBase}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: apptName,
          phone: apptPhone,
          service: apptService,
          date: apptDate,
        }),
      });
      const data = (await res.json()) as { appointmentId?: string };
      setApptDone(data.appointmentId || "ASN-OK");
      setApptName("");
      setApptPhone("");
      setApptService("");
      setApptDate("");
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setApptSubmitting(false);
    }
  };

  return (
    <section id="dat-lich" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: FAQ */}
          <div>
            <p className="text-navy-500 text-sm font-semibold tracking-wider uppercase mb-2">
              Giải đáp thắc mắc
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-700 section-heading mb-8">
              Câu hỏi thường gặp
            </h2>
            <div className="space-y-3 mb-8">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.id}
                  className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpen(open === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-navy-50 transition-colors"
                  >
                    <span className="font-semibold text-navy-700 text-sm leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-navy-400 flex-shrink-0 transition-transform duration-300 ${open === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`faq-answer ${open === idx ? "open" : ""} px-5 ${open === idx ? "pb-4" : ""}`}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ask a question */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display font-semibold text-navy-700 text-lg mb-4 flex items-center gap-2">
                <Send size={18} className="text-navy-500" /> Gửi câu hỏi của bạn
              </h3>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <p className="text-navy-700 font-semibold">
                    Câu hỏi đã được ghi nhận!
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Chúng tôi sẽ phản hồi trong vòng 24 giờ.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-navy-600 text-sm hover:underline"
                  >
                    Gửi câu hỏi khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuestionSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Họ và tên"
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email"
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300"
                    />
                  </div>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Nhập câu hỏi của bạn ở đây..."
                    rows={4}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-navy-600 hover:bg-navy-700 text-white py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting ? (
                      "Đang gửi..."
                    ) : (
                      <>
                        <Send size={14} /> Gửi câu hỏi
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Appointment booking */}
          <div id="nop-ho-so">
            <p className="text-navy-500 text-sm font-semibold tracking-wider uppercase mb-2">
              Nhanh – Gọn – Tiện lợi
            </p>
            <h2 className="font-display text-3xl font-bold text-navy-700 section-heading mb-8">
              Đặt lịch hẹn
            </h2>

            <div className="bg-navy-gradient rounded-2xl p-7 text-white">
              {apptDone ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-accent-400" />
                  </div>
                  <p className="font-display font-bold text-xl mb-2">
                    Đặt lịch thành công!
                  </p>
                  <p className="text-white/75 text-sm mb-1">
                    Mã lịch hẹn của bạn:
                  </p>
                  <p
                    className="font-bold tracking-wider text-accent-400 text-2xl mb-4"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {apptDone}
                  </p>
                  <p className="text-white/70 text-sm">
                    Chúng tôi sẽ xác nhận trong vòng 30 phút.
                  </p>
                  <button
                    onClick={() => setApptDone(null)}
                    className="mt-5 text-accent-400 text-sm hover:underline"
                  >
                    Đặt lịch khác
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar size={20} className="text-white" />
                    <p className="text-white/90 text-sm">
                      Điền thông tin để đặt lịch – xác nhận trong 30 phút
                    </p>
                  </div>
                  <form onSubmit={handleApptSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Họ và tên *
                      </label>
                      <input
                        value={apptName}
                        onChange={(e) => setApptName(e.target.value)}
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Số điện thoại *
                      </label>
                      <input
                        value={apptPhone}
                        onChange={(e) => setApptPhone(e.target.value)}
                        required
                        type="tel"
                        placeholder="0xx xxx xxxx"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400/50 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Dịch vụ cần công chứng
                      </label>
                      <select
                        value={apptService}
                        onChange={(e) => setApptService(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition appearance-none"
                      >
                        <option value="" className="text-navy-900">
                          Chọn dịch vụ...
                        </option>
                        <option
                          value="hop-dong-giao-dich"
                          className="text-navy-900"
                        >
                          Công chứng hợp đồng giao dịch
                        </option>
                        <option value="ban-dich" className="text-navy-900">
                          Công chứng bản dịch
                        </option>
                        <option
                          value="chung-thuc-chu-ky"
                          className="text-navy-900"
                        >
                          Chứng thực chữ ký
                        </option>
                        <option
                          value="chung-thuc-ban-sao"
                          className="text-navy-900"
                        >
                          Chứng thực bản sao
                        </option>
                        <option value="tu-van" className="text-navy-900">
                          Tư vấn pháp luật
                        </option>
                        <option value="khac" className="text-navy-900">
                          Khác
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-white/80 mb-1.5">
                        Ngày hẹn mong muốn
                      </label>
                      <input
                        value={apptDate}
                        onChange={(e) => setApptDate(e.target.value)}
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={apptSubmitting}
                      className="w-full bg-gradient-to-r from-navy-500 to-navy-400 hover:from-navy-600 hover:to-navy-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg"
                    >
                      {apptSubmitting ? (
                        "Đang xử lý..."
                      ) : (
                        <>
                          <Calendar size={15} /> Xác nhận đặt lịch
                        </>
                      )}
                    </button>
                    <p className="text-white/50 text-xs text-center">
                      Hoặc gọi ngay:{" "}
                      <a
                        href="tel:0799921998"
                        className="text-accent-400 font-semibold"
                      >
                        079 992 1998
                      </a>
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Working hours card */}
            <div className="mt-5 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h4 className="font-semibold text-navy-700 mb-3 text-sm">
                Giờ làm việc
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thứ hai – Thứ sáu</span>
                  <span className="font-semibold text-navy-700">
                    08:00 – 12:00 | 13:00 – 17:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thứ bảy</span>
                  <span className="font-semibold text-navy-700">
                    08:00 – 12:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chủ Nhật</span>
                  <span className="text-red-400 font-medium">Nghỉ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
