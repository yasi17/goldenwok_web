import React from 'react';
import { 
  X, 
  Sparkles 
} from 'lucide-react';
import { MenuItem } from '../types';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { language, t } = useLanguage();
  const isGreek = language === 'el';

  if (!dish) return null;

  const dishName = isGreek && dish.nameEl ? dish.nameEl : dish.name;
  const dishDesc = isGreek && dish.descriptionEl ? dish.descriptionEl : dish.description;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-8 border transition-colors ${
          isLight ? 'bg-[#FFFFFF] border-[#C8BCA8]' : 'bg-[#0a0a0a] border-[#d4af37]/60'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full border transition-colors cursor-pointer ${
            isLight 
              ? 'bg-[#FFFFFF]/90 hover:bg-[#8A6310] text-[#1C1917] hover:text-white border-[#C8BCA8]' 
              : 'bg-black/80 hover:bg-[#d4af37] text-[#cccccc] hover:text-black border-[#d4af37]/40'
          }`}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Dish Photo */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black transform-gpu">
          <img
            src={dish.imageUrl}
            alt={dishName}
            decoding="async"
            className="w-full h-full object-cover filter brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex items-center space-x-2">
            {dish.code && (
              <span className="px-2.5 py-1 rounded-lg bg-black/90 border border-[#d4af37]/80 text-[#fbf5b7] font-mono text-sm font-black shadow-md">
                #{dish.code}
              </span>
            )}
            <span className="px-3 py-1 rounded-lg bg-black/90 border border-[#d4af37]/50 text-[#d4af37] font-chinese text-sm font-bold">
              {dish.chineseName}
            </span>
            {dish.isChefSpecial && (
              <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black text-xs font-black uppercase tracking-wider flex items-center space-x-1 shadow-md">
                <Sparkles className="w-3 h-3 text-black" />
                <span>{t('menu.chefsChoice')}</span>
              </span>
            )}
            {dish.spicyLevel && dish.spicyLevel > 0 && (
              <span className="px-2 py-0.5 rounded-lg bg-red-950/90 text-red-200 text-xs font-bold border border-red-500/40">
                {'🌶️'.repeat(dish.spicyLevel)}
              </span>
            )}
          </div>
        </div>

        {/* Content Body: Name & Description & Ingredients */}
        <div className="p-6 sm:p-8 space-y-4">
          {/* Title & Price Header */}
          <div className={`flex items-baseline justify-between gap-3 border-b pb-4 ${
            isLight ? 'border-[#E5DDCF]' : 'border-[#1c1c1c]'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                {dish.code && (
                  <span className={`text-base sm:text-lg font-mono font-bold ${
                    isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
                  }`}>
                    #{dish.code}
                  </span>
                )}
                <h3 className={`font-serif-heading text-xl sm:text-2xl font-bold ${
                  isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
                }`}>
                  {dishName}
                </h3>
              </div>
              <p className={`text-xs uppercase tracking-widest font-bold mt-1 ${
                isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
              }`}>
                {dish.cuisine === 'chinese' ? '🥡 Chinese Cuisine' : '🍣 Japanese / Sushi'}
              </p>
            </div>
            <div className={`text-2xl font-bold font-serif-heading flex-shrink-0 ${
              isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
            }`}>
              €{dish.price.toFixed(2)}
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm sm:text-base font-light leading-relaxed ${
            isLight ? 'text-[#3E3830]' : 'text-[#cccccc]'
          }`}>
            {dishDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
