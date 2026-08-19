import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Camera, X, Eye, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PHOTOS } from '../data/restaurantData';
import { GalleryPhoto } from '../types';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

export const AtmosphereGallery: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [, setIsHovered] = useState(false);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalPhotos = GALLERY_PHOTOS.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPhotos);
  }, [totalPhotos]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  }, [totalPhotos]);

  const handleSelectIndex = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Preload adjacent images in browser cache for instant lag-free mobile transitions
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % totalPhotos;
    const prevIdx = (currentIndex - 1 + totalPhotos) % totalPhotos;
    const nextImg = new Image();
    nextImg.src = GALLERY_PHOTOS[nextIdx].imageUrl;
    const prevImg = new Image();
    prevImg.src = GALLERY_PHOTOS[prevIdx].imageUrl;
  }, [currentIndex, totalPhotos]);

  // Touch Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhoto) {
        if (e.key === 'ArrowRight') handleLightboxNext();
        else if (e.key === 'ArrowLeft') handleLightboxPrev();
        else if (e.key === 'Escape') setActivePhoto(null);
      } else {
        if (e.key === 'ArrowRight') handleNext();
        else if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, handleNext, handlePrev]);

  // Lightbox handlers
  const handleLightboxNext = () => {
    if (!activePhoto) return;
    const currIdx = GALLERY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
    const nextIdx = (currIdx + 1) % totalPhotos;
    setActivePhoto(GALLERY_PHOTOS[nextIdx]);
  };

  const handleLightboxPrev = () => {
    if (!activePhoto) return;
    const currIdx = GALLERY_PHOTOS.findIndex((p) => p.id === activePhoto.id);
    const prevIdx = (currIdx - 1 + totalPhotos) % totalPhotos;
    setActivePhoto(GALLERY_PHOTOS[prevIdx]);
  };

  // Compute 3 visible photos: Left, Center, Right
  const leftIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % totalPhotos;

  const leftPhoto = GALLERY_PHOTOS[leftIndex];
  const centerPhoto = GALLERY_PHOTOS[centerIndex];
  const rightPhoto = GALLERY_PHOTOS[rightIndex];

  // Fast GPU-accelerated motion animation variants for center card
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 0.28, ease: 'easeOut' },
        opacity: { duration: 0.25, ease: 'easeOut' },
        scale: { duration: 0.28, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    }),
  };

  const sideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 25 : -25,
      opacity: 0.4,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.28,
        ease: 'easeOut',
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -25 : 25,
      opacity: 0.4,
      transition: {
        duration: 0.2,
      },
    }),
  };

  return (
    <section
      id="gallery"
      className={`py-16 sm:py-24 relative overflow-hidden border-b transition-colors duration-300 ${
        isLight ? 'bg-[#EFE8DD] border-[#C8BCA8]/40' : 'bg-[#060606] border-[#d4af37]/20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle decorative background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#d4af37]/5 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5"
        >
          <div
            className={`inline-flex items-center space-x-2 font-semibold text-xs tracking-[0.25em] uppercase ${
              isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t('gallery.badge')}</span>
          </div>
          <h2
            className={`font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight ${
              isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
            }`}
          >
            {t('gallery.title')}
          </h2>
          <p
            className={`text-sm sm:text-base max-w-xl mx-auto ${
              isLight ? 'text-[#5A5248]' : 'text-[#A09A90]'
            }`}
          >
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* 3-Image Carousel Stage matching exact reference layout */}
        <div 
          className="relative max-w-5xl mx-auto touch-pan-y select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* Navigation Controls (Floating side arrows) */}
          <button
            id="atmosphere-gallery-prev-btn"
            onClick={handlePrev}
            aria-label="Previous photo"
            className={`absolute left-2 sm:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full border shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
              isLight
                ? 'bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#1C1917] border-[#C8BCA8] hover:border-[#8A6310] shadow-black/10'
                : 'bg-[#141414]/90 hover:bg-[#1f1f1f] text-[#fbf5b7] border-[#d4af37]/40 hover:border-[#d4af37] shadow-black/60'
            }`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          <button
            id="atmosphere-gallery-next-btn"
            onClick={handleNext}
            aria-label="Next photo"
            className={`absolute right-2 sm:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full border shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
              isLight
                ? 'bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#1C1917] border-[#C8BCA8] hover:border-[#8A6310] shadow-black/10'
                : 'bg-[#141414]/90 hover:bg-[#1f1f1f] text-[#fbf5b7] border-[#d4af37]/40 hover:border-[#d4af37] shadow-black/60'
            }`}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* 3 Photos Grid / Flex Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            
            {/* Left Photo (Previous item, slightly smaller, rounded-3xl) */}
            <div
              onClick={handlePrev}
              className="hidden md:block relative aspect-[3/4] rounded-[24px] lg:rounded-[30px] overflow-hidden cursor-pointer group shadow-lg transition-transform duration-300 hover:scale-[1.03]"
              title={leftPhoto.title}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={leftPhoto.id}
                  custom={direction}
                  variants={sideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full relative transform-gpu will-change-transform"
                >
                  <img
                    src={leftPhoto.imageUrl}
                    alt={leftPhoto.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover brightness-[0.82] group-hover:brightness-100 group-hover:scale-105 transition-all duration-500 transform-gpu"
                  />
                  {/* Subtle directional hint overlay on hover */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronLeft className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Center Photo (Main In-Focus Card, Taller/Prominent, rounded-3xl) */}
            <div
              className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-2xl group cursor-pointer border-2 transition-all duration-300 transform-gpu"
              style={{
                borderColor: isLight ? '#C8BCA8' : '#d4af37',
              }}
              onClick={() => setActivePhoto(centerPhoto)}
              title={`${centerPhoto.title} (Click to zoom)`}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={centerPhoto.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full relative transform-gpu will-change-transform"
                >
                  <img
                    src={centerPhoto.imageUrl}
                    alt={centerPhoto.title}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out transform-gpu"
                  />

                  {/* Top Right Zoom Icon on hover */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 sm:p-2.5 rounded-full bg-black/70 backdrop-blur-md text-[#fbf5b7] border border-[#d4af37]/40 shadow-lg group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-black transition-all duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Photo (Next item, slightly smaller, rounded-3xl) */}
            <div
              onClick={handleNext}
              className="hidden md:block relative aspect-[3/4] rounded-[24px] lg:rounded-[30px] overflow-hidden cursor-pointer group shadow-lg transition-transform duration-300 hover:scale-[1.03]"
              title={rightPhoto.title}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={rightPhoto.id}
                  custom={direction}
                  variants={sideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full relative transform-gpu will-change-transform"
                >
                  <img
                    src={rightPhoto.imageUrl}
                    alt={rightPhoto.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover brightness-[0.82] group-hover:brightness-100 group-hover:scale-105 transition-all duration-500 transform-gpu"
                  />
                  {/* Subtle directional hint overlay on hover */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Carousel Pagination Dots & Index Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-8">
            
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {GALLERY_PHOTOS.map((photo, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={photo.id}
                    onClick={() => handleSelectIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? isLight
                          ? 'w-8 bg-[#8A6310]'
                          : 'w-8 bg-[#d4af37]'
                        : isLight
                        ? 'w-2.5 bg-[#C8BCA8] hover:bg-[#8A6310]/60'
                        : 'w-2.5 bg-white/20 hover:bg-[#d4af37]/60'
                    }`}
                  />
                );
              })}
            </div>

            {/* Numeric Counter badge */}
            <div
              className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
                isLight
                  ? 'bg-[#FAF6EE] text-[#5A5248] border-[#C8BCA8]'
                  : 'bg-[#141414] text-[#d4af37] border-[#d4af37]/30'
              }`}
            >
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalPhotos).padStart(2, '0')}
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0a0a0a] border border-[#d4af37]/60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/80 hover:bg-[#d4af37] text-white hover:text-black border border-[#d4af37]/40 cursor-pointer transition-colors"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons inside Modal */}
            <button
              onClick={handleLightboxPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/80 hover:bg-[#d4af37] text-white hover:text-black border border-[#d4af37]/40 cursor-pointer transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleLightboxNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/80 hover:bg-[#d4af37] text-white hover:text-black border border-[#d4af37]/40 cursor-pointer transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Photo Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/11] max-h-[85vh] w-full bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
