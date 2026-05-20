"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Calendar,
  Bell,
  Archive,
} from "lucide-react";
import PhoneIcon from "@/assets/phone.svg";
import ClockIcon from "@/assets/clock.svg";
import {
  clearMockSession,
  readMockSession,
  type MockAuthSession,
} from "@/lib/mock-auth";

const navItems = [
  {
    label: "Giới thiệu",
    href: "#gioi-thieu",
    children: [
      { label: "Giới thiệu văn phòng", href: "#" },
      { label: "Mô hình tổ chức", href: "#" },
      { label: "Công chứng viên", href: "#doi-ngu" },
      { label: "Các đối tác", href: "#doi-tac" },
    ],
  },
  {
    label: "Dịch vụ",
    href: "#dich-vu",
    children: [
      { label: "Công chứng hợp đồng giao dịch", href: "#" },
      { label: "Công chứng bản dịch", href: "#" },
      { label: "Chứng thực chữ ký", href: "#" },
      { label: "Chứng thực bản sao từ bản chính", href: "#" },
      { label: "Các dịch vụ khác", href: "#" },
    ],
  },
  { label: "Đặt lịch hẹn", href: "/dat-lich" },
  {
    label: "Tin tức",
    href: "#tin-tuc",
    children: [
      { label: "Tin nổi bật", href: "#" },
      { label: "Tin pháp luật", href: "#" },
      { label: "Tin tức tổng hợp", href: "#" },
    ],
  },
  { label: "Liên hệ", href: "#lien-he" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<MockAuthSession | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncSession = () => setUser(readMockSession());
    syncSession();
    window.addEventListener("asn-auth-change", syncSession);
    window.addEventListener("storage", syncSession);
    return () => {
      window.removeEventListener("asn-auth-change", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  const handleLogout = () => {
    clearMockSession();
    setShowUserMenu(false);
    window.location.href = "/";
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        {/* Topbar */}
        <div className="bg-[#0B1F3D] text-white/70 text-[11px] tracking-wide py-2 px-4 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Image
                src={PhoneIcon}
                alt=""
                width={11}
                height={11}
                className="inline-block opacity-60"
              />{" "}
              (028) 39 300 903 &nbsp;|&nbsp; Fax: (028) 39 300 908
            </span>
            <span className="flex items-center gap-1.5">
              <Image
                src={ClockIcon}
                alt=""
                width={11}
                height={11}
                className="inline-block opacity-60"
              />{" "}
              T2–T6: 08:00–12:00, 13:00–17:00 &nbsp;|&nbsp; T7: 08:00–12:00
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Zalo
            </a>
            <a href="#" className="hover:text-white transition-colors">
              YouTube
            </a>
          </div>
        </div>

        {/* Main header */}
        <header
          className={`transition-all duration-500 relative ${
            scrolled ? "shadow-xl shadow-navy-900/20" : ""
          }`}
          style={{
            background:
              "linear-gradient(135deg, #0F2847 0%, #1A4B8C 50%, #2D7DD2 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <Image
                src="https://congchungchaua.vn/wp-content/themes/asn/asset/images/logo.png"
                alt="ASN – Công Chứng Châu Á"
                width={140}
                height={60}
                className="h-10 w-auto object-contain brightness-0 invert"
                unoptimized
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const NavTag = item.href.startsWith("/") ? Link : "a";
                return (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <NavTag
                      href={item.href}
                      className="flex items-center gap-1 px-3.5 py-2 text-white/85 hover:text-white text-[13px] font-medium tracking-wide rounded-md hover:bg-white/[0.08] transition-all duration-200"
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={13}
                          className="opacity-50 group-hover:opacity-80 group-hover:rotate-180 transition-all duration-200"
                        />
                      )}
                    </NavTag>
                    {item.children && openDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 w-64 z-50">
                        <div className="bg-white rounded-lg shadow-2xl shadow-navy-900/15 border border-navy-100 overflow-hidden animate-fade-up">
                          {item.children.map((child) => {
                            const ChildTag = child.href.startsWith("/")
                              ? Link
                              : "a";
                            return (
                              <ChildTag
                                key={child.label}
                                href={child.href}
                                className="block px-4 py-3 text-navy-800 text-sm hover:bg-navy-50 hover:text-navy-500 border-b border-navy-50 last:border-0 transition-colors"
                              >
                                {child.label}
                              </ChildTag>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Auth */}
            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2.5 bg-white/[0.08] hover:bg-white/[0.14] text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-white/[0.06]"
                  >
                    <div className="w-7 h-7 bg-accent-400 rounded-md flex items-center justify-center text-navy-900 font-bold text-xs">
                      {user.citizen.name[0]}
                    </div>
                    <span className="hidden md:inline text-[13px]">
                      {user.citizen.name}
                    </span>
                    <ChevronDown size={13} className="opacity-60" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-2xl shadow-navy-900/15 border border-navy-100 overflow-hidden z-50 animate-fade-up">
                      <div className="px-4 py-3.5 border-b border-navy-50 bg-navy-50/50">
                        <p className="font-semibold text-navy-800 text-sm">
                          {user.citizen.name}
                        </p>
                        <p className="text-xs text-navy-400 mt-0.5">
                          {user.citizen.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      >
                        <User size={15} className="text-navy-400" /> Thông tin
                        cá nhân
                      </Link>
                      <Link
                        href="/ho-so"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      >
                        <Archive size={15} className="text-navy-400" /> Hồ sơ
                      </Link>
                      <Link
                        href="/dashboard#khieu-nai"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      >
                        <Bell size={15} className="text-navy-400" /> Khiếu nại
                      </Link>
                      <Link
                        href="/dat-lich"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      >
                        <Calendar size={15} className="text-navy-400" /> Lịch
                        hẹn của tôi
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full border-t border-navy-50"
                      >
                        <LogOut size={15} /> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-white hover:bg-white/95 text-navy-800 px-5 py-2 rounded-lg text-[13px] font-semibold transition-all shadow-lg shadow-navy-900/10 hidden md:flex items-center gap-2 tracking-wide"
                >
                  <User size={14} /> Đăng nhập
                </Link>
              )}

              {/* Mobile burger */}
              <button
                className="lg:hidden text-white p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="lg:hidden bg-navy-800 border-t border-white/5 px-4 py-3">
              {navItems.map((item) => {
                const MobileNavTag = item.href.startsWith("/") ? Link : "a";
                return (
                  <div key={item.label}>
                    <MobileNavTag
                      href={item.href}
                      className="block py-3 text-white/85 text-sm font-medium border-b border-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </MobileNavTag>
                    {item.children && (
                      <div className="pl-4">
                        {item.children.map((child) => {
                          const MobileChildTag = child.href.startsWith("/")
                            ? Link
                            : "a";
                          return (
                            <MobileChildTag
                              key={child.label}
                              href={child.href}
                              className="block py-2 text-white/50 text-xs border-b border-white/[0.03]"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </MobileChildTag>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 block text-center w-full bg-white text-navy-800 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-all"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          )}
        </header>
      </div>
    </>
  );
}
