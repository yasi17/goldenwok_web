import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Menu as MenuIcon, 
  X, 
  ChevronRight,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const { language, toggleLanguage, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.menu'), href: '#menu' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.reviews'), href: '#reviews' },
    { name: t('nav.contact'), href: '#location' }
  ];

  return (
    <>
      {/* Main Sticky Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isLight
            ? isScrolled
              ? 'bg-[#F7F3EB]/95 backdrop-blur-md shadow-lg shadow-stone-900/5 border-b border-[#C8BCA8]/40 py-3'
              : 'bg-[#F7F3EB]/90 backdrop-blur-sm border-b border-[#C8BCA8]/30 py-4'
            : isScrolled 
              ? 'bg-black/95 backdrop-blur-md shadow-2xl shadow-black border-b border-[#d4af37]/30 py-3' 
              : 'bg-black/90 backdrop-blur-sm border-b border-[#d4af37]/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Small Brand Logo: 金 and 鼎 stacked vertically with GoldenWok underneath */}
          <a href="#" className="flex flex-col items-center group py-0.5" aria-label="金鼎 GoldenWok Home">
            <div className={`flex flex-col items-center leading-none transition-colors ${
              isLight ? 'text-[#8A6310] group-hover:text-[#B8860B]' : 'text-[#d4af37] group-hover:text-[#f3e5ab]'
            }`}>
              <span className="font-chinese text-2xl sm:text-2xl font-black tracking-widest leading-none drop-shadow">金</span>
              <span className="font-chinese text-2xl sm:text-2xl font-black tracking-widest leading-none drop-shadow mt-0.5">鼎</span>
            </div>
            <span className={`font-display text-[10px] sm:text-[11px] font-bold tracking-[0.25em] transition-colors mt-1 uppercase ${
              isLight ? 'text-[#8A6310] group-hover:text-[#B8860B]' : 'text-[#d4af37] group-hover:text-[#f3e5ab]'
            }`}>
              GoldenWok
            </span>
          </a>

          {/* Desktop Navigation Links with Spaced Letters */}
          <nav className={`hidden lg:flex items-center space-x-8 xl:space-x-10 text-sm font-medium tracking-[0.16em] ${
            isLight ? 'text-[#36322E]' : 'text-[#e5e5e5]'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative py-1 tracking-[0.16em] uppercase text-xs xl:text-sm font-medium transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] hover:after:w-full after:transition-all after:duration-300 ${
                  isLight 
                    ? 'hover:text-[#8A6310] after:bg-[#8A6310]' 
                    : 'hover:text-[#d4af37] after:bg-[#d4af37]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Theme Toggle, Reserve Table Button, and Language Switcher directly to the right */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Theme Toggle Button (Dark / Light) */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:px-3 sm:py-2 rounded-full border transition-all duration-300 flex items-center space-x-1.5 cursor-pointer text-xs font-semibold uppercase tracking-wider ${
                isLight
                  ? 'bg-[#EFE8DC] hover:bg-[#E5DDCF] text-[#4A4238] border-[#C8BCA8]'
                  : 'bg-[#141414] hover:bg-[#202020] text-[#d4af37] border-[#d4af37]/40'
              }`}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {isLight ? (
                <>
                  <Moon className="w-4 h-4 text-[#8A6310]" />
                  <span className="hidden md:inline text-[11px] text-[#4A4238]">{t('nav.theme.dark')}</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-[#f5e298]" />
                  <span className="hidden md:inline text-[11px] text-[#e0e0e0]">{t('nav.theme.light')}</span>
                </>
              )}
            </button>

            {/* Reserve Table Button (Hidden on mobile as bottom floating action button is present) */}
            <button
              id="nav-reserve-btn"
              onClick={onOpenReservation}
              className="hidden md:flex px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-sm bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black text-xs sm:text-sm font-bold tracking-widest uppercase shadow-lg shadow-black/20 hover:brightness-110 items-center space-x-1.5 sm:space-x-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
              <span>{t('nav.reserve')}</span>
            </button>

            {/* Language Switcher Toggle Button (Placed directly to the RIGHT of Reserve Table) */}
            <button
              id="nav-language-toggle"
              onClick={toggleLanguage}
              className={`px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-sm border transition-all duration-300 flex items-center space-x-1 cursor-pointer text-[11px] sm:text-xs font-bold tracking-wider shadow-sm hover:scale-105 ${
                isLight
                  ? 'bg-[#EFE8DC] hover:bg-[#E2D8C7] text-[#1C1917] border-[#C8BCA8]'
                  : 'bg-[#181818] hover:bg-[#252525] text-[#fbf5b7] border-[#d4af37]/50'
              }`}
              title={language === 'el' ? 'Switch to English' : 'Αλλαγή σε Ελληνικά'}
              aria-label="Toggle Language"
            >
              <Globe className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
              <div className="flex items-center space-x-0.5">
                <span className={language === 'el' ? 'font-black underline underline-offset-2' : 'opacity-60'}>ΕΛ</span>
                <span className="opacity-40 text-[10px]">/</span>
                <span className={language === 'en' ? 'font-black underline underline-offset-2' : 'opacity-60'}>EN</span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-sm border cursor-pointer ${
                isLight
                  ? 'bg-[#EFE8DC] text-[#4A4238] border-[#C8BCA8]'
                  : 'bg-[#141414] text-[#d4af37] hover:text-white border-[#d4af37]/40'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-50 lg:hidden flex flex-col justify-between backdrop-blur-xl animate-in fade-in duration-200 ${
          isLight ? 'bg-[#F7F3EB]/98 text-[#1C1917]' : 'bg-black/98 text-[#f0f0f0]'
        }`}>
          <div className={`p-5 border-b flex items-center justify-between ${
            isLight ? 'border-[#C8BCA8]/40' : 'border-[#d4af37]/30'
          }`}>
            <div className="flex flex-col items-center">
              <div className={`flex flex-col items-center leading-none ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                <span className="font-chinese text-xl font-black tracking-widest leading-none">金</span>
                <span className="font-chinese text-xl font-black tracking-widest leading-none mt-0.5">鼎</span>
              </div>
              <span className={`font-display text-[10px] font-bold tracking-[0.2em] mt-1 uppercase ${
                isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
              }`}>
                GoldenWok
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Language Switcher in Mobile Drawer */}
              <button
                onClick={toggleLanguage}
                className={`p-2 rounded-sm border text-xs font-bold flex items-center space-x-1.5 ${
                  isLight ? 'bg-[#EFE8DC] text-[#1C1917] border-[#C8BCA8]' : 'bg-[#141414] text-[#fbf5b7] border-[#d4af37]/40'
                }`}
              >
                <Globe className={`w-3 h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                <span>{language === 'el' ? 'ΕΛ' : 'EN'}</span>
              </button>

              {/* Theme Toggle in Mobile Drawer */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border text-xs font-semibold flex items-center space-x-1.5 ${
                  isLight ? 'bg-[#EFE8DC] text-[#4A4238] border-[#C8BCA8]' : 'bg-[#141414] text-[#d4af37] border-[#d4af37]/40'
                }`}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="text-[11px]">{isLight ? t('nav.theme.dark') : t('nav.theme.light')}</span>
              </button>

              <button 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 rounded-sm border ${
                  isLight ? 'bg-[#EFE8DC] text-[#4A4238] border-[#C8BCA8]' : 'bg-[#141414] text-[#d4af37] border-[#d4af37]/30'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-sm text-sm font-medium tracking-[0.15em] uppercase transition-colors border-b ${
                    isLight 
                      ? 'text-[#2B2724] hover:text-[#8A6310] hover:bg-[#EFE8DC] border-[#E5DDCF]' 
                      : 'text-[#e5e5e5] hover:text-[#d4af37] hover:bg-[#141414] border-[#222222]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                </a>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-4 rounded-sm bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-bold uppercase tracking-widest text-sm shadow-xl flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>{t('nav.reserve')}</span>
              </button>
            </div>
          </div>

          <div className={`p-5 border-t text-xs space-y-1 text-center ${
            isLight ? 'bg-[#EFE8DC] border-[#C8BCA8]/30 text-[#6B6154]' : 'bg-[#050505] border-[#d4af37]/20 text-[#a0a0a0]'
          }`}>
            <p className={`font-semibold ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>L. Andrea Sygrou 207, Nea Smyrni 171 21</p>
            <p>+30 210 934 5137 • goldenwok207@gmail.com</p>
          </div>
        </div>
      )}
    </>
  );
};
