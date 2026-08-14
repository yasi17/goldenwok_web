import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndHours } from './components/LocationAndHours';
import { NewsletterAndFooter } from './components/NewsletterAndFooter';
import { DishDetailModal } from './components/DishDetailModal';
import { MenuItem } from './types';
import { Calendar } from 'lucide-react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { LanguageProvider, useLanguage } from './LanguageContext';

function MainApp() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 relative ${
      isLight 
        ? 'bg-[#F7F3EB] text-[#1C1917] selection:bg-[#B8860B] selection:text-white' 
        : 'bg-black text-[#f0f0f0] selection:bg-[#d4af37] selection:text-black'
    }`}>
      
      {/* Main Navigation Header with Theme Toggle & Language Switcher to the right of Reserve Table */}
      <Navbar
        onOpenReservation={() => scrollToSection('reservations')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section with Buffet Schedule, Order Now Delivery bar & Table Reservation Bar */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
        />

        {/* 2. Complete Interactive Dining Menu (Photo, Name & Description) */}
        <MenuSection
          onSelectDish={(item) => setSelectedDish(item)}
        />

        {/* 3. Atmosphere & Interior Visual Gallery */}
        <AtmosphereGallery />

        {/* 4. Verified Critic & Diner Reviews */}
        <ReviewsSection />

        {/* 5. Location, Opening Hours & Transit Directions */}
        <LocationAndHours />
      </main>

      {/* Footer */}
      <NewsletterAndFooter
        onOpenReservation={() => scrollToSection('reservations')}
        onExploreMenu={() => scrollToSection('menu')}
      />

      {/* Dish Detailed Inspection Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />

      {/* Floating Mobile Quick Action Pill */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-30 flex">
        <button
          onClick={() => scrollToSection('reservations')}
          className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center justify-center space-x-1.5 border border-[#d4af37]/60 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{t('nav.reserve')}</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
