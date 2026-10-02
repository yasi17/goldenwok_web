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
  const ingredients = isGreek && dish.ingredientsEl ? dish.ingredientsEl : dish.ingredients;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-8 border transition-colors p-6 sm:p-8 ${
          isLight ? 'bg-[#FAF6EE] border-[#C8BCA8]' : 'bg-[#0f0f0f] border-[#d4af37]/50'
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

        {/* Header Tags & Badges */}
        <div className="flex flex-wrap items-center gap-2 pr-10 mb-4">
          {dish.code && (
            <span className={`px-2.5 py-1 rounded-lg font-mono text-sm font-black shadow-sm ${
              isLight 
                ? 'bg-[#EAE2D5] text-[#8A6310] border border-[#8A6310]/30' 
                : 'bg-[#1b1b1b] text-[#fbf5b7] border border-[#d4af37]/60'
            }`}>
              #{dish.code}
            </span>
          )}

          <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
            isLight ? 'bg-[#E5DCD0] text-[#5A5248]' : 'bg-[#181818] text-[#c4b9a3]'
          }`}>
            {dish.cuisine === 'chinese' 
              ? (isGreek ? '🥡 Κινέζικο Μενού' : '🥡 Chinese Menu')
              : (isGreek ? '🍣 Sushi & Ιαπωνικό' : '🍣 Japanese & Sushi')
            }
          </span>

          {dish.isChefSpecial && (
            <span className="px-2.5 py-0.5 rounded-md bg-[#8A6310] text-[#fbf5b7] text-xs font-bold tracking-wider uppercase flex items-center space-x-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#fbf5b7]" />
              <span>{t('menu.chefsChoice')}</span>
            </span>
          )}

          {dish.isPopular && (
            <span className="px-2 py-0.5 rounded-md bg-amber-600/90 text-white text-xs font-bold tracking-wider uppercase shadow-sm">
              ★ {t('menu.popular')}
            </span>
          )}

          {dish.spicyLevel && dish.spicyLevel > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-red-900/80 text-red-100 text-xs font-bold border border-red-500/30">
              {'🌶️'.repeat(dish.spicyLevel)}
            </span>
          )}
        </div>

        {/* Title & Price */}
        <div className={`border-b pb-4 mb-4 ${
          isLight ? 'border-[#E5DDCF]' : 'border-[#222222]'
        }`}>
          <div className="flex justify-between items-start gap-4">
            <h3 className={`font-serif-heading text-xl sm:text-2xl font-bold leading-tight ${
              isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
            }`}>
              {dishName}
            </h3>
            <span className={`text-2xl font-bold font-mono whitespace-nowrap ${
              isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
            }`}>
              €{dish.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className={`text-sm sm:text-base font-light leading-relaxed ${
            isLight ? 'text-[#3E3830]' : 'text-[#cccccc]'
          }`}>
            {dishDesc}
          </p>

          {/* Ingredients list if present */}
          {ingredients && ingredients.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
              }`}>
                {isGreek ? 'Κύρια Συστατικά' : 'Key Ingredients'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {ingredients.map((ing, i) => (
                  <span 
                    key={i} 
                    className={`text-xs px-2.5 py-1 rounded-md border ${
                      isLight 
                        ? 'bg-[#FAF6F0] text-[#5A5248] border-[#C8BCA8]' 
                        : 'bg-[#141414] text-[#a8a196] border-[#2c2c2c]'
                    }`}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dietary Tags if present */}
          {dish.dietary && dish.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {dish.dietary.map((d, i) => (
                <span 
                  key={i}
                  className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                    isLight 
                      ? 'bg-[#EAE2D5] text-[#6B6154]' 
                      : 'bg-[#1b1b1b] text-[#888888]'
                  }`}
                >
                  ✓ {d}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
