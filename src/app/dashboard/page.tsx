"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  TrendingUp,
  Bell,
  Archive,
  PenLine,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { readMockSession, type MockAuthSession } from "@/lib/mock-auth";

const MOCK_APPOINTMENTS = [
  {
    id: "ASN-M1X8K",
    service: "Công chứng hợp đồng giao dịch",
    date: "22/05/2026",
    time: "09:00",
    status: "confirmed" as const,
    queue: 5,
  },
  {
    id: "ASN-P3R2Y",
    service: "Chứng thực bản sao",
    date: "28/05/2026",
    time: "14:00",
    status: "pending" as const,
    queue: 12,
  },
];

const MOCK_HOSO = [
  {
    id: "HS-001",
    title: "Hợp đồng mua bán nhà đất",
    type: "Công chứng",
    date: "10/05/2026",
    status: "completed" as const,
  },
  {
    id: "HS-002",
    title: "Giấy ủy quyền",
    type: "Chứng thực",
    date: "15/05/2026",
    status: "processing" as const,
    progress: 65,
  },
  {
    id: "HS-003",
    title: "Bản dịch hộ chiếu",
    type: "Công chứng bản dịch",
    date: "18/05/2026",
    status: "pending" as const,
  },
];

const STATUS_MAP = {
  confirmed: {
    label: "Đã xác nhận",
    color: "text-green-600 bg-green-50",
    icon: CheckCircle,
  },
  pending: {
    label: "Chờ xác nhận",
    color: "text-amber-600 bg-amber-50",
    icon: Clock,
  },
  completed: {
    label: "Hoàn thành",
    color: "text-green-600 bg-green-50",
    icon: CheckCircle,
  },
  processing: {
    label: "Đang xử lý",
    color: "text-blue-600 bg-blue-50",
    icon: Loader2,
  },
};

