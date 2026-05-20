"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const SERVICES = [
  {
    id: "hop-dong-giao-dich",
    label: "Công chứng hợp đồng giao dịch",
    icon: "📄",
    duration: "30 phút",
  },
  {
    id: "ban-dich",
    label: "Công chứng bản dịch",
    icon: "🌐",
    duration: "20 phút",
  },
  {
    id: "chung-thuc-chu-ky",
    label: "Chứng thực chữ ký",
    icon: "✍️",
    duration: "15 phút",
  },
  {
    id: "chung-thuc-ban-sao",
    label: "Chứng thực bản sao",
    icon: "📋",
    duration: "15 phút",
  },
  { id: "tu-van", label: "Tư vấn pháp luật", icon: "⚖️", duration: "45 phút" },
  { id: "khac", label: "Dịch vụ khác", icon: "📌", duration: "30 phút" },
];

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

function generateDates() {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) {
      dates.push(d);
    }
  }
  return dates;
}

export default function DatLichPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const dates = generateDates();

  const handleConfirm = () => {
    const appointmentId = `ASN-${Date.now().toString(36).toUpperCase()}`;
    const queueNumber = Math.floor(Math.random() * 50) + 1;

    const bookingData = {
      id: appointmentId,
      queueNumber,
      name,
      phone,
      service: SERVICES.find((s) => s.id === service)?.label || service,
      date: selectedDate?.toLocaleDateString("vi-VN"),
      time: selectedTime,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("asn_booking", JSON.stringify(bookingData));
    router.push("/dat-lich/xac-nhan");
  };

  const formatDate = (d: Date) => {
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return {
      dayName: days[d.getDay()],
      dayNum: d.getDate(),
      month: d.getMonth() + 1,
    };
  };

  const getSlotStatus = (time: string) => {
    const hash = time.charCodeAt(0) + time.charCodeAt(3);
    if (hash % 7 === 0) return "full";
    if (hash % 3 === 0) return "few";
    return "available";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-navy-100 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="text-navy-600 hover:text-navy-800 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-display font-bold text-navy-800 text-lg">
              Đặt lịch hẹn
            </h1>
            <p className="text-gray-500 text-xs">Bước {step} / 3</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${s === step ? "w-8 bg-navy-600" : s < step ? "w-8 bg-green-400" : "w-2 bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-navy-800 mb-2">
              Chọn dịch vụ
            </h2>
            <p className="text-gray-500 mb-6">
              Vui lòng chọn loại dịch vụ bạn cần
            </p>

            <div className="grid gap-3">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setService(s.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    service === s.id
                      ? "border-navy-600 bg-navy-50 shadow-md"
                      : "border-gray-100 bg-white hover:border-navy-200 hover:shadow-sm"
                  }`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-800">{s.label}</p>
                    <p className="text-xs text-gray-400">
                      Thời gian: ~{s.duration}
                    </p>
                  </div>
                  {service === s.id && (
                    <CheckCircle size={20} className="text-navy-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Họ và tên *
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Số điện thoại *
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="0xx xxx xxxx"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 transition"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!service || !name || !phone}
              className="mt-6 w-full bg-navy-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-navy-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Tiếp tục <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: Select Date */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-navy-800 mb-2">Chọn ngày</h2>
            <p className="text-gray-500 mb-6">Chọn ngày bạn muốn đến</p>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {dates.map((d, i) => {
                const { dayName, dayNum, month } = formatDate(d);
                const isSelected =
                  selectedDate?.toDateString() === d.toDateString();
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(d)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                      isSelected
                        ? "border-navy-600 bg-navy-600 text-white shadow-lg scale-105"
                        : "border-gray-100 bg-white hover:border-navy-200"
                    }`}
                  >
                    <p
                      className={`text-xs ${isSelected ? "text-navy-100" : "text-gray-400"}`}
                    >
                      {dayName}
                    </p>
                    <p
                      className={`text-lg font-bold ${isSelected ? "text-white" : "text-navy-800"}`}
                    >
                      {dayNum}
                    </p>
                    <p
                      className={`text-xs ${isSelected ? "text-navy-100" : "text-gray-400"}`}
                    >
                      T{month}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-gray-200 py-3.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                <ArrowLeft size={18} className="inline mr-1" /> Quay lại
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate}
                className="flex-1 bg-navy-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-navy-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Tiếp tục <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Select Time */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="text-2xl font-bold text-navy-800 mb-2">Chọn giờ</h2>
            <p className="text-gray-500 mb-6">
              Ngày {selectedDate?.toLocaleDateString("vi-VN")} – Chọn khung giờ
              phù hợp
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {TIME_SLOTS.map((time) => {
                const status = getSlotStatus(time);
                const isSelected = selectedTime === time;
                const isFull = status === "full";
                return (
                  <button
                    key={time}
                    onClick={() => !isFull && setSelectedTime(time)}
                    disabled={isFull}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center relative ${
                      isSelected
                        ? "border-navy-600 bg-navy-600 text-white shadow-lg scale-105"
                        : isFull
                          ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "border-gray-100 bg-white hover:border-navy-200"
                    }`}
                  >
                    <Clock
                      size={14}
                      className={`inline mr-1 ${isSelected ? "text-white" : isFull ? "text-gray-300" : "text-navy-400"}`}
                    />
                    <span className="font-semibold text-sm">{time}</span>
                    {status === "few" && !isSelected && (
                      <p className="text-[10px] text-orange-500 mt-0.5">
                        Còn ít chỗ
                      </p>
                    )}
                    {isFull && (
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Hết chỗ
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Summary */}
            {selectedTime && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <h3 className="font-semibold text-green-800 mb-2">
                  📋 Xác nhận thông tin
                </h3>
                <div className="text-sm text-green-700 space-y-1">
                  <p>
                    <span className="font-medium">Họ tên:</span> {name}
                  </p>
                  <p>
                    <span className="font-medium">Dịch vụ:</span>{" "}
                    {SERVICES.find((s) => s.id === service)?.label}
                  </p>
                  <p>
                    <span className="font-medium">Ngày:</span>{" "}
                    {selectedDate?.toLocaleDateString("vi-VN")}
                  </p>
                  <p>
                    <span className="font-medium">Giờ:</span> {selectedTime}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-gray-200 py-3.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                <ArrowLeft size={18} className="inline mr-1" /> Quay lại
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedTime}
                className="flex-1 bg-green-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircle size={18} /> Xác nhận đặt lịch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
