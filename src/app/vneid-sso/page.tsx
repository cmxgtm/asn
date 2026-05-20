"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Shield,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { saveMockSession, MOCK_CITIZEN } from "@/lib/mock-auth";

type SsoStep = "login" | "otp" | "success";

export default function VneidSsoPage() {
  const router = useRouter();
  const [step, setStep] = useState<SsoStep>("login");
  const [cccd, setCccd] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Countdown for OTP
  useEffect(() => {
    if (step !== "otp") return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  // Success redirect
  useEffect(() => {
    if (step !== "success") return;
    const timer = setTimeout(() => {
      saveMockSession({
        citizen: MOCK_CITIZEN,
        verifiedLevel: "eKYC",
        loginTime: new Date().toISOString(),
      });
      router.push("/dashboard");
    }, 2500);
    return () => clearTimeout(timer);
  }, [step, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (cccd.length < 9) {
      setError("Vui lòng nhập số CCCD hợp lệ");
      return;
    }
    if (password.length < 4) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1200);
  };

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }

      // Auto submit when all filled
      if (newOtp.every((d) => d !== "")) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setStep("success");
        }, 1500);
      }
    },
    [otp],
  );

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-[#F4F7FB] flex flex-col">
      {/* VNeID Header bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://universal.vneid.gov.vn/login-sso/static/media/logo-full-vneid.4021b712127b1e4314a0db366ee6af31.svg"
              alt="VNeID"
              width={100}
              height={32}
              className="h-8 w-auto"
              unoptimized
            />
          </div>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} /> Quay lại
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* === LOGIN STEP === */}
          {step === "login" && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-up">
              <div className="bg-[#C2202F] px-8 py-6 text-center">
                <Image
                  src="https://universal.vneid.gov.vn/login-sso/static/media/logo-full-vneid.4021b712127b1e4314a0db366ee6af31.svg"
                  alt="VNeID"
                  width={120}
                  height={36}
                  className="h-10 w-auto mx-auto brightness-0 invert mb-2"
                  unoptimized
                />
                <p className="text-white/80 text-xs">
                  Hệ thống Định danh và Xác thực điện tử
                </p>
              </div>

              <form onSubmit={handleLogin} className="px-8 py-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Số CCCD / Căn cước
                  </label>
                  <input
                    type="text"
                    value={cccd}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 12);
                      setCccd(value);
                    }}
                    placeholder="Nhập số CCCD 12 số"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C2202F]/30 focus:border-[#C2202F] transition-all"
                    maxLength={12}
                    inputMode="numeric"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C2202F]/30 focus:border-[#C2202F] transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C2202F] hover:bg-[#a81b28] text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Đang xác thực...
                    </>
                  ) : (
                    <>
                      <Shield size={16} />
                      Đăng nhập
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                  <span className="hover:text-gray-600 cursor-pointer">
                    Quên mật khẩu?
                  </span>
                  <span className="hover:text-gray-600 cursor-pointer">
                    Đăng ký tài khoản
                  </span>
                </div>
              </form>

              <div className="px-8 pb-6">
                <div className="bg-navy-50 border border-navy-100 rounded-lg px-4 py-3 text-xs text-navy-400">
                  Nhập số CCCD (9+ số) và mật khẩu (4+ ký tự) để tiếp tục
                </div>
              </div>
            </div>
          )}

          {/* === OTP STEP === */}
          {step === "otp" && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-up">
              <div className="bg-[#C2202F] px-8 py-6 text-center">
                <Shield className="mx-auto text-white mb-2" size={32} />
                <h2 className="text-white font-bold text-lg">Xác thực OTP</h2>
                <p className="text-white/70 text-xs mt-1">
                  Mã xác thực đã được gửi đến số điện thoại ****567
                </p>
              </div>

              <div className="px-8 py-8">
                <p className="text-center text-sm text-gray-600 mb-6">
                  Nhập mã gồm 6 chữ số
                </p>

                <div className="flex gap-3 justify-center mb-6">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(i, e.target.value.replace(/\D/g, ""))
                      }
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C2202F]/30 focus:border-[#C2202F] transition-all"
                    />
                  ))}
                </div>

                {loading && (
                  <div className="flex items-center justify-center gap-2 text-[#C2202F] text-sm mb-4">
                    <Loader2 size={16} className="animate-spin" />
                    Đang xác thực...
                  </div>
                )}

                <div className="text-center text-sm text-gray-500">
                  {countdown > 0 ? (
                    <p>
                      Gửi lại mã sau{" "}
                      <span className="font-semibold text-[#C2202F]">
                        {countdown}s
                      </span>
                    </p>
                  ) : (
                    <button
                      onClick={() => setCountdown(60)}
                      className="text-[#C2202F] font-semibold hover:underline"
                    >
                      Gửi lại mã OTP
                    </button>
                  )}
                </div>

                <div className="mt-6 bg-navy-50 border border-navy-100 rounded-lg px-4 py-3 text-xs text-navy-400">
                  Nhập 6 số OTP để xác thực
                </div>
              </div>
            </div>
          )}

          {/* === SUCCESS STEP === */}
          {step === "success" && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-up text-center px-8 py-16">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
                <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={40} />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Xác thực thành công!
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Chào mừng{" "}
                <span className="font-semibold">{MOCK_CITIZEN.name}</span>
              </p>
              <p className="text-gray-400 text-xs mb-6">
                CCCD: {MOCK_CITIZEN.cccd}
              </p>
              <div className="flex items-center justify-center gap-2 text-navy-500 text-sm">
                <Loader2 size={16} className="animate-spin" />
                Đang chuyển hướng về cổng dịch vụ...
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            © VNeID — Xác thực danh tính điện tử
          </p>
        </div>
      </div>
    </div>
  );
}
