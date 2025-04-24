import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { Language, FAQItem } from '../types';

interface FAQSectionProps {
  language: Language;
}

const faqItems: FAQItem[] = [
  {
    question: {
      de: 'Wann werden die ersten Wohnungen bezugsfertig?',
      en: 'When will the first apartments be ready for occupancy?'
    },
    answer: {
      de: 'Die ersten Wohnungen in Block A werden voraussichtlich im Sommer 2024 bezugsfertig sein.',
      en: 'The first apartments in Block A are expected to be ready for occupancy in summer 2024.'
    }
  },
  {
    question: {
      de: 'Gibt es Tiefgaragenplätze für alle Wohnungen?',
      en: 'Are there underground parking spaces for all apartments?'
    },
    answer: {
      de: 'Ja, zu jeder Wohnung gehört ein Tiefgaragenstellplatz. Zusätzliche Stellplätze können angemietet werden.',
      en: 'Yes, each apartment comes with one underground parking space. Additional spaces can be rented.'
    }
  },
  {
    question: {
      de: 'Wie ist die Anbindung an den öffentlichen Nahverkehr?',
      en: 'How is the public transport connection?'
    },
    answer: {
      de: 'Die nächste Bushaltestelle ist nur 2 Minuten entfernt. Von dort fahren regelmäßig Busse in die Innenstadt und zum Bahnhof.',
      en: 'The nearest bus stop is only 2 minutes away. Buses run regularly to the city center and train station.'
    }
  },
  {
    question: {
      de: 'Gibt es Einkaufsmöglichkeiten in der Nähe?',
      en: 'Are there shopping facilities nearby?'
    },
    answer: {
      de: 'In unmittelbarer Nähe befinden sich mehrere Supermärkte, Bäckereien und andere Geschäfte des täglichen Bedarfs.',
      en: 'There are several supermarkets, bakeries, and other daily needs stores in the immediate vicinity.'
    }
  },
  {
    question: {
      de: 'Wie erfolgt die Heizung und Warmwasserversorgung?',
      en: 'How is heating and hot water supplied?'
    },
    answer: {
      de: 'Das Quartier verfügt über ein nachhaltiges Energiekonzept mit Wärmepumpen und Photovoltaikanlagen.',
      en: 'The quarter has a sustainable energy concept with heat pumps and photovoltaic systems.'
    }
  }
];

export default function FAQSection({ language }: FAQSectionProps) {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>

        <div className="space-y-4 mb-12">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenItem(openItem === index ? null : index)}
              >
                <span className="font-medium">{item.question[language]}</span>
                {openItem === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openItem === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{item.answer[language]}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full border-2 border-gray-200 hover:bg-gray-50 transition-colors mx-auto">
            <MessageSquare className="w-5 h-5" />
            {language === 'de' ? 'Frage einreichen' : 'Submit a Question'}
          </button>
        </div>
      </div>
    </section>
  );
}