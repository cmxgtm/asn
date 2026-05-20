import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { FaqItem } from "@/types";
import FaqAccordion from "./FaqAccordion";
import { newsArticles } from "@/lib/news-data";

interface Props {
  faqs: FaqItem[];
}

export default function NewsSection({ faqs }: Props) {
  return (
    <section id="tin-tuc" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* 7:3 grid - News left, FAQ right */}
        <div className="grid lg:grid-cols-10 gap-10">
          {/* Left: News (7 parts) */}
          <div className="lg:col-span-7">
            {/* Section header */}
            <div className="mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-700 section-heading">
                TIN TỨC MỚI
              </h2>
            </div>

            {/* Articles - zigzag layout */}
            <div className="space-y-8">
              {newsArticles.map((article, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <article
                    key={article.id}
                    className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
                  >
                    <div
                      className={`flex flex-col ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Image */}
                      <div className="relative md:w-1/2 aspect-[16/10] md:aspect-auto min-h-[220px]">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Content */}
                      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                        {/* Date badge */}
                        <div className="mb-4">
                          <span className="inline-block bg-navy-700 text-white text-xs font-semibold px-3 py-1.5 rounded">
                            {article.date}
                          </span>
                        </div>

                        {/* Category */}
                        <p className="text-navy-500 text-xs font-bold tracking-wider mb-3 uppercase">
                          {article.category}
                        </p>

                        {/* Title */}
                        <h3 className="font-display font-bold text-navy-800 text-lg md:text-xl leading-snug mb-3 line-clamp-3">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
                          {article.excerpt}
                        </p>

                        {/* CTA button */}
                        <div>
                          <Link
                            href={`/tin-tuc/${article.slug}`}
                            className="inline-flex items-center gap-2 bg-navy-700 hover:bg-navy-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                          >
                            Xem chi tiết <ExternalLink size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right: FAQ (3 parts) */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-display text-xl md:text-2xl font-bold text-navy-700 section-heading mb-8">
                Câu hỏi thường gặp
              </h2>
              <FaqAccordion faqs={faqs} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
