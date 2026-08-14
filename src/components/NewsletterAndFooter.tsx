import React from 'react';
import { 
  Instagram
} from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

interface NewsletterAndFooterProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const NewsletterAndFooter: React.FC<NewsletterAndFooterProps> = ({
  onOpenReservation,
  onExploreMenu
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { language, t } = useLanguage();
  const isGreek = language === 'el';

  return (
    <footer className={`border-t relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-[#EFE8DD] text-[#4A4238] border-[#C8BCA8]/60' 
        : 'bg-[#000000] text-[#cccccc] border-[#d4af37]/20'
    }`}>
      {/* Main Footer Links & Information */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start">
              <div className={`flex flex-col items-start leading-none ${
                isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
              }`}>
                <span className="font-chinese text-3xl font-black tracking-widest leading-none drop-shadow-md">
                  金
                </span>
                <span className="font-chinese text-3xl font-black tracking-widest leading-none drop-shadow-md mt-0.5">
                  鼎
                </span>
              </div>
              <span className={`font-display text-sm font-bold tracking-[0.2em] uppercase mt-1 ${
                isLight ? 'text-[#8A6310]' : 'text-[#f5e298]'
              }`}>
                GoldenWok
              </span>
            </div>

            <p className={`text-xs font-light leading-relaxed max-w-sm ${
              isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'
            }`}>
              {isGreek ? RESTAURANT_INFO.taglineEl : RESTAURANT_INFO.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
            }`}>
              {t('footer.nav')}
            </h4>
            <ul className={`space-y-2 text-xs ${isLight ? 'text-[#6B6154]' : 'text-[#888888]'}`}>
              <li><a href="#" className={isLight ? 'hover:text-[#8A6310] transition-colors' : 'hover:text-[#d4af37] transition-colors'}>{t('nav.home')}</a></li>
              <li><a href="#menu" className={isLight ? 'hover:text-[#8A6310] transition-colors' : 'hover:text-[#d4af37] transition-colors'}>{t('nav.menu')}</a></li>
              <li><a href="#gallery" className={isLight ? 'hover:text-[#8A6310] transition-colors' : 'hover:text-[#d4af37] transition-colors'}>{t('nav.gallery')}</a></li>
              <li><a href="#reviews" className={isLight ? 'hover:text-[#8A6310] transition-colors' : 'hover:text-[#d4af37] transition-colors'}>{t('nav.reviews')}</a></li>
              <li><a href="#location" className={isLight ? 'hover:text-[#8A6310] transition-colors' : 'hover:text-[#d4af37] transition-colors'}>{t('nav.location')}</a></li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
            }`}>
              {t('footer.connect')}
            </h4>
            <div className={`space-y-2 text-xs ${isLight ? 'text-[#574F44]' : 'text-[#888888]'}`}>
              <p className={isLight ? 'text-[#2D2821]' : 'text-[#ded6cb]'}>
                {isGreek ? RESTAURANT_INFO.addressEl || RESTAURANT_INFO.address : RESTAURANT_INFO.address}
              </p>
              <p><a href={`tel:${RESTAURANT_INFO.phone}`} className={isLight ? 'hover:text-[#8A6310]' : 'hover:text-[#d4af37]'}>{RESTAURANT_INFO.phone}</a></p>
              <p><a href={`mailto:${RESTAURANT_INFO.email}`} className={isLight ? 'hover:text-[#8A6310]' : 'hover:text-[#d4af37]'}>{RESTAURANT_INFO.email}</a></p>
              
              <div className="pt-2 flex items-center space-x-3">
                <a 
                  href={RESTAURANT_INFO.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`p-2 rounded border transition-colors ${
                    isLight
                      ? 'bg-[#FAF6F0] text-[#574F44] hover:text-[#8A6310] border-[#C8BCA8]'
                      : 'bg-[#111111] text-[#ded6cb] hover:text-[#d4af37] border-[#222222]'
                  }`} 
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'border-[#C8BCA8]/60 text-[#6B6154]' : 'border-[#1a1a1a] text-[#777777]'
        }`}>
          <p>© {new Date().getFullYear()} 金鼎 GoldenWok Restaurant. {t('footer.rights')}</p>
          <div className="flex items-center space-x-6">
            <a href="#reservations" onClick={onOpenReservation} className={isLight ? 'hover:text-[#8A6310]' : 'hover:text-[#d4af37]'}>{t('nav.reserve')}</a>
            <a href="#menu" className={isLight ? 'hover:text-[#8A6310]' : 'hover:text-[#d4af37]'}>{t('nav.menu')}</a>
            <span className={`font-chinese font-bold text-sm ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>金鼎 • 恭候光临</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
