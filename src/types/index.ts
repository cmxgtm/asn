export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  image: string;
  views: number;
  featured: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}
