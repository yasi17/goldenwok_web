import React from 'react';
import { 
  ArrowRight, 
  Utensils, 
  Phone, 
  Sparkles,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { language, t } = useLanguage();
  const isGreek = language === 'el';

  return (
    <section className={`relative min-h-[75vh] lg:min-h-[80vh] flex flex-col justify-between overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-[#F7F3EB]' : 'bg-black'
    }`}>
      {/* Cinematic Background with Atmospheric Layers */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background Image */}
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczOuRClFpHuJBEleSeEAKDI6gSNEDsw13t4LYgYHlIAyHCvmP1pZRipJ4bu7FbkQcrIQFt2s7iMs_QpkLSXzt0rx5lFtnXX82wKwLxrPGrJTAp3-mTI=w900-rw"
          alt="GoldenWok Atmosphere Mobile"
          loading="eager"
          decoding="async"
          className={`block sm:hidden w-full h-full object-cover object-center transform-gpu filter ${
            isLight ? 'brightness-[0.52] contrast-[1.08]' : 'brightness-[0.40] contrast-[1.12]'
          }`}
        />
        {/* Tablet & Desktop Background Image */}
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczNz7sK9xc34gonPucn75OKpCVkP7bnKTGTE6HCBwZHBKusoRv5iME6U5WCRj44RaR5x3iZrzY4CjdzzzWRQOuGDPLlAtdbX1lu4MzIrbWSei14M1gQ=w1920-rw"
          alt="GoldenWok Restaurant Exterior"
          loading="eager"
          decoding="async"
          className={`hidden sm:block w-full h-full object-cover object-center scale-105 transform-gpu filter ${
            isLight ? 'brightness-[0.52] contrast-[1.08]' : 'brightness-[0.40] contrast-[1.12]'
          }`}
        />
        {/* Atmospheric overlays */}
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isLight 
            ? 'from-[#F7F3EB] via-black/45 sm:via-black/55 to-black/65 sm:to-black/70' 
            : 'from-black via-black/55 sm:via-black/65 to-black/70 sm:to-black/75'
        }`}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-black/85"></div>
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 flex-1 flex flex-col justify-center">
        {/* Hero Top Grid: Logo on Left, Buffet on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-6 sm:mb-8">
          
          {/* Left Column: Pure Brand Typography Lockup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-start justify-center"
          >
            <div className={`flex flex-col items-start leading-none drop-shadow-2xl ${
              isLight ? 'text-[#fbf5b7]' : 'text-[#d4af37]'
            }`}>
              <span className="font-chinese text-6xl sm:text-8xl lg:text-9xl font-black tracking-widest leading-none">
                金
              </span>
              <span className="font-chinese text-6xl sm:text-8xl lg:text-9xl font-black tracking-widest leading-none mt-1">
                鼎
              </span>
            </div>
            <span className={`font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.25em] drop-shadow-lg mt-3 uppercase ${
              isLight ? 'text-[#fbf5b7]' : 'text-[#d4af37]'
            }`}>
              GoldenWok
            </span>

            {/* Primary Action Button placed on the left column */}
            <div className="pt-6">
              <button
                onClick={onExploreMenu}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-sm bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-black/80 hover:brightness-110 flex items-center space-x-2.5 transition-all duration-300 hover:translate-y-[-1px] cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-black" />
                <span>{t('hero.exploreMenu')}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Buffet - All You Can Eat Schedule & Pricing */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-end lg:pt-14"
          >
            <div className="space-y-3 py-1 text-left">
              <div className="flex items-center space-x-2 pb-1 border-b border-[#d4af37]/30">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#fbf5b7] font-serif-heading">
                  {isGreek ? 'Μπουφές — All You Can Eat' : 'Buffet — All You Can Eat'}
                </h3>
              </div>

              {/* Schedule lines */}
              <div className="space-y-1.5 text-xs sm:text-sm text-stone-200">
                <div className="flex items-center space-x-2">
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Τρίτη' : 'Tuesday'}</span>
                  <span className="text-stone-300">19:00 - 23:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">16€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Τετάρτη' : 'Wednesday'}</span>
                  <span className="text-stone-300">19:00 - 23:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">16€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Πέμπτη' : 'Thursday'}</span>
                  <span className="text-stone-300">19:00 - 23:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">16€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Παρασκευή' : 'Friday'}</span>
                  <span className="text-stone-300">19:00 - 23:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">17€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Σάββατο' : 'Saturday'}</span>
                  <span className="text-stone-300">19:00 - 23:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">18€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Κυριακή' : 'Sunday'}</span>
                  <span className="text-stone-300">13:30 - 19:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">18€</span>
                </div>
              </div>

              {/* Takeaway Box Highlight */}
              <div className="py-1 px-2.5 rounded bg-black/40 border border-[#d4af37]/40 flex items-center justify-between text-xs text-[#fbf5b7] font-medium">
                <span>🥡 {isGreek ? 'Takeaway Box (Πακέτο)' : 'Takeaway Box'}</span>
                <span className="font-bold font-mono text-sm">{isGreek ? '7€ / κουτί' : '7€ / box'}</span>
              </div>

              {/* Kids & Notice */}
              <div className="pt-2 text-xs sm:text-sm text-stone-300 space-y-1">
                <p>
                  {isGreek ? (
                    <>Για παιδιά <span className="font-bold text-[#fbf5b7]">6 έως 12 ετών: 12€</span> και <span className="font-bold text-[#fbf5b7]">κάτω των 6 ετών είναι δωρεάν!</span></>
                  ) : (
                    <>For children <span className="font-bold text-[#fbf5b7]">6 to 12 years old: 12€</span> and <span className="font-bold text-[#fbf5b7]">under 6 years old is free!</span></>
                  )}
                </p>
                <p className="text-[#fbf5b7] font-medium tracking-wide">
                  {isGreek ? 'Για παραγγελίες & πληροφορίες καλέστε μας:' : 'For takeout orders & inquiries:'}
                </p>
                <p className="pt-0.5">
                  <a 
                    href="tel:+302109345137" 
                    className="inline-flex items-center space-x-1.5 text-white hover:text-[#fbf5b7] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#fbf5b7]" />
                    <span className="font-bold text-base tracking-wide text-white underline decoration-[#fbf5b7]/50 underline-offset-4 hover:decoration-[#fbf5b7]">210 934 5137</span>
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Order Now (Takeaway & Online Delivery) Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-4 sm:mt-6 w-full max-w-4xl backdrop-blur-xl border p-4 sm:p-5 rounded-sm shadow-2xl transition-all duration-300 ${
            isLight
              ? 'bg-[#FFFFFF]/95 border-[#C8BCA8] text-[#1C1917] shadow-stone-900/10'
              : 'bg-[#0d0d0d]/95 border-[#d4af37]/40 text-[#f0f0f0] shadow-black'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <ShoppingBag className={`w-4 h-4 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                <h4 className={`text-sm sm:text-base font-bold uppercase tracking-wider ${
                  isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
                }`}>
                  Order Now (Takeaway & Delivery)
                </h4>
              </div>
              <p className={`text-xs leading-relaxed max-w-2xl ${
                isLight ? 'text-[#574F44]' : 'text-[#cccccc]'
              }`}>
                {isGreek ? (
                  <>
                    Το εστιατόριό μας παρέχει υπηρεσίες takeaway. Μπορείτε απλά να δώσετε την παραγγελία σας τηλεφωνικά (καλέστε μας στο{' '}
                    <a 
                      href="tel:2109345137" 
                      className={`underline font-bold transition-colors ${
                        isLight ? 'text-[#8A6310] hover:text-[#1C1917]' : 'text-[#d4af37] hover:text-[#fbf5b7]'
                      }`}
                    >
                      210 934 5137
                    </a>
                    {' '}) και να την παραλάβετε απευθείας από το κατάστημά μας. Εναλλακτικά, μπορείτε να παραγγείλετε μέσω των εφαρμογών Wolt, e-food και Box.
                  </>
                ) : (
                  <>
                    Our restaurant provides takeaway services; you may simply place your order by phone (call us{' '}
                    <a 
                      href="tel:2109345137" 
                      className={`underline font-bold transition-colors ${
                        isLight ? 'text-[#8A6310] hover:text-[#1C1917]' : 'text-[#d4af37] hover:text-[#fbf5b7]'
                      }`}
                    >
                      210 934 5137
                    </a>
                    {' '}) and collect it directly from our premises. Alternatively, you can place your order through the Wolt, e-food, and Box applications.
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href="https://www.e-food.gr/delivery/nea-smurni/golden-wok-8734941"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-sm bg-[#e23838] hover:bg-[#ff4b4b] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:scale-105"
              >
                <span>efood</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/90" />
              </a>
              <a
                href="https://wolt.com/el/grc/athens/restaurant/golden-wok-neasmirni"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-sm bg-[#009de0] hover:bg-[#00b4f0] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:scale-105"
              >
                <span>Wolt</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/90" />
              </a>
              <a
                href="https://box.gr/delivery/nea-smyrni/golden-wok"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-sm bg-[#f2a900] hover:bg-[#ffbb1a] text-black text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 shadow-md hover:scale-105"
              >
                <span>BOX</span>
                <ExternalLink className="w-3.5 h-3.5 text-black/80" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