const QUICK_ACTIONS = [
  {
    label: "Đặt lịch hẹn",
    href: "/dat-lich",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    label: "Hồ sơ của tôi",
    href: "/ho-so",
    icon: Archive,
    color: "bg-purple-500",
  },
  {
    label: "Khiếu nại",
    href: "#",
    icon: AlertCircle,
    color: "bg-red-500",
  },
  {
    label: "Chữ ký số",
    href: "/ho-so?tab=chu-ky",
    icon: PenLine,
    color: "bg-emerald-500",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<MockAuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = readMockSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setUser(session);
    setLoading(false);
  }, [router]);

  if (loading || !user) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-navy-400" size={32} />
        </main>
      </>
    );
  }

  const citizen = user.citizen;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F4F7FB]">
        {/* Welcome banner */}
        <div
          className="text-white py-10 px-4 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0F2847 0%, #1A4B8C 50%, #2D7DD2 100%)",
          }}
        >
          <div className="absolute inset-0 grain" />
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/[0.12] backdrop-blur rounded-lg flex items-center justify-center text-2xl font-display font-bold">
                {citizen.name[0]}
              </div>
              <div>
                <h1 className="text-xl font-display font-bold tracking-tight">
                  Xin chào, {citizen.name}
                </h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <Shield size={14} className="text-accent-400" />
                  <span className="text-sm text-white/60">
                    Xác thực {user.verifiedLevel} · CCCD: {citizen.cccd}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/dat-lich"
                className="bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur px-4 py-2 rounded-lg text-[13px] font-medium transition-all flex items-center gap-2 border border-white/[0.06]"
              >
                <Calendar size={15} /> Đặt lịch hẹn
              </Link>
              <Link
                href="/ho-so"
                className="bg-white text-navy-800 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-2 hover:bg-white/95 shadow-lg shadow-navy-900/10"
              >
                <Archive size={15} /> Hồ sơ
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="bg-white rounded-xl p-5 shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div
                  className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}
                >
                  <action.icon size={20} className="text-white" />
                </div>
                <p className="font-semibold text-navy-800 text-sm group-hover:text-navy-600 transition-colors">
                  {action.label}
                </p>
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Citizen Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-navy-50 flex items-center justify-between">
                  <h2 className="font-bold text-navy-800 flex items-center gap-2 text-sm">
                    <User size={15} className="text-navy-400" /> Thông tin cá
                    nhân
                  </h2>
                  <span className="text-[11px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                    Đã xác thực
                  </span>
                </div>
                <div className="px-5 py-4 space-y-4 text-sm">
                  <InfoRow
                    icon={CreditCard}
                    label="CCCD"
                    value={citizen.cccd}
                  />
                  <InfoRow icon={User} label="Họ và tên" value={citizen.name} />
                  <InfoRow
                    icon={Calendar}
                    label="Ngày sinh"
                    value={citizen.dob}
                  />
                  <InfoRow
                    icon={User}
                    label="Giới tính"
                    value={citizen.gender}
                  />
                  <InfoRow
                    icon={Phone}
                    label="Điện thoại"
                    value={citizen.phone}
                  />
                  <InfoRow icon={Mail} label="Email" value={citizen.email} />
                  <InfoRow
                    icon={MapPin}
                    label="Địa chỉ"
                    value={citizen.address}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 p-5">
                <h3 className="font-bold text-navy-800 flex items-center gap-2 mb-4 text-sm">
                  <TrendingUp size={15} className="text-navy-400" /> Tổng quan
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    label="Hồ sơ"
                    value="3"
                    color="text-purple-600 bg-purple-50"
                  />
                  <StatCard
                    label="Lịch hẹn"
                    value="2"
                    color="text-blue-600 bg-blue-50"
                  />
                  <StatCard
                    label="Hoàn thành"
                    value="1"
                    color="text-green-600 bg-green-50"
                  />
                  <StatCard
                    label="Đang xử lý"
                    value="1"
                    color="text-amber-600 bg-amber-50"
                  />
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              {/* Appointments */}
              <div className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-navy-50 flex items-center justify-between">
                  <h2 className="font-bold text-navy-800 flex items-center gap-2 text-sm">
                    <Calendar size={15} className="text-navy-400" /> Lịch hẹn
                    sắp tới
                  </h2>
                  <Link
                    href="/dat-lich"
                    className="text-xs text-navy-500 hover:underline flex items-center gap-1"
                  >
                    Xem tất cả <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="divide-y divide-navy-50">
                  {MOCK_APPOINTMENTS.map((apt) => {
                    const statusInfo = STATUS_MAP[apt.status];
                    return (
                      <div
                        key={apt.id}
                        className="px-5 py-4 hover:bg-navy-50/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-navy-800 text-sm">
                              {apt.service}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-navy-400">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} /> {apt.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {apt.time}
                              </span>
                              <span className="text-navy-300">#{apt.id}</span>
                            </div>
                          </div>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${statusInfo.color}`}
                          >
                            <statusInfo.icon size={12} />
                            {statusInfo.label}
                          </span>
                        </div>
                        {apt.queue && (
                          <div className="mt-2 text-xs text-navy-300">
                            Số thứ tự:{" "}
                            <span className="font-bold text-navy-600 text-sm">
                              {apt.queue}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Hồ sơ */}
              <div className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-navy-50 flex items-center justify-between">
                  <h2 className="font-bold text-navy-800 flex items-center gap-2 text-sm">
                    <FileText size={15} className="text-navy-400" /> Hồ sơ đang
                    hoạt động
                  </h2>
                  <Link
                    href="/ho-so"
                    className="text-xs text-navy-500 hover:underline flex items-center gap-1"
                  >
                    Xem tất cả <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="divide-y divide-navy-50">
                  {MOCK_HOSO.map((hs) => {
                    const statusInfo = STATUS_MAP[hs.status];
                    return (
                      <div
                        key={hs.id}
                        className="px-5 py-4 hover:bg-navy-50/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-navy-800 text-sm">
                              {hs.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-navy-400">
                              <span>{hs.type}</span>
                              <span>·</span>
                              <span>{hs.date}</span>
                              <span className="text-navy-300">#{hs.id}</span>
                            </div>
                            {hs.progress !== undefined && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-navy-400">
                                    Tiến trình
                                  </span>
                                  <span className="font-semibold text-blue-600">
                                    {hs.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-navy-100 rounded-full h-1.5">
                                  <div
                                    className="bg-navy-500 h-1.5 rounded-full transition-all"
                                    style={{ width: `${hs.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ml-4 ${statusInfo.color}`}
                          >
                            <statusInfo.icon size={12} />
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-navy-50">
                  <h2 className="font-bold text-navy-800 flex items-center gap-2 text-sm">
                    <Bell size={15} className="text-navy-400" /> Thông báo gần
                    đây
                  </h2>
                </div>
                <div className="divide-y divide-navy-50">
                  <NotifItem
                    title="Lịch hẹn đã được xác nhận"
                    desc="Công chứng hợp đồng giao dịch — 22/05/2026, 09:00"
                    time="2 giờ trước"
                    type="success"
                  />
                  <NotifItem
                    title="Hồ sơ đang được xử lý"
                    desc="Giấy ủy quyền — HS-002 đã chuyển sang bước thẩm định"
                    time="1 ngày trước"
                    type="info"
                  />
                  <NotifItem
                    title="Yêu cầu bổ sung giấy tờ"
                    desc="Vui lòng bổ sung bản sao CCCD cho hồ sơ HS-003"
                    time="2 ngày trước"
                    type="warning"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={14} className="text-navy-300 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-navy-300 text-xs">{label}</p>
        <p className="text-navy-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className={`rounded-lg p-3 ${color}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs opacity-80">{label}</p>
    </div>
  );
}

function NotifItem({
  title,
  desc,
  time,
  type,
}: {
  title: string;
  desc: string;
  time: string;
  type: "success" | "info" | "warning";
}) {
  const colors = {
    success: "bg-green-400",
    info: "bg-blue-400",
    warning: "bg-amber-400",
  };
  return (
    <div className="px-5 py-4 hover:bg-navy-50/50 transition-colors flex items-start gap-3">
      <div className={`w-2 h-2 rounded-full mt-1.5 ${colors[type]}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-navy-800">{title}</p>
        <p className="text-xs text-navy-400 mt-0.5 truncate">{desc}</p>
      </div>
      <span className="text-xs text-navy-300 whitespace-nowrap">{time}</span>
    </div>
  );
}
