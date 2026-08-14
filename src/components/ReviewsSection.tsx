import React from 'react';
import { Star, Award, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { REVIEWS } from '../data/restaurantData';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

export const ReviewsSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { language, t } = useLanguage();
  const isGreek = language === 'el';

  const GOOGLE_MAPS_REVIEWS_URL = 'https://www.google.com/maps/search/?api=1&query=Golden+Wok+Leoforos+Andrea+Siggrou+207+Nea+Smyrni+171+21+Athens+Greece';

  return (
    <section id="reviews" className={`py-20 sm:py-28 relative border-b transition-colors duration-300 ${
      isLight ? 'bg-[#EFE8DD] border-[#C8BCA8]/40' : 'bg-[#050505] border-[#d4af37]/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className={`inline-flex items-center space-x-2 font-semibold text-xs tracking-[0.25em] uppercase ${
            isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
          }`}>
            <Award className="w-3.5 h-3.5" />
            <span>{t('reviews.badge')}</span>
          </div>
          <h2 className={`font-serif-heading text-3xl sm:text-5xl font-bold ${
            isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
          }`}>
            {t('reviews.title')}
          </h2>
          
          {/* Aggregate Rating Badge with Google Maps link */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-3 px-5 py-2.5 rounded-full border shadow-lg transition-all hover:scale-[1.02] cursor-pointer group ${
                isLight 
                  ? 'bg-[#FFFFFF] border-[#C8BCA8] hover:border-[#8A6310]' 
                  : 'bg-[#111111] border-[#d4af37]/40 hover:border-[#d4af37]'
              }`}
            >
              <div className={`flex items-center ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <div className="relative w-4 h-4">
                  <Star className="w-4 h-4 text-stone-600/40 fill-none" />
                  <div className="absolute inset-0 overflow-hidden w-[40%]">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold tracking-wide ${isLight ? 'text-[#1C1917]' : 'text-white'}`}>
                {t('reviews.googleScore')}
              </span>
              <ExternalLink className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
              }`} />
            </a>
          </div>
        </motion.div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-16">
          {REVIEWS.map((review, index) => (
            <motion.a
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1] 
              }}
              href={review.reviewUrl || GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-4 sm:p-5 rounded-md shadow-md flex flex-col justify-between space-y-3 border transition-all duration-200 hover:scale-[1.01] hover:shadow-lg cursor-pointer ${
                isLight
                  ? 'bg-[#FFFFFF] border-[#C8BCA8] hover:border-[#8A6310] shadow-amber-950/5'
                  : 'bg-[#0e0e0e] border-[#222222] hover:border-[#d4af37]/60'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className={`flex ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className={`text-[11px] font-medium ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                      {isGreek ? 'Κριτική Google' : 'Google Review'}
                    </span>
                    <ExternalLink className={`w-3 h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  </div>
                </div>

                <p className={`text-xs sm:text-sm font-normal leading-relaxed whitespace-pre-line ${
                  isLight ? 'text-[#2D2821]' : 'text-[#e0e0e0]'
                }`}>
                  "{review.quote}"
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
