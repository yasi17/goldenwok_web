import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Utensils, 
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, MenuCategory } from '../types';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

interface MenuSectionProps {
  onSelectDish: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { language, t } = useLanguage();
  const isGreek = language === 'el';

  const [activeCuisineTab, setActiveCuisineTab] = useState<'chinese' | 'japanese'>('chinese');
  const chineseCategories: { id: MenuCategory; name: string; nameEl: string }[] = [
    { id: 'chinese-appetizers', name: 'Appetizers & Bao Buns', nameEl: 'Ορεκτικά & Bao Buns' },
    { id: 'chinese-soups', name: 'Soups', nameEl: 'Σούπες' },
    { id: 'chinese-salads', name: 'Salads & Edamame', nameEl: 'Σαλάτες & Edamame' },
    { id: 'chinese-vegetables', name: 'Vegetarian Dishes', nameEl: 'Χορτοφαγικά Πιάτα' },
    { id: 'chinese-rice-noodles', name: 'Rice & Noodles', nameEl: 'Ρύζι & Ζυμαρικά' },
    { id: 'chinese-duck', name: 'Roast & Peking Duck', nameEl: 'Πάπια & Πάπια Πεκίνου' },
    { id: 'chinese-chicken', name: 'Chicken Dishes', nameEl: 'Πιάτα με Κοτόπουλο' },
    { id: 'chinese-pork', name: 'Pork Dishes', nameEl: 'Πιάτα με Χοιρινό' },
    { id: 'chinese-beef', name: 'Beef Dishes', nameEl: 'Πιάτα με Μοσχάρι' },
    { id: 'chinese-seafood', name: 'Shrimps & Seafood', nameEl: 'Γαρίδες & Θαλασσινά' },
    { id: 'chinese-desserts', name: 'Desserts & Ice Cream', nameEl: 'Επιδόρπια & Παγωτό' }
  ];

  const japaneseCategories: { id: MenuCategory; name: string; nameEl: string }[] = [
    { id: 'sushi-nigiri-sashimi', name: 'Nigiri & Sashimi (6 pcs)', nameEl: 'Nigiri & Sashimi (6 τμχ)' },
    { id: 'sushi-maki', name: 'Maki (8 pcs)', nameEl: 'Maki (8 τμχ)' },
    { id: 'sushi-fried-maki', name: 'Fried Maki (8 pcs)', nameEl: 'Τηγανητά Maki (8 τμχ)' },
    { id: 'sushi-sets', name: 'Sushi Sets & Combos', nameEl: 'Συνδυασμοί & Sushi Sets' },
    { id: 'japanese-salads', name: 'Salads & Wakame', nameEl: 'Σαλάτες & Wakame' },
    { id: 'japanese-soups', name: 'Soups & Udon', nameEl: 'Σούπες Miso & Udon' }
  ];

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('chinese-appetizers');

