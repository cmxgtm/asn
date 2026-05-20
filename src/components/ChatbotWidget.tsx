"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  ChevronDown,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import {
  chatbotRules,
  quickChatbotRules,
  type ChatbotAction,
} from "@/lib/chatbot-rules";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  action?: ChatbotAction;
};

const STORAGE_KEY = "asn-chatbot-session";

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "bot",
    text: "Xin chào, tôi là trợ lý ASN. Vui lòng chọn một nội dung cần hỗ trợ để nhận hướng dẫn nhanh.",
  },
];

export default function ChatbotWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [activeModal, setActiveModal] = useState<"complaint" | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamTimerRef = useRef<number | null>(null);

  const answeredRuleIds = useMemo(() => {
    const selectedQuestions = new Set(
      messages
        .filter((message) => message.role === "user")
        .map((message) => message.text),
    );
    return new Set(
      chatbotRules
        .filter((rule) => selectedQuestions.has(rule.question))
        .map((rule) => rule.id),
    );
  }, [messages]);

  useEffect(() => {
    const savedSession = window.sessionStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [hydrated, messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping, open]);

  useEffect(() => {
    return () => {
      if (streamTimerRef.current) {
        window.clearInterval(streamTimerRef.current);
      }
    };
  }, []);

  const streamBotAnswer = (fullText: string, action?: ChatbotAction) => {
    const botMessageId = `bot-${Date.now()}`;
    let cursor = 0;
    const chunkSize = Math.max(2, Math.ceil(fullText.length / 70));

    setMessages((current) => [
      ...current,
      { id: botMessageId, role: "bot", text: "", action },
    ]);

    if (streamTimerRef.current) {
      window.clearInterval(streamTimerRef.current);
    }

    streamTimerRef.current = window.setInterval(() => {
      cursor = Math.min(fullText.length, cursor + chunkSize);
      setMessages((current) =>
        current.map((message) =>
          message.id === botMessageId
            ? { ...message, text: fullText.slice(0, cursor) }
            : message,
        ),
      );

      if (cursor >= fullText.length && streamTimerRef.current) {
        window.clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
      }
    }, 22);
  };

  const handleRuleSelect = (ruleId: string) => {
    const rule = chatbotRules.find((item) => item.id === ruleId);
    if (!rule || isTyping || streamTimerRef.current) return;

    setOpen(true);
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", text: rule.question },
    ]);
    setIsTyping(true);

    window.setTimeout(() => {
      setIsTyping(false);
      streamBotAnswer(rule.answer.join("\n\n"), rule.action);
    }, 520);
  };

  const handleAction = (action: ChatbotAction) => {
    if (action.type === "navigate") {
      router.push(action.href);
      setOpen(false);
      return;
    }

    if (action.type === "external") {
      window.open(
        action.href,
        action.href.startsWith("tel:") ? "_self" : "_blank",
      );
      return;
    }

    setActiveModal(action.modal);
  };

  const handleReset = () => {
    if (streamTimerRef.current) {
      window.clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
    setIsTyping(false);
    setMessages(initialMessages);
    window.sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      <section
        aria-label="Trợ lý ASN"
        className={`fixed bottom-5 right-4 z-[60] w-[calc(100vw-2rem)] max-w-[390px] transition-all duration-300 sm:right-6 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/5">
          <div className="bg-gradient-to-r from-[#2651A6] via-[#0477BF] to-[#049DD9] p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                  <Bot size={22} />
                </div>
                <div>
                  <h2 className="text-sm font-bold leading-tight">
                    Trợ lý ASN
                  </h2>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    Đang sẵn sàng
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/15 hover:text-white"
                  aria-label="Làm mới hội thoại"
                  title="Làm mới hội thoại"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/15 hover:text-white"
                  aria-label="Thu gọn chat"
                  title="Thu gọn chat"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    message.role === "user"
                      ? "rounded-br-md bg-navy-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                  {message.action && message.text.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleAction(message.action!)}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-navy-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-navy-700"
                    >
                      <Send size={13} />
                      {message.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-300 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-400 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-500" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
              <Sparkles size={13} />
              Câu hỏi nhanh
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {quickChatbotRules.map((rule) => {
                const Icon = rule.icon;
                const selected = answeredRuleIds.has(rule.id);

                return (
                  <button
                    key={rule.id}
                    type="button"
                    onClick={() => handleRuleSelect(rule.id)}
                    disabled={isTyping || Boolean(streamTimerRef.current)}
                    className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      selected
                        ? "border-navy-200 bg-navy-50 text-navy-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-navy-300 hover:bg-navy-50"
                    }`}
                  >
                    <Icon size={15} className="shrink-0 text-navy-500" />
                    <span>{rule.question}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {chatbotRules
                .filter((rule) => rule.category !== "quick")
                .map((rule) => (
                  <button
                    key={rule.id}
                    type="button"
                    onClick={() => handleRuleSelect(rule.id)}
                    disabled={isTyping || Boolean(streamTimerRef.current)}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-navy-300 hover:text-navy-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {rule.question}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-5 right-4 z-[61] flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-600 text-white shadow-2xl shadow-navy-600/35 transition hover:-translate-y-0.5 hover:bg-navy-700 sm:right-6"
        aria-label={open ? "Đóng trợ lý ASN" : "Mở trợ lý ASN"}
        title={open ? "Đóng trợ lý ASN" : "Mở trợ lý ASN"}
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold">
            4
          </span>
        )}
      </button>

      {activeModal === "complaint" && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-900/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-navy-800">
                  Gửi khiếu nại
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  ASN sẽ tiếp nhận thông tin và liên hệ lại trong thời gian sớm
                  nhất.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Đóng biểu mẫu"
                title="Đóng biểu mẫu"
              >
                <X size={18} />
              </button>
            </div>

            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                setActiveModal(null);
                setMessages((current) => [
                  ...current,
                  {
                    id: `bot-complaint-${Date.now()}`,
                    role: "bot",
                    text: "ASN đã ghi nhận thông tin khiếu nại. Bộ phận phụ trách sẽ kiểm tra và liên hệ lại trong thời gian sớm nhất.",
                    action: {
                      type: "external",
                      label: "Gọi hotline",
                      href: "tel:0799921998",
                    },
                  },
                ]);
              }}
            >
              <input
                required
                placeholder="Họ và tên"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-navy-300 focus:ring-2 focus:ring-navy-100"
              />
              <input
                required
                type="tel"
                placeholder="Số điện thoại"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-navy-300 focus:ring-2 focus:ring-navy-100"
              />
              <textarea
                required
                rows={4}
                placeholder="Nội dung phản ánh"
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-navy-300 focus:ring-2 focus:ring-navy-100"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-navy-700"
              >
                <Send size={15} />
                Gửi thông tin
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
