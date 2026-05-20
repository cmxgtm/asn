"use client";
import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Archive,
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  PenLine,
  ShieldCheck,
  FolderArchive,
  X,
  Loader2,
  File,
  Image as ImageIcon,
  Trash2,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { readMockSession, type MockAuthSession } from "@/lib/mock-auth";

type TabKey = "lich-su" | "chu-ky" | "kho-luu-tru";

interface HoSoItem {
  id: string;
  title: string;
  type: string;
  date: string;
  status: "completed" | "processing" | "pending" | "rejected";
  files: string[];
  signedBy?: string;
  description?: string;
}

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "lich-su", label: "Lịch sử hồ sơ", icon: Clock },
  { key: "chu-ky", label: "Chữ ký điện tử", icon: PenLine },
  { key: "kho-luu-tru", label: "Kho lưu trữ hồ sơ", icon: FolderArchive },
];

const MOCK_HOSO: HoSoItem[] = [
  {
    id: "HS-001",
    title: "Hợp đồng mua bán nhà đất",
    type: "Công chứng hợp đồng",
    date: "10/05/2026",
    status: "completed",
    files: ["hop-dong-mua-ban.pdf", "giay-chung-nhan-quyen-su-dung-dat.pdf"],
    signedBy: "CCV. Trần Thị Mai",
    description: "Hợp đồng mua bán nhà ở tại 456 Lê Văn Sỹ, Q.3, TP.HCM",
  },
  {
    id: "HS-002",
    title: "Giấy ủy quyền",
    type: "Chứng thực",
    date: "15/05/2026",
    status: "processing",
    files: ["giay-uy-quyen.pdf", "cccd-nguoi-uy-quyen.jpg"],
    description: "Ủy quyền cho Nguyễn Văn B quản lý tài sản",
  },
  {
    id: "HS-003",
    title: "Bản dịch hộ chiếu",
    type: "Công chứng bản dịch",
    date: "18/05/2026",
    status: "pending",
    files: ["ho-chieu-scan.pdf"],
    description: "Bản dịch hộ chiếu Anh-Việt cho mục đích du học",
  },
  {
    id: "HS-004",
    title: "Hợp đồng thuê mặt bằng",
    type: "Công chứng hợp đồng",
    date: "05/04/2026",
    status: "completed",
    files: ["hop-dong-thue.pdf", "giay-phep-kinh-doanh.pdf", "so-do.pdf"],
    signedBy: "CCV. Nguyễn Hoàng Nam",
    description: "Thuê mặt bằng kinh doanh tại 789 CMT8, Q.10",
  },
  {
    id: "HS-005",
    title: "Di chúc",
    type: "Công chứng",
    date: "20/03/2026",
    status: "completed",
    files: ["di-chuc.pdf"],
    signedBy: "CCV. Trần Thị Mai",
    description: "Di chúc phân chia tài sản",
  },
  {
    id: "HS-006",
    title: "Chứng thực chữ ký đơn xin việc",
    type: "Chứng thực chữ ký",
    date: "01/05/2026",
    status: "rejected",
    files: ["don-xin-viec.pdf"],
    description: "Chứng thực chữ ký trên đơn xin việc — Thiếu CCCD bản gốc",
  },
];

const MOCK_SIGNATURES = [
  {
    id: "SIG-001",
    document: "Hợp đồng mua bán nhà đất",
    hosoId: "HS-001",
    signedAt: "10/05/2026 14:32",
    method: "VNeID eKYC",
    certSerial: "VN-CERT-2026-A1B2C3",
    status: "valid" as const,
    signedBy: "Nguyễn Văn An",
  },
  {
    id: "SIG-002",
    document: "Hợp đồng thuê mặt bằng",
    hosoId: "HS-004",
    signedAt: "05/04/2026 10:15",
    method: "USB Token",
    certSerial: "VN-CERT-2026-D4E5F6",
    status: "valid" as const,
    signedBy: "Nguyễn Văn An",
  },
  {
    id: "SIG-003",
    document: "Di chúc",
    hosoId: "HS-005",
    signedAt: "20/03/2026 09:45",
    method: "VNeID eKYC",
    certSerial: "VN-CERT-2026-G7H8I9",
    status: "valid" as const,
    signedBy: "Nguyễn Văn An",
  },
];

