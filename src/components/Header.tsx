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
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        {/* Topbar */}
        <div className="bg-[#2651A6] text-white text-xs py-2 px-4 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Image
                src={PhoneIcon}
                alt=""
                width={12}
                height={12}
                className="inline-block"
              />{" "}
              (028) 39 300 903 &nbsp;|&nbsp; Fax: (028) 39 300 908
            </span>
            <span className="flex items-center gap-1">
              <Image
                src={ClockIcon}
                alt=""
                width={12}
                height={12}
                className="inline-block"
              />{" "}
              Thứ hai – Thứ sáu: 08:00 đến 12:00 – 13:00 đến 17:00 &nbsp;|&nbsp;
              Thứ bảy: 08:00 đến 12:00
            </span>
          </div>
          <div className="flex items-center gap-4 text-navy-200">
            <a href="#" className="hover:text-accent-400 transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-accent-400 transition-colors">
              Zalo
            </a>
            <a href="#" className="hover:text-accent-400 transition-colors">
              YouTube
            </a>
          </div>
        </div>

        {/* Main header */}
        <header
          className={`transition-all duration-300 ${
            scrolled ? "shadow-2xl shadow-navy-900/30" : ""
          }`}
          style={{
            background: "linear-gradient(to right, #2651A6, #0477BF, #049DD9)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
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
            <nav className="hidden lg:flex items-center gap-1">
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
                      className="flex items-center gap-1 px-3 py-2 text-white/90 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-all"
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={14}
                          className="opacity-70 group-hover:rotate-180 transition-transform duration-200"
                        />
                      )}
                    </NavTag>
                    {item.children && openDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-1 w-64 z-50">
                        <div className="bg-white rounded-lg shadow-2xl border border-navy-100 overflow-hidden animate-fade-up">
                          {item.children.map((child) => {
                            const ChildTag = child.href.startsWith("/")
                              ? Link
                              : "a";
                            return (
                              <ChildTag
                                key={child.label}
                                href={child.href}
                                className="block px-4 py-3 text-navy-700 text-sm hover:bg-navy-50 hover:text-navy-600 border-b border-gray-50 last:border-0 transition-colors"
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
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-full text-sm font-medium transition-all"
                  >
                    <div className="w-7 h-7 bg-accent-400 rounded-full flex items-center justify-center text-navy-800 font-bold text-xs">
                      {user.citizen.name[0]}
                    </div>
                    <span className="hidden md:inline">
                      {user.citizen.name}
                    </span>
                    <ChevronDown size={14} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-100 bg-navy-50">
                        <p className="font-semibold text-navy-700 text-sm">
                          {user.citizen.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.citizen.email}
                        </p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      >
                        <User size={15} /> Thông tin cá nhân
                      </Link>
                      <Link
                        href="/ho-so"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      >
                        <Archive size={15} /> Hồ sơ
                      </Link>
                      <Link
                        href="/dashboard#khieu-nai"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      >
                        <Bell size={15} /> Khiếu nại
                      </Link>
                      <Link
                        href="/dat-lich"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-navy-50 transition-colors"
                      >
                        <Calendar size={15} /> Lịch hẹn của tôi
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full border-t border-gray-100"
                      >
                        <LogOut size={15} /> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-white hover:bg-white/90 text-navy-700 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hidden md:flex items-center gap-2"
                >
                  <User size={14} /> Đăng ký / Đăng nhập
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
            <div className="lg:hidden bg-navy-800 border-t border-white/10 px-4 py-3">
              {navItems.map((item) => {
                const MobileNavTag = item.href.startsWith("/") ? Link : "a";
                return (
                  <div key={item.label}>
                    <MobileNavTag
                      href={item.href}
                      className="block py-3 text-white/90 text-sm font-medium border-b border-white/10"
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
                              className="block py-2 text-white/60 text-xs border-b border-white/5"
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
                  className="mt-3 w-full bg-white text-navy-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-all"
                >
                  Đăng ký / Đăng nhập
                </Link>
              )}
            </div>
          )}
        </header>
      </div>
    </>
  );
}
