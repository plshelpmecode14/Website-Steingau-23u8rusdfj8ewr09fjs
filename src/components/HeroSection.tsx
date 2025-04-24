import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  language: Language;
}

const newsTickerItems = [
  {
    de: 'Willkommen an unsere neuen Bewohner in Gebäude A! 🏠',
    en: 'Welcome to our new residents in Building A! 🏠'
  },
  {
    de: 'Gemeinschaftsgarten eröffnet dieses Wochenende 🌸',
    en: 'Community garden opening this weekend 🌸'
  },
  {
    de: 'Wartungsarbeiten in Gebäude C am Montag geplant',
    en: 'Maintenance work scheduled for Building C on Monday'
  },
  {
    de: 'Neue E-Ladestationen in der Tiefgarage verfügbar ⚡',
    en: 'New EV charging stations available in underground parking ⚡'
  }
];

export default function HeroSection({ language }: HeroSectionProps) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsTickerItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://www.kirchheim-teck.de/ceasy/resource/21970?maxWidth=1200&maxHeight=1000)'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          {language === 'de' 
            ? 'Willkommen im Steingauquartier'
            : 'Welcome to Steingauquartier'}
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
          {language === 'de'
            ? 'Ihr neues Zuhause in Kirchheim unter Teck - Modern, nachhaltig und lebenswert'
            : 'Your new home in Kirchheim unter Teck - Modern, sustainable and livable'}
        </p>
        <button 
          className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
          onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {language === 'de' ? 'Newsletter abonnieren' : 'Subscribe to Newsletter'}
        </button>

        {/* News Ticker */}
        <div className="absolute bottom-24 left-0 right-0 bg-black/60 py-3 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center overflow-hidden whitespace-nowrap">
              <div className="animate-slide">
                {newsTickerItems[currentNewsIndex][language]}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
}