const MOCK_ARCHIVE: HoSoItem[] = MOCK_HOSO.filter(
  (h) => h.status === "completed",
);

const STATUS_CONFIG = {
  completed: {
    label: "Hoàn thành",
    color: "text-green-600 bg-green-50 border-green-200",
    icon: CheckCircle,
  },
  processing: {
    label: "Đang xử lý",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    icon: Loader2,
  },
  pending: {
    label: "Chờ xử lý",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    icon: Clock,
  },
  rejected: {
    label: "Từ chối",
    color: "text-red-600 bg-red-50 border-red-200",
    icon: AlertCircle,
  },
};

export default function HoSoPage() {
  return (
    <Suspense>
      <HoSoContent />
    </Suspense>
  );
}

function HoSoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<MockAuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("lich-su");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; size: string; type: string }[]
  >([]);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifiedIds, setVerifiedIds] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const session = readMockSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setUser(session);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "chu-ky") setActiveTab("chu-ky");
    else if (tab === "kho-luu-tru") setActiveTab("kho-luu-tru");
  }, [searchParams]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      const newFiles = Array.from(files).map((f) => ({
        name: f.name,
        size: `${(f.size / 1024).toFixed(1)} KB`,
        type: f.type,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    },
    [],
  );

  const handleVerifySignature = (sigId: string) => {
    setVerifyingId(sigId);
    setTimeout(() => {
      setVerifyingId(null);
      setVerifiedIds((prev) => new Set(prev).add(sigId));
    }, 2000);
  };

  const filteredHoso = MOCK_HOSO.filter((hs) => {
    const matchSearch =
      hs.title.toLowerCase().includes(search.toLowerCase()) ||
      hs.id.toLowerCase().includes(search.toLowerCase()) ||
      hs.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || hs.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredArchive = MOCK_ARCHIVE.filter(
    (hs) =>
      hs.title.toLowerCase().includes(search.toLowerCase()) ||
      hs.id.toLowerCase().includes(search.toLowerCase()),
  );

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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F4F7FB]">
        {/* Page Header */}
        <div
          className="text-white py-8 px-4 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0F2847 0%, #1A4B8C 50%, #2D7DD2 100%)",
          }}
        >
          <div className="absolute inset-0 grain" />
          <div className="max-w-7xl mx-auto relative">
            <h1 className="text-xl font-display font-bold flex items-center gap-2 tracking-tight">
              <Archive size={20} /> Hồ sơ của tôi
            </h1>
            <p className="text-white/50 text-sm mt-1.5">
              Quản lý hồ sơ, chữ ký điện tử và kho lưu trữ
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-navy-600 text-white shadow-md"
                    : "text-navy-400 hover:text-navy-600 hover:bg-navy-50"
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search & Filter bar */}
          {activeTab !== "chu-ky" && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm hồ sơ theo tên, mã số..."
                  className="w-full pl-10 pr-4 py-2.5 border border-navy-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-300/40 focus:border-navy-300 bg-white"
                />
              </div>
              {activeTab === "lich-su" && (
                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-8 py-2.5 border border-navy-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-300/40 appearance-none bg-white min-w-[160px]"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="pending">Chờ xử lý</option>
                    <option value="rejected">Từ chối</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-300 pointer-events-none"
                  />
                </div>
              )}
              <button
                onClick={() => setUploadModal(true)}
                className="flex items-center gap-2 bg-navy-600 hover:bg-navy-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                <Upload size={16} /> Tải lên tài liệu
              </button>
            </div>
          )}

          {/* Tab Content: Lịch sử hồ sơ */}
          {activeTab === "lich-su" && (
            <div className="space-y-4">
              {filteredHoso.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-navy-100/60">
                  <FileText size={40} className="mx-auto text-navy-200 mb-3" />
                  <p className="text-navy-400 text-sm">
                    Không tìm thấy hồ sơ nào
                  </p>
                </div>
              ) : (
                filteredHoso.map((hs) => {
                  const statusInfo = STATUS_CONFIG[hs.status];
                  return (
                    <div
                      key={hs.id}
                      className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 hover:shadow-md transition-all overflow-hidden"
                    >
                      <div className="px-5 py-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-navy-800">
                              {hs.title}
                            </h3>
                            <p className="text-xs text-navy-400 mt-1">
                              {hs.type} · {hs.date} ·{" "}
                              <span className="text-navy-300">{hs.id}</span>
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 border ${statusInfo.color}`}
                          >
                            <statusInfo.icon size={12} />
                            {statusInfo.label}
                          </span>
                        </div>
                        {hs.description && (
                          <p className="text-sm text-navy-500 mb-3">
                            {hs.description}
                          </p>
                        )}
                        {hs.signedBy && (
                          <p className="text-xs text-green-600 flex items-center gap-1 mb-3">
                            <ShieldCheck size={12} /> Ký bởi: {hs.signedBy}
                          </p>
                        )}
                        {/* Files */}
                        <div className="flex flex-wrap gap-2">
                          {hs.files.map((file) => (
                            <div
                              key={file}
                              className="flex items-center gap-2 bg-navy-50/50 border border-navy-100 rounded-lg px-3 py-1.5 text-xs text-navy-600"
                            >
                              <File size={12} className="text-navy-300" />
                              <span className="max-w-[150px] truncate">
                                {file}
                              </span>
                              <button
                                onClick={() => setPreviewFile(file)}
                                className="text-navy-500 hover:text-navy-700"
                                title="Xem"
                              >
                                <Eye size={12} />
                              </button>
                              <button
                                className="text-navy-500 hover:text-navy-700"
                                title="Tải xuống"
                              >
                                <Download size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Tab Content: Chữ ký điện tử */}
          {activeTab === "chu-ky" && (
            <div className="space-y-6">
              {/* Signature status */}
              <div className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <ShieldCheck size={24} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800">
                      Chữ ký điện tử đã kích hoạt
                    </h3>
                    <p className="text-sm text-navy-400">
                      Phương thức: VNeID eKYC · Trạng thái: Hợp lệ
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-navy-50/50 rounded-lg p-3">
                    <p className="text-navy-300 text-xs mb-1">Chủ sở hữu</p>
                    <p className="font-medium text-navy-800">
                      {user.citizen.name}
                    </p>
                  </div>
                  <div className="bg-navy-50/50 rounded-lg p-3">
                    <p className="text-navy-300 text-xs mb-1">CCCD</p>
                    <p className="font-medium text-navy-800">
                      {user.citizen.cccd}
                    </p>
                  </div>
                  <div className="bg-navy-50/50 rounded-lg p-3">
                    <p className="text-navy-300 text-xs mb-1">Hiệu lực</p>
                    <p className="font-medium text-green-600">Đến 20/06/2028</p>
                  </div>
                </div>
              </div>

              {/* Signatures list */}
              <div className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-navy-50">
                  <h3 className="font-bold text-navy-800 flex items-center gap-2 text-sm">
                    <PenLine size={15} className="text-navy-400" /> Lịch sử ký
                    số
                  </h3>
                </div>
                <div className="divide-y divide-navy-50">
                  {MOCK_SIGNATURES.map((sig) => (
                    <div
                      key={sig.id}
                      className="px-5 py-4 hover:bg-navy-50/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-navy-800 text-sm">
                            {sig.document}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-navy-400">
                            <span>Ký lúc: {sig.signedAt}</span>
                            <span>·</span>
                            <span>Phương thức: {sig.method}</span>
                            <span>·</span>
                            <span className="text-navy-300">
                              {sig.certSerial}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {verifiedIds.has(sig.id) ? (
                            <span className="text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                              <CheckCircle size={12} /> Hợp lệ
                            </span>
                          ) : (
                            <button
                              onClick={() => handleVerifySignature(sig.id)}
                              disabled={verifyingId === sig.id}
                              className="text-xs text-navy-600 bg-navy-50 hover:bg-navy-100 px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1 disabled:opacity-60"
                            >
                              {verifyingId === sig.id ? (
                                <>
                                  <Loader2 size={12} className="animate-spin" />{" "}
                                  Đang xác minh...
                                </>
                              ) : (
                                <>
                                  <ShieldCheck size={12} /> Xác minh
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Kho lưu trữ */}
          {activeTab === "kho-luu-tru" && (
            <div className="space-y-4">
              {filteredArchive.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-navy-100/60">
                  <FolderArchive
                    size={40}
                    className="mx-auto text-navy-200 mb-3"
                  />
                  <p className="text-navy-400 text-sm">
                    Không tìm thấy hồ sơ lưu trữ
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredArchive.map((hs) => (
                    <div
                      key={hs.id}
                      className="bg-white rounded-xl shadow-sm shadow-navy-900/[0.04] border border-navy-100/60 p-5 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FolderArchive size={20} className="text-navy-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-navy-800 text-sm truncate">
                            {hs.title}
                          </h4>
                          <p className="text-xs text-navy-400 mt-0.5">
                            {hs.type} · {hs.date}
                          </p>
                          {hs.signedBy && (
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                              <ShieldCheck size={10} /> {hs.signedBy}
                            </p>
                          )}
                          <div className="flex gap-1.5 mt-3">
                            {hs.files.map((file) => (
                              <span
                                key={file}
                                className="text-[10px] bg-navy-50 text-navy-400 px-2 py-0.5 rounded truncate max-w-[100px]"
                                title={file}
                              >
                                {file}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-3 border-t border-navy-50">
                        <button
                          onClick={() => setPreviewFile(hs.files[0])}
                          className="flex-1 flex items-center justify-center gap-1 text-xs text-navy-600 hover:bg-navy-50 py-2 rounded-lg transition-colors font-medium"
                        >
                          <Eye size={12} /> Xem
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 text-xs text-navy-600 hover:bg-navy-50 py-2 rounded-lg transition-colors font-medium">
                          <Download size={12} /> Tải xuống
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-fade-up">
            <div className="px-5 py-4 border-b border-navy-50 flex items-center justify-between">
              <h3 className="font-semibold text-navy-800 flex items-center gap-2 text-sm">
                <Eye size={16} /> Xem trước: {previewFile}
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-navy-300 hover:text-navy-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-navy-50/50">
              <FileText size={64} className="text-navy-200 mb-4" />
              <p className="text-navy-600 text-sm mb-1">{previewFile}</p>
              <p className="text-navy-300 text-xs mb-4">Xem trước tài liệu</p>
              <div className="bg-white border border-navy-100 rounded-lg p-6 w-full max-w-sm text-center">
                <p className="text-sm text-navy-700 font-medium mb-2">
                  VĂN PHÒNG CÔNG CHỨNG CHÂU Á
                </p>
                <p className="text-xs text-navy-300">
                  Nội dung tài liệu sẽ được hiển thị tại đây.
                </p>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-navy-50 flex justify-end gap-2">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 text-sm text-navy-500 hover:bg-navy-50 rounded-lg transition-colors"
              >
                Đóng
              </button>
              <button className="px-4 py-2 text-sm bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center gap-1.5">
                <Download size={14} /> Tải xuống
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-fade-up">
            <div className="px-5 py-4 border-b border-navy-50 flex items-center justify-between">
              <h3 className="font-semibold text-navy-800 flex items-center gap-2 text-sm">
                <Upload size={16} /> Tải lên tài liệu
              </h3>
              <button
                onClick={() => {
                  setUploadModal(false);
                  setUploadedFiles([]);
                }}
                className="text-navy-300 hover:text-navy-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-navy-200 hover:border-navy-400 rounded-xl p-8 text-center cursor-pointer transition-colors"
              >
                <Upload size={32} className="mx-auto text-navy-300 mb-3" />
                <p className="text-sm text-navy-600 font-medium">
                  Nhấn để chọn hoặc kéo thả tệp vào đây
                </p>
                <p className="text-xs text-navy-300 mt-1">
                  PDF, JPG, PNG, DOCX — tối đa 10MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Uploaded files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-navy-50/50 rounded-lg px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {f.type.includes("image") ? (
                          <ImageIcon size={14} className="text-blue-500" />
                        ) : (
                          <File size={14} className="text-red-500" />
                        )}
                        <span className="text-sm text-navy-700 truncate">
                          {f.name}
                        </span>
                        <span className="text-xs text-navy-300">{f.size}</span>
                      </div>
                      <button
                        onClick={() =>
                          setUploadedFiles((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="text-navy-300 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-5 py-3 border-t border-navy-50 flex justify-end gap-2">
              <button
                onClick={() => {
                  setUploadModal(false);
                  setUploadedFiles([]);
                }}
                className="px-4 py-2 text-sm text-navy-500 hover:bg-navy-50 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setUploadModal(false);
                  setUploadedFiles([]);
                }}
                disabled={uploadedFiles.length === 0}
                className="px-4 py-2 text-sm bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Upload size={14} /> Tải lên ({uploadedFiles.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
