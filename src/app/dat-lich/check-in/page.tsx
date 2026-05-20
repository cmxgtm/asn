"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  QrCode,
  CheckCircle2,
  Clock,
  Users,
  Bell,
  Loader2,
  ArrowLeft,
  Sparkles,
  ClipboardList,
  Settings,
  Search,
  PartyPopper,
} from "lucide-react";

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

const STEP_ICONS = [CheckCircle2, ClipboardList, Settings, Search, Sparkles];

const PROGRESS_STEPS = [
  {
    id: 1,
    label: "Đã check-in",
    description: "Xác nhận có mặt tại văn phòng",
  },
  {
    id: 2,
    label: "Đang tiếp nhận",
    description: "Nhân viên đang tiếp nhận hồ sơ",
  },
  {
    id: 3,
    label: "Đang xử lý",
    description: "Hồ sơ đang được xử lý",
  },
  {
    id: 4,
    label: "Chờ phê duyệt",
    description: "Công chứng viên đang xem xét",
  },
  { id: 5, label: "Hoàn tất", description: "Hồ sơ đã hoàn thành" },
];

function CheckInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [phase, setPhase] = useState<"scan" | "scanning" | "progress">("scan");
  const [currentStep, setCurrentStep] = useState(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [queueAhead, setQueueAhead] = useState(0);
  const [estimatedWait, setEstimatedWait] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("asn_booking");
    if (!data) {
      router.push("/dat-lich");
      return;
    }
    setBooking(JSON.parse(data));
    setQueueAhead(Math.floor(Math.random() * 5) + 1);
    setEstimatedWait(Math.floor(Math.random() * 10) + 5);
  }, [router]);

  const addNotification = useCallback((msg: string) => {
    setNotifications((prev) => [msg, ...prev].slice(0, 5));
  }, []);

  const startCheckin = () => {
    setPhase("scanning");
    // Simulate QR scanning delay
    setTimeout(() => {
      setPhase("progress");
      setCurrentStep(1);
      addNotification("Check-in thành công! Vui lòng chờ gọi số.");
      startProgressSimulation();
    }, 2000);
  };

  const startProgressSimulation = () => {
    const delays = [5000, 8000, 10000, 7000]; // ms between each step
    let step = 1;

    const advance = () => {
      if (step >= 5) return;
      step++;
      setCurrentStep(step);
      setQueueAhead((prev) => Math.max(0, prev - 1));
      setEstimatedWait((prev) =>
        Math.max(0, prev - Math.floor(Math.random() * 3) - 1),
      );

      const messages = [
        "",
        "Số của bạn đang được gọi. Vui lòng đến quầy.",
        "Nhân viên đang xử lý hồ sơ của bạn.",
        "Hồ sơ đang chờ công chứng viên phê duyệt.",
        "Hoàn tất! Vui lòng nhận hồ sơ tại quầy.",
      ];
      if (messages[step - 1]) {
        addNotification(messages[step - 1]);
      }

      if (step < 5) {
        setTimeout(advance, delays[step - 1] || 6000);
      }
    };

    setTimeout(advance, delays[0]);
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-navy-100 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => router.push("/dat-lich/xac-nhan")}
            className="text-navy-600 hover:text-navy-800"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-display font-bold text-navy-800 text-lg">
              {phase === "scan" ? "Check-in" : "Theo dõi tiến trình"}
            </h1>
            <p className="text-gray-500 text-xs">Mã: {booking.id}</p>
          </div>
          {phase === "progress" && currentStep < 5 && (
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Đang xử lý
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Phase: QR Scan */}
        {phase === "scan" && (
          <div className="animate-fade-up text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="w-20 h-20 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <QrCode size={40} className="text-navy-600" />
              </div>
              <h2 className="text-xl font-bold text-navy-800 mb-2">
                Quét mã QR để check-in
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Đưa mã QR trên phiếu hẹn vào máy quét tại quầy lễ tân
              </p>

              {/* Simulated QR scanner area */}
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-xl border-2 border-dashed border-navy-200 bg-navy-50/50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-navy-400 rounded-lg" />
                </div>
                {/* Scanning line animation */}
                <div className="absolute left-4 right-4 h-0.5 bg-green-500 animate-bounce opacity-60" />
                <p className="absolute bottom-2 text-[10px] text-navy-400">
                  Khu vực quét
                </p>
              </div>

              <button
                onClick={startCheckin}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-lg hover:shadow-xl"
              >
                <Sparkles size={20} /> Quét mã QR Check-in
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Đưa mã QR vào khung hình để check-in
              </p>
            </div>

            {/* Info card */}
            <div className="mt-4 bg-white rounded-xl p-4 border border-gray-100 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Users size={16} className="text-navy-400" />
                <span className="text-gray-600">
                  Số người đang chờ trước bạn:
                </span>
                <span className="font-bold text-navy-800">{queueAhead}</span>
              </div>
              <div className="flex items-center gap-3 text-sm mt-2">
                <Clock size={16} className="text-navy-400" />
                <span className="text-gray-600">Thời gian chờ ước tính:</span>
                <span className="font-bold text-navy-800">
                  ~{estimatedWait} phút
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Phase: Scanning animation */}
        {phase === "scanning" && (
          <div className="animate-fade-up text-center py-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <QrCode size={48} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-navy-800 mb-2">
              Đang quét mã QR...
            </h2>
            <p className="text-gray-500">Vui lòng giữ yên</p>
            <Loader2 className="w-6 h-6 animate-spin text-navy-400 mx-auto mt-4" />
          </div>
        )}

        {/* Phase: Progress Tracking */}
        {phase === "progress" && (
          <div className="animate-fade-up">
            {/* Queue Status Banner */}
            <div
              className={`rounded-xl p-4 mb-6 ${
                currentStep >= 5
                  ? "bg-green-50 border border-green-200"
                  : "bg-navy-50 border border-navy-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Số thứ tự của bạn
                  </p>
                  <p className="text-3xl font-bold text-navy-800">
                    {String(booking.queueNumber).padStart(3, "0")}
                  </p>
                </div>
                <div className="text-right">
                  {currentStep < 5 ? (
                    <>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users size={14} /> {queueAhead} người trước bạn
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Clock size={14} /> ~{estimatedWait} phút chờ
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <CheckCircle2 size={16} /> Hoàn tất
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-navy-800 mb-6">Tiến trình xử lý</h3>

              <div className="relative">
                {PROGRESS_STEPS.map((stepItem, index) => {
                  const isCompleted = currentStep > stepItem.id;
                  const isCurrent = currentStep === stepItem.id;
                  const isPending = currentStep < stepItem.id;

                  return (
                    <div
                      key={stepItem.id}
                      className="flex gap-4 mb-0 last:mb-0"
                    >
                      {/* Timeline line & dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                            isCompleted
                              ? "bg-green-500 border-green-500 text-white scale-100"
                              : isCurrent
                                ? "bg-navy-600 border-navy-600 text-white scale-110 shadow-lg shadow-navy-600/30"
                                : "bg-gray-50 border-gray-200 text-gray-300"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={18} />
                          ) : isCurrent ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <span className="text-sm">
                              {(() => {
                                const Icon = STEP_ICONS[index];
                                return <Icon size={16} />;
                              })()}
                            </span>
                          )}
                        </div>
                        {index < PROGRESS_STEPS.length - 1 && (
                          <div className="w-0.5 h-12 relative">
                            <div className="absolute inset-0 bg-gray-200 rounded-full" />
                            <div
                              className={`absolute top-0 left-0 w-full rounded-full transition-all duration-1000 ease-out ${
                                isCompleted
                                  ? "h-full bg-green-500"
                                  : "h-0 bg-navy-600"
                              }`}
                            />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div
                        className={`pb-8 pt-1.5 transition-all duration-500 ${isCurrent ? "opacity-100" : isPending ? "opacity-40" : "opacity-70"}`}
                      >
                        <p
                          className={`font-semibold text-sm ${
                            isCurrent
                              ? "text-navy-800"
                              : isCompleted
                                ? "text-green-700"
                                : "text-gray-400"
                          }`}
                        >
                          {stepItem.label}
                          {isCurrent && (
                            <span className="ml-2 inline-flex items-center gap-1 text-xs bg-navy-100 text-navy-600 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 bg-navy-600 rounded-full animate-pulse" />
                              Đang thực hiện
                            </span>
                          )}
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${isCurrent ? "text-gray-500" : "text-gray-300"}`}
                        >
                          {stepItem.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notifications */}
            {notifications.length > 0 && (
              <div className="mt-4 bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-50 flex items-center gap-2">
                  <Bell size={14} className="text-navy-600" />
                  <span className="text-sm font-semibold text-navy-800">
                    Thông báo
                  </span>
                </div>
                <div className="divide-y divide-gray-50">
                  {notifications.map((n, i) => (
                    <div
                      key={i}
                      className={`px-4 py-3 text-sm text-gray-600 ${i === 0 ? "bg-blue-50/50 animate-fade-up" : ""}`}
                    >
                      <span className="text-xs text-gray-400 mr-2">
                        {new Date().toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completion */}
            {currentStep >= 5 && (
              <div className="mt-6 text-center animate-fade-up">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 size={28} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-green-800">
                    Hoàn tất!
                  </h3>
                  <p className="text-green-600 text-sm mt-1">
                    Vui lòng đến quầy để nhận hồ sơ công chứng của bạn.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/")}
                  className="mt-4 w-full bg-navy-600 text-white py-3 rounded-xl font-semibold hover:bg-navy-700 transition"
                >
                  Về trang chủ
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-navy-600" />
        </div>
      }
    >
      <CheckInContent />
    </Suspense>
  );
}
