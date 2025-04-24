import React, { useState } from 'react';
import { Mail, Send, Info } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

interface NewsletterCategory {
  id: string;
  label: { de: string; en: string };
  description: { de: string; en: string };
}

const newsletterCategories: NewsletterCategory[] = [
  {
    id: 'events',
    label: { 
      de: 'Events', 
      en: 'Events' 
    },
    description: {
      de: 'Veranstaltungen, Termine, Aktionen im Quartier',
      en: 'Events, dates, activities in the quarter'
    }
  },
  {
    id: 'offers',
    label: {
      de: 'Miet & Kaufangebote',
      en: 'Rental & Purchase Offers'
    },
    description: {
      de: 'Wohnungen, Stellplätze, Verkaufsobjekte',
      en: 'Apartments, parking spaces, properties for sale'
    }
  },
  {
    id: 'notices',
    label: {
      de: 'Hinweise & Mitteilungen',
      en: 'Notices & Announcements'
    },
    description: {
      de: 'Informationen der Hausverwaltung, z. B. Reinigungen, Baustellen, Änderungen',
      en: 'Property management information, e.g., cleaning, construction sites, changes'
    }
  }
];

export default function Footer({ language }: FooterProps) {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <footer className="bg-gray-900 text-white py-16 px-4" id="newsletter">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">
            {language === 'de' ? 'Newsletter abonnieren' : 'Subscribe to Newsletter'}
          </h3>
          <p className="text-gray-400 mb-6">
            {language === 'de'
              ? 'Bleiben Sie über die neuesten Entwicklungen im Steingauquartier informiert.'
              : 'Stay informed about the latest developments in Steingauquartier.'}
          </p>
          <div className="mb-6">
            {newsletterCategories.map((category) => (
              <div key={category.id} className="flex items-center mb-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">{category.label[language]}</span>
                </label>
                <div className="relative ml-2">
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-300 peer" />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-gray-800 text-sm p-2 rounded opacity-0 peer-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {category.description[language]}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'de' ? 'Ihre E-Mail-Adresse' : 'Your email address'}
              className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-2xl font-bold mb-6">
            {language === 'de' ? 'Feedback & Vorschläge' : 'Feedback & Suggestions'}
          </h3>
          <div className="flex flex-col flex-grow">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                language === 'de'
                  ? 'Teilen Sie uns Ihre Gedanken mit...'
                  : 'Share your thoughts with us...'
              }
              className="flex-grow px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 min-h-[160px]"
            />
            <div>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                <Send className="w-5 h-5" />
                {language === 'de' ? 'Absenden' : 'Send'}
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-wrap gap-8 justify-center text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              {language === 'de' ? 'Impressum' : 'Imprint'}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {language === 'de' ? 'Datenschutz' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {language === 'de' ? 'Hausverwaltung kontaktieren' : 'Contact Property Management'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}