  const availableCategories = useMemo(() => {
    if (activeCuisineTab === 'chinese') {
      return chineseCategories;
    }
    return japaneseCategories;
  }, [activeCuisineTab]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Filter by cuisine tab
      if (item.cuisine !== activeCuisineTab) {
        return false;
      }
      // Filter by category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [activeCuisineTab, selectedCategory]);

  return (
    <section id="menu" className={`py-20 sm:py-28 relative border-b transition-colors duration-300 ${
      isLight ? 'bg-[#EFE8DD] border-[#C8BCA8]/40' : 'bg-[#050505] border-[#d4af37]/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4"
        >
          <div className={`inline-flex items-center space-x-2 font-semibold text-xs tracking-[0.25em] uppercase ${
            isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
          }`}>
            <Utensils className="w-3.5 h-3.5" />
            <span>{t('menu.badge')}</span>
          </div>
          <h2 className={`font-serif-heading text-3xl sm:text-5xl font-bold ${
            isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
          }`}>
            {t('menu.title')}
          </h2>
          <p className={`text-sm sm:text-base font-light ${
            isLight ? 'text-[#574F44]' : 'text-[#bbbbbb]'
          }`}>
            {t('menu.subtitle')}
          </p>
        </motion.div>

        {/* Cuisine Selector Tabs: Chinese Menu / Japanese Sushi Menu */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className={`p-1.5 rounded-2xl border flex items-center space-x-2 shadow-inner ${
            isLight ? 'bg-[#E5DCD0] border-[#C8BCA8]' : 'bg-[#111111] border-[#d4af37]/30'
          }`}>
            <button
              id="tab-cuisine-chinese"
              onClick={() => {
                setActiveCuisineTab('chinese');
                setSelectedCategory('chinese-appetizers');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                activeCuisineTab === 'chinese'
                  ? isLight
                    ? 'bg-[#FAF6EE] text-[#8A6310] shadow-md'
                    : 'bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black shadow-md'
                  : isLight
                    ? 'text-[#5A5248] hover:text-[#1C1917]'
                    : 'text-[#9E9589] hover:text-white'
              }`}
            >
              <span>🥡 {isGreek ? 'Κινέζικο Μενού' : 'Chinese Menu'}</span>
              <span className="font-chinese text-xs opacity-75">中餐</span>
            </button>
            <button
              id="tab-cuisine-japanese"
              onClick={() => {
                setActiveCuisineTab('japanese');
                setSelectedCategory('sushi-nigiri-sashimi');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                activeCuisineTab === 'japanese'
                  ? isLight
                    ? 'bg-[#FAF6EE] text-[#8A6310] shadow-md'
                    : 'bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black shadow-md'
                  : isLight
                    ? 'text-[#5A5248] hover:text-[#1C1917]'
                    : 'text-[#9E9589] hover:text-white'
              }`}
            >
              <span>🍣 {isGreek ? 'Sushi & Ιαπωνικό' : 'Japanese & Sushi'}</span>
              <span className="font-chinese text-xs opacity-75">日料</span>
            </button>
          </div>
        </motion.div>

        {/* Category Filter Toolbar in Rounded Square (Squircle) Grid / Wrap Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {availableCategories.map((cat) => {
              const count = MENU_ITEMS.filter(m => m.category === cat.id).length;
              const displayName = isGreek ? cat.nameEl : cat.name;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`menu-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-xs tracking-tight transition-all duration-200 flex items-center space-x-2 cursor-pointer shadow-sm active:scale-95 ${
                    isSelected
                      ? isLight
                        ? 'bg-[#FAF6EE] text-[#8A6310] border-2 border-[#8A6310] shadow-md font-bold scale-[1.02]'
                        : 'bg-[#181818] text-[#fbf5b7] border-2 border-[#d4af37] shadow-lg shadow-amber-950/30 font-bold scale-[1.02]'
                      : isLight
                        ? 'bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] text-[#5A5248] hover:text-[#1C1917] border border-[#C8BCA8] hover:border-[#8A6310]/60'
                        : 'bg-[#0e0e0e]/90 hover:bg-[#161616] text-[#A09A90] hover:text-[#FAF6EE] border border-[#d4af37]/25 hover:border-[#d4af37]/60'
                  }`}
                >
                  <span className="tracking-wide font-medium">{displayName}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-md transition-colors ${
                    isSelected
                      ? isLight
                        ? 'bg-[#8A6310]/15 text-[#8A6310]'
                        : 'bg-[#d4af37]/20 text-[#fbf5b7]'
                      : isLight
                        ? 'bg-[#EAE2D5] text-[#6B6154]'
                        : 'bg-[#1b1b1b] text-[#888888]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Counter */}
        <div className={`mb-6 flex justify-between items-center text-xs ${
          isLight ? 'text-[#6B6154]' : 'text-[#888888]'
        }`}>
          <span>
            {isGreek ? (
              <>Εμφάνιση <strong className={isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}>{filteredItems.length}</strong> πιάτων</>
            ) : (
              <>Showing <strong className={isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}>{filteredItems.length}</strong> dishes</>
            )}
          </span>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className={`text-center py-16 border rounded-2xl p-8 space-y-3 ${
            isLight ? 'bg-[#FAF6F0] border-[#C8BCA8]' : 'bg-[#0c0c0c] border-[#d4af37]/30'
          }`}>
            <Utensils className={`w-10 h-10 mx-auto ${isLight ? 'text-[#8C8275]' : 'text-[#555555]'}`} />
            <p className={`text-base font-medium ${isLight ? 'text-[#1C1917]' : 'text-[#ded6cb]'}`}>
              {t('menu.noResults')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const name = isGreek && item.nameEl ? item.nameEl : item.name;
              const description = isGreek && item.descriptionEl ? item.descriptionEl : item.description;

              return (
                <motion.div
                  key={item.id}
                  id={`dish-card-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
                  className={`group relative rounded-xl sm:rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isLight 
                      ? 'bg-[#FAF6EE] border-[#C8BCA8]/60 hover:border-[#8A6310]' 
                      : 'bg-[#0c0c0c] border-[#d4af37]/25 hover:border-[#d4af37]'
                  }`}
                  onClick={() => onSelectDish(item)}
                >
                  {/* Item Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/20 transform-gpu">
                    <img 
                      src={item.imageUrl} 
                      alt={name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Dish Number Code Badge (e.g. #01, #46, #121) */}
                    {item.code && (
                      <span className="absolute top-2.5 left-3 px-2 py-0.5 rounded-lg bg-black/80 border border-[#d4af37]/70 text-[#fbf5b7] font-mono text-xs font-black tracking-wider shadow-md backdrop-blur-sm">
                        #{item.code}
                      </span>
                    )}

                    {/* Chinese Characters Floating Watermark */}
                    <span className="absolute top-2.5 right-3 font-chinese text-xl sm:text-2xl text-[#d4af37]/90 select-none drop-shadow-md">
                      {item.chineseName}
                    </span>

                    {/* Special Badges */}
                    <div className="absolute bottom-2.5 left-3 flex flex-wrap gap-1">
                      {item.isChefSpecial && (
                        <span className="px-2 py-0.5 rounded-md bg-[#8A6310] text-[#fbf5b7] text-[10px] font-bold tracking-wider uppercase flex items-center space-x-1 shadow-sm">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{t('menu.chefSpecial')}</span>
                        </span>
                      )}
                      {item.isPopular && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-600/90 text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
                          ★ {t('menu.popular')}
                        </span>
                      )}
                      {item.spicyLevel && item.spicyLevel > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-red-900/90 text-red-100 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                          {'🌶️'.repeat(item.spicyLevel)}
                        </span>
                      )}
                    </div>

                    {/* Quick Preview Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                      <span className="p-2.5 rounded-full bg-black/80 border border-[#d4af37]/60 text-[#fbf5b7] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className={`font-serif-heading text-base sm:text-lg font-bold transition-colors line-clamp-2 ${
                          isLight 
                            ? 'text-[#1C1917] group-hover:text-[#8A6310]' 
                            : 'text-[#FAF6EE] group-hover:text-[#d4af37]'
                        }`}>
                          {name}
                        </h3>
                        <span className="font-mono font-bold text-base sm:text-lg text-[#8A6310] dark:text-[#d4af37] whitespace-nowrap">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className={`text-xs line-clamp-2 leading-relaxed ${
                        isLight ? 'text-[#574F44]' : 'text-[#9E9589]'
                      }`}>
                        {description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
