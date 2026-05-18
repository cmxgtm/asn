"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types";

interface Props {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
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
              className={`text-navy-400 flex-shrink-0 transition-transform duration-300 ${
                open === idx ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`faq-answer ${open === idx ? "open" : ""} px-5 ${
              open === idx ? "pb-4" : ""
            }`}
          >
            <p className="text-gray-600 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
