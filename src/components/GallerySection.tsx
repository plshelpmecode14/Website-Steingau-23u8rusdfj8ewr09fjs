import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';
import { Language } from '../types';
import 'swiper/css';

interface GallerySectionProps {
  language: Language;
}

const images = [
  'https://www.kirchheim-teck.de/ceasy/resource/21970?maxWidth=1200&maxHeight=1000',
  'https://www.kirchheim-teck.de/ceasy/resource/21971?maxWidth=1200&maxHeight=1000',
  'https://www.kirchheim-teck.de/ceasy/resource/21972?maxWidth=1200&maxHeight=1000',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'
];

export default function GallerySection({ language }: GallerySectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const nextImage = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-16 px-4" id="gallery">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {language === 'de' ? 'Galerie' : 'Gallery'}
        </h2>

        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide"
          >
            {images.map((src, index) => (
              <div 
                key={index}
                className="relative flex-none w-80 h-60 snap-center first:ml-4 last:mr-4"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
                <button 
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsFullscreen(true);
                  }}
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            onClick={previousImage}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            onClick={nextImage}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 transition-colors"
              onClick={previousImage}
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            
            <img
              src={images[currentImageIndex]}
              alt=""
              className="max-h-screen max-w-screen-xl object-contain"
            />
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 transition-colors"
              onClick={nextImage}
            >
              <ChevronRight className="w-12 h-12" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}