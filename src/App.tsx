import React, { useState } from 'react';
import { Language } from './types';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractiveMap from './components/InteractiveMap';
import NewsSection from './components/NewsSection';
import GallerySection from './components/GallerySection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

function App() {
  const [language, setLanguage] = useState<Language>('de');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} setLanguage={setLanguage} />
      
      <main>
        <HeroSection language={language} />
        <InteractiveMap language={language} />
        <NewsSection language={language} />
        <GallerySection language={language} />
        <FAQSection language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
}

export default App;