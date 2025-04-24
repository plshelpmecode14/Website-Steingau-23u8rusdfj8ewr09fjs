import React, { useState } from 'react';
import { Language, NewsItem } from '../types';
import { CalendarDays, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsSectionProps {
  language: Language;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: {
      de: 'Baufortschritt: Neue Wohnungen im Block A',
      en: 'Construction Progress: New Apartments in Block A'
    },
    date: '2024-03-15',
    teaser: {
      de: 'Die Arbeiten am Block A schreiten planmäßig voran. Die ersten Wohnungen werden voraussichtlich im Sommer 2024 bezugsfertig sein.',
      en: 'Work on Block A is progressing as planned. The first apartments are expected to be ready for occupancy in summer 2024.'
    }
  },
  {
    id: '2',
    title: {
      de: 'Nachbarschaftsfest im Steingauquartier',
      en: 'Neighborhood Festival in Steingauquartier'
    },
    date: '2024-04-20',
    teaser: {
      de: 'Lernen Sie Ihre zukünftigen Nachbarn kennen! Mit Musik, Essen und Getränken feiern wir das Gemeinschaftsgefühl.',
      en: 'Meet your future neighbors! We celebrate community spirit with music, food, and drinks.'
    }
  },
  {
    id: '3',
    title: {
      de: 'Neue E-Ladestationen in der Tiefgarage',
      en: 'New EV Charging Stations in Underground Parking'
    },
    date: '2024-05-01',
    teaser: {
      de: 'Ab Mai stehen in der Tiefgarage 10 neue Ladestationen für Elektrofahrzeuge zur Verfügung.',
      en: '10 new charging stations for electric vehicles will be available in the underground parking from May.'
    }
  },
  {
    id: '4',
    title: {
      de: 'Tag der offenen Tür: Musterwohnung Block B',
      en: 'Open House: Show Apartment Block B'
    },
    date: '2024-05-15',
    teaser: {
      de: 'Besichtigen Sie unsere neue Musterwohnung und erleben Sie modernen Wohnkomfort.',
      en: 'Visit our new show apartment and experience modern living comfort.'
    }
  },
  {
    id: '5',
    title: {
      de: 'Gemeinschaftsgarten-Projekt startet',
      en: 'Community Garden Project Launches'
    },
    date: '2024-06-01',
    teaser: {
      de: 'Ein neuer Gemeinschaftsgarten wird angelegt. Interessierte Bewohner können sich ab sofort anmelden.',
      en: 'A new community garden is being created. Interested residents can sign up now.'
    }
  },
  {
    id: '6',
    title: {
      de: 'Sommerfest 2024',
      en: 'Summer Festival 2024'
    },
    date: '2024-07-15',
    teaser: {
      de: 'Großes Sommerfest mit Live-Musik, Kinderprogramm und kulinarischen Highlights.',
      en: 'Big summer festival with live music, children\'s program and culinary highlights.'
    }
  }
];

export default function NewsSection({ language }: NewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const previousPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentItems = newsItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-16 px-4 bg-gray-50" id="news">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">News & Events</h2>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currentItems.map((item) => (
              <article 
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="p-6">
                  <time className="text-sm text-gray-500 mb-2 block">
                    {new Date(item.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
                  </time>
                  <h3 className="font-bold text-lg mb-2">{item.title[language]}</h3>
                  <p className="text-gray-600">{item.teaser[language]}</p>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="absolute -left-12 -right-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 transition-colors pointer-events-auto"
                onClick={previousPage}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900 transition-colors pointer-events-auto"
                onClick={nextPage}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
            <CalendarDays className="w-5 h-5" />
            {language === 'de' ? 'Zum Eventkalender' : 'Go to Event Calendar'}
          </button>
          <button 
            className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="w-5 h-5" />
            {language === 'de' ? 'Newsletter abonnieren' : 'Subscribe to Newsletter'}
          </button>
        </div>
      </div>
    </section>
  );
}