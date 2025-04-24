export type Language = 'de' | 'en';

export interface NavItem {
  label: { de: string; en: string };
  href: string;
}

export interface NewsItem {
  id: string;
  title: { de: string; en: string };
  date: string;
  teaser: { de: string; en: string };
}

export interface FAQItem {
  question: { de: string; en: string };
  answer: { de: string; en: string };
}

export interface Building {
  id: string;
  name: { de: string; en: string };
  description: { de: string; en: string };
  status: { de: string; en: string };
  keyFacts: { de: string[]; en: string[] };
  coordinates: { x: number; y: number };
}