import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsArticles, getArticleBySlug } from "@/lib/news-data";

export function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden">
      <Header />

      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy-700 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link
              href="/#tin-tuc"
              className="hover:text-navy-700 transition-colors"
            >
              Tin tức
            </Link>
            <span>/</span>
            <span className="text-navy-700 font-medium line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-10 gap-10">
            {/* Main content */}
            <article className="lg:col-span-7">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {/* Hero image */}
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </div>

                <div className="p-6 md:p-10">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="inline-flex items-center gap-1.5 bg-navy-700 text-white text-xs font-semibold px-3 py-1.5 rounded">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-navy-50 text-navy-700 text-xs font-semibold px-3 py-1.5 rounded border border-navy-200">
                      <Tag size={12} />
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-800 leading-tight mb-8">
                    {article.title}
                  </h1>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {article.content.split("\n").map((paragraph, idx) => {
                      const trimmed = paragraph.trim();
                      if (!trimmed) return <br key={idx} />;
                      return (
                        <p key={idx} className="mb-4 whitespace-pre-line">
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>

                  {/* Extra images */}
                  {article.extraImages && article.extraImages.length > 0 && (
                    <div className="mt-8 space-y-6">
                      {article.extraImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative w-full aspect-[16/9] rounded-xl overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={`${article.title} - Hình ${idx + 2}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Back button */}
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <Link
                      href="/#tin-tuc"
                      className="inline-flex items-center gap-2 text-navy-700 hover:text-navy-800 font-semibold transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Quay lại danh sách tin tức
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar - Related news */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-display text-xl font-bold text-navy-700 section-heading mb-6">
                  Tin tức liên quan
                </h2>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/tin-tuc/${related.slug}`}
                      className="block bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative w-full aspect-[16/9]">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-navy-500 font-semibold mb-1 uppercase">
                          {related.category}
                        </p>
                        <h3 className="font-display font-bold text-navy-800 text-sm leading-snug line-clamp-2 mb-2">
                          {related.title}
                        </h3>
                        <p className="text-xs text-gray-400">{related.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
