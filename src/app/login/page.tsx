"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, ArrowLeft, Zap, Loader2 } from "lucide-react";
import { loginWithMockUser } from "@/lib/mock-auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePocLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginWithMockUser();
      router.push("/dashboard");
    }, 600);
  };

  return (
    <>
      <Header />
      <main className="min-h-[80vh] relative overflow-hidden flex items-center justify-center px-4 py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50 via-[#F4F7FB] to-navy-50" />
        <div className="absolute inset-0 grain" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-navy-100/30 to-transparent" />
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-navy-100/20 to-transparent" />

        <div className="relative w-full max-w-[420px] animate-fade-up">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-navy-500 hover:text-navy-700 text-sm mb-8 transition-colors font-medium"
          >
            <ArrowLeft size={15} /> Về trang chủ
          </Link>

          <div className="bg-white rounded-xl shadow-xl shadow-navy-900/[0.06] border border-navy-100/60 overflow-hidden">
            <div
              className="px-8 py-10 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0F2847 0%, #1A4B8C 50%, #2D7DD2 100%)",
              }}
            >
              <div className="absolute inset-0 grain" />
              <div className="relative">
                <Image
                  src="https://congchungchaua.vn/wp-content/themes/asn/asset/images/logo.png"
                  alt="ASN – Công Chứng Châu Á"
                  width={160}
                  height={60}
                  className="h-11 w-auto mx-auto object-contain brightness-0 invert mb-4"
                  unoptimized
                />
                <p className="text-white/60 text-sm tracking-wide">
                  Đăng nhập để sử dụng dịch vụ
                </p>
              </div>
            </div>

            <div className="px-8 py-8 space-y-5">
              <button
                onClick={() => router.push("/vneid-sso")}
                className="w-full flex items-center justify-center gap-3 bg-[#C2202F] hover:bg-[#a81b28] text-white py-3.5 px-4 rounded-lg font-semibold transition-all shadow-lg shadow-[#C2202F]/20 hover:shadow-xl hover:shadow-[#C2202F]/25 active:scale-[0.98]"
              >
                <Image
                  src="https://universal.vneid.gov.vn/login-sso/static/media/logo-full-vneid.4021b712127b1e4314a0db366ee6af31.svg"
                  alt="VNeID"
                  width={80}
                  height={24}
                  className="h-5 w-auto brightness-0 invert"
                  unoptimized
                />
                <span className="text-sm">Đăng nhập với VNeID</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-navy-100" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-navy-300 text-xs uppercase tracking-widest font-medium">
                    hoặc
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Số CCCD / Email / Số điện thoại"
                  className="w-full px-4 py-3 border border-navy-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-300/40 focus:border-navy-300 transition-all bg-navy-50/30 placeholder:text-navy-300"
                  readOnly
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full px-4 py-3 border border-navy-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-300/40 focus:border-navy-300 transition-all bg-navy-50/30 placeholder:text-navy-300"
                  readOnly
                />
                <button
                  disabled
                  className="w-full bg-navy-500 text-white py-3 rounded-lg font-semibold opacity-40 cursor-not-allowed text-sm"
                >
                  Đăng nhập
                </button>
              </div>

              <p className="text-center text-xs text-navy-300 pt-1">
                Chưa có tài khoản?{" "}
                <span className="text-navy-500 cursor-pointer hover:underline font-medium">
                  Đăng ký ngay
                </span>
              </p>
            </div>

            <div className="px-8 pb-7">
              <div className="border-t border-dashed border-navy-100 pt-5">
                <button
                  onClick={handlePocLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-navy-50 hover:bg-navy-100 border border-dashed border-navy-200 text-navy-600 py-3 px-4 rounded-lg text-sm font-medium transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>
                      <Zap size={15} />
                      Đăng nhập nhanh
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
