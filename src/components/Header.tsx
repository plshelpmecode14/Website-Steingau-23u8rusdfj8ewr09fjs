import React, { useState, useRef } from 'react';
import { Search, Globe, LogIn, Menu, X } from 'lucide-react';
import { Language, NavItem } from '../types';

const navItems: NavItem[] = [
  { label: { de: 'Übersicht', en: 'Overview' }, href: '#overview' },
  { label: { de: 'News & Events', en: 'News & Events' }, href: '#news' },
  { label: { de: 'Galerie', en: 'Gallery' }, href: '#gallery' },
  { label: { de: 'Mieten & Kaufen', en: 'Rental & Sales' }, href: '#rental' },
  { label: { de: 'FAQ', en: 'FAQ' }, href: '#faq' },
];

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href === '#overview' ? 'overview' : href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-900">
              Steingauquartier
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label[language]}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-8'}`}>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={`${
                    isSearchOpen ? 'w-full pl-4 pr-10' : 'w-0'
                  } h-9 transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-100`}
                  placeholder={language === 'de' ? 'Suchen...' : 'Search...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSearchClick}
                  className="p-1 hover:text-gray-600 absolute right-2"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
              className="p-1 hover:text-gray-600 flex items-center space-x-1"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Login */}
            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <LogIn className="w-5 h-5" />
              <span className="text-sm font-medium">{language === 'de' ? 'Anmelden' : 'Login'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label[language]}
              </a>
            ))}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-3">
                <button
                  onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <Globe className="w-5 h-5" />
                  <span>{language === 'de' ? 'English' : 'Deutsch'}</span>
                </button>
              </div>
              <div className="mt-3 px-3">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <LogIn className="w-5 h-5" />
                  <span>{language === 'de' ? 'Anmelden' : 'Login'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}