import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  Car, 
  Train, 
  ExternalLink,
  Compass
} from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import { InteractiveMap } from './InteractiveMap';

export const LocationAndHours: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { language, t } = useLanguage();
  const isGreek = language === 'el';

  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Athens, Greece timezone (Europe/Athens)
      const now = new Date();
      const athensTimeStr = now.toLocaleTimeString('en-GB', { 
        timeZone: 'Europe/Athens',
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setCurrentTimeStr(athensTimeStr);
      
      // Get current day in Athens (0 = Sun, 1 = Mon, 2 = Tue, ...)
      const athensDay = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Athens',
        weekday: 'short'
      }).format(now);

      const [hourStr, minuteStr] = athensTimeStr.split(':');
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const currentTimeDecimal = hour + minute / 60;

      if (athensDay === 'Mon') {
        setIsOpen(false);
        setStatusMessage(
          isGreek 
            ? 'Κλειστά Σήμερα (Δευτέρα) • Ανοίγουμε ξανά την Τρίτη στις 13:00'
            : 'Closed Today (Monday) • Doors reopen Tuesday at 13:00'
        );
      } else if (athensDay === 'Sun') {
        // Sunday: 13:00 - 22:00
        if (currentTimeDecimal >= 13.0 && currentTimeDecimal < 22.0) {
          setIsOpen(true);
          setStatusMessage(
            isGreek
              ? 'Ανοιχτά Τώρα • Σάλα, Μπουφές & Takeaway (έως τις 22:00)'
              : 'Open Now • Full Dining, Buffet & Takeaway Service (until 22:00)'
          );
        } else if (currentTimeDecimal < 13.0) {
          setIsOpen(false);
          setStatusMessage(
            isGreek
              ? 'Κλειστά Τώρα • Ανοίγουμε σήμερα στις 13:00'
              : 'Closed Now • Doors open today at 13:00'
          );
        } else {
          setIsOpen(false);
          setStatusMessage(
            isGreek
              ? 'Κλειστά για σήμερα • Ανοίγουμε ξανά την Τρίτη στις 13:00'
              : 'Closed for the Night • Doors reopen Tuesday at 13:00'
          );
        }
      } else {
        // Tuesday through Saturday: 13:00 - 23:00
        if (currentTimeDecimal >= 13.0 && currentTimeDecimal < 23.0) {
          setIsOpen(true);
          setStatusMessage(
            isGreek
              ? 'Ανοιχτά Τώρα • Σάλα, Μπουφές & Takeaway (έως τις 23:00)'
              : 'Open Now • Full Dining, Buffet & Takeaway Service (until 23:00)'
          );
        } else if (currentTimeDecimal < 13.0) {
          setIsOpen(false);
          setStatusMessage(
            isGreek
              ? 'Κλειστά Τώρα • Ανοίγουμε σήμερα στις 13:00'
              : 'Closed Now • Doors open today at 13:00'
          );
        } else {
          setIsOpen(false);
          setStatusMessage(
            isGreek
              ? 'Κλειστά για σήμερα • Ανοίγουμε αύριο στις 13:00'
              : 'Closed for the Night • Doors open tomorrow at 13:00'
          );
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [isGreek]);

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Leoforos+Andrea+Siggrou+207+Nea+Smyrni+17121+Athens+Greece', '_blank');
  };

  const openAppleMaps = () => {
    window.open('https://maps.apple.com/?address=Leoforos+Andrea+Siggrou+207,Nea+Smyrni,17121,Athens,Greece&ll=37.9452,23.7153', '_blank');
  };

  return (
    <section id="location" className={`py-20 sm:py-28 relative transition-colors duration-300 ${
      isLight ? 'bg-[#F7F3EB]' : 'bg-[#000000]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className={`inline-flex items-center space-x-2 font-semibold text-xs tracking-[0.25em] uppercase ${
            isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
          }`}>
            <MapPin className="w-3.5 h-3.5" />
            <span>{isGreek ? 'Νέα Σμύρνη • Αθήνα, Ελλάδα' : 'Nea Smyrni • Athens, Greece'}</span>
          </div>
          <h2 className={`font-serif-heading text-3xl sm:text-5xl font-bold ${
            isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
          }`}>
            {t('location.title')}
          </h2>
          <p className={`text-sm sm:text-base font-light ${
            isLight ? 'text-[#574F44]' : 'text-[#bbbbbb]'
          }`}>
            {t('location.subtitle')}
          </p>
        </motion.div>

        {/* 2 Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Hours, Service Times & Transit */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            
            {/* Live Status Header Card */}
            <div className={`p-6 rounded-sm space-y-4 shadow-lg border ${
              isLight ? 'bg-[#FFFFFF] border-[#C8BCA8]' : 'bg-[#0d0d0d] border-[#262626]'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b ${
                isLight ? 'border-[#E5DDCF]' : 'border-[#1c1c1c]'
              }`}>
                <div className="flex items-center space-x-2.5">
                  <span className={`w-3 h-3 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : isLight ? 'bg-[#8A6310]' : 'bg-[#d4af37]'}`}></span>
                  <span className={`font-bold text-sm ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>
                    {isOpen ? t('hours.open') : t('hours.closed')}
                  </span>
                </div>
                <span className={`text-xs font-mono font-medium ${isLight ? 'text-[#8C8275]' : 'text-[#888888]'}`}>
                  {isGreek ? 'Ώρα Αθήνας:' : 'Athens Local Time:'} {currentTimeStr}
                </span>
              </div>
              <p className={`text-xs sm:text-sm font-medium ${
                isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
              }`}>
                {statusMessage}
              </p>
            </div>

            {/* Operating Schedule */}
            <div className={`p-6 rounded-sm space-y-4 shadow-lg border ${
              isLight ? 'bg-[#FFFFFF] border-[#C8BCA8]' : 'bg-[#0d0d0d] border-[#262626]'
            }`}>
              <h3 className={`text-xs uppercase tracking-widest font-bold flex items-center space-x-2 ${
                isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{t('hours.title')}</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className={`flex justify-between py-2 border-b ${isLight ? 'border-[#E5DDCF]' : 'border-[#1a1a1a]'}`}>
                  <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>
                    {isGreek ? 'Δευτέρα' : 'Monday'}
                  </span>
                  <span className={`text-right font-medium ${isLight ? 'text-red-700' : 'text-red-400'}`}>
                    {isGreek ? 'Κλειστά' : 'Closed'}
                  </span>
                </div>

                <div className={`flex justify-between py-2 border-b ${isLight ? 'border-[#E5DDCF]' : 'border-[#1a1a1a]'}`}>
                  <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>
                    {isGreek ? 'Τρίτη' : 'Tuesday'}
                  </span>
                  <span className={`text-right ${isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'}`}>
                    13:00 – 23:00
                  </span>
                </div>

                <div className={`flex justify-between py-2 border-b ${isLight ? 'border-[#E5DDCF]' : 'border-[#1a1a1a]'}`}>
                  <div>
                    <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>
                      {isGreek ? 'Τετάρτη' : 'Wednesday'}
                    </span>
                    <span className="block text-[11px] text-[#8A6310] dark:text-[#d4af37]">
                      {isGreek ? 'Μπουφές: 19:00 – 23:00 (15€)' : 'Buffet: 19:00 – 23:00 (15€)'}
                    </span>
                  </div>
                  <span className={`text-right ${isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'}`}>
                    13:00 – 23:00
                  </span>
                </div>

                <div className={`flex justify-between py-2 border-b ${isLight ? 'border-[#E5DDCF]' : 'border-[#1a1a1a]'}`}>
                  <div>
                    <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>
                      {isGreek ? 'Πέμπτη' : 'Thursday'}
                    </span>
                    <span className="block text-[11px] text-[#8A6310] dark:text-[#d4af37]">
                      {isGreek ? 'Μπουφές: 19:00 – 23:00 (15€)' : 'Buffet: 19:00 – 23:00 (15€)'}
                    </span>
                  </div>
                  <span className={`text-right ${isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'}`}>
                    13:00 – 23:00
                  </span>
                </div>

                <div className={`flex justify-between py-2 border-b ${isLight ? 'border-[#E5DDCF]' : 'border-[#1a1a1a]'}`}>
                  <div>
                    <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>
                      {isGreek ? 'Παρασκευή' : 'Friday'}
                    </span>
                    <span className="block text-[11px] text-[#8A6310] dark:text-[#d4af37]">
                      {isGreek ? 'Μπουφές: 19:00 – 23:00 (16€)' : 'Buffet: 19:00 – 23:00 (16€)'}
                    </span>
                  </div>
                  <span className={`text-right ${isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'}`}>
                    13:00 – 23:00
                  </span>
                </div>

                <div className={`flex justify-between py-2 border-b ${isLight ? 'border-[#E5DDCF]' : 'border-[#1a1a1a]'}`}>
                  <div>
                    <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>
                      {isGreek ? 'Σάββατο' : 'Saturday'}
                    </span>
                    <span className="block text-[11px] text-[#8A6310] dark:text-[#d4af37]">
                      {isGreek ? 'Μπουφές: 19:00 – 23:00 (18€)' : 'Buffet: 19:00 – 23:00 (18€)'}
                    </span>
                  </div>
                  <span className={`text-right ${isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'}`}>
                    13:00 – 23:00
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <div>
                    <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>
                      {isGreek ? 'Κυριακή' : 'Sunday'}
                    </span>
                    <span className="block text-[11px] text-[#8A6310] dark:text-[#d4af37]">
                      {isGreek ? 'Μπουφές: 13:30 – 19:00 (18€)' : 'Buffet: 13:30 – 19:00 (18€)'}
                    </span>
                  </div>
                  <span className={`text-right ${isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'}`}>
                    13:00 – 22:00
                  </span>
                </div>
              </div>
            </div>

            {/* Parking & Transit Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-5 rounded-sm space-y-2 border ${
                isLight ? 'bg-[#FFFFFF] border-[#C8BCA8]' : 'bg-[#0d0d0d] border-[#262626]'
              }`}>
                <div className={`flex items-center space-x-2 font-bold text-xs uppercase tracking-wider ${
                  isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
                }`}>
                  <Car className="w-4 h-4" />
                  <span>{isGreek ? 'Στάθμευση & Άφιξη' : 'Parking & Arrival'}</span>
                </div>
                <p className={`text-xs font-light leading-relaxed ${
                  isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'
                }`}>
                  {isGreek 
                    ? 'Διαθέσιμος χώρος στάθμευσης στον παράδρομο της Συγγρού και στους παρακείμενους δρόμους της Νέας Σμύρνης.' 
                    : 'Street parking along the Sygrou service lane and adjacent Nea Smyrni streets. Direct passenger drop-off right outside our front door.'}
                </p>
              </div>

              <div className={`p-5 rounded-sm space-y-2 border ${
                isLight ? 'bg-[#FFFFFF] border-[#C8BCA8]' : 'bg-[#0d0d0d] border-[#262626]'
              }`}>
                <div className={`flex items-center space-x-2 font-bold text-xs uppercase tracking-wider ${
                  isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
                }`}>
                  <Train className="w-4 h-4" />
                  <span>{isGreek ? 'Μέσα Μεταφοράς' : 'Public Transit'}</span>
                </div>
                <p className={`text-xs font-light leading-relaxed ${
                  isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'
                }`}>
                  {isGreek
                    ? 'Τραμ Γραμμή 6 (Στάση Αγία Φωτεινή) & λεωφορεία Συγγρού (A2, B2, 550, 126) με άμεση σύνδεση από το Μετρό Συγγρού-Φιξ.'
                    : 'Athens Tram Line 6 (Agia Foteini stop) and direct Sygrou express buses (A2, B2, 550, 126) connecting from Sygrou-Fix Metro Station.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Full Interactive Location Map & Navigation Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`p-6 sm:p-8 rounded-sm shadow-2xl flex flex-col space-y-6 border ${
              isLight
                ? 'bg-[#FFFFFF] border-[#C8BCA8] shadow-stone-900/10'
                : 'bg-[#0d0d0d] border-[#d4af37]/40 text-[#faf6ee]'
            }`}
          >
            
            {/* Address Banner */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] uppercase tracking-widest font-bold ${
                  isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
                }`}>
                  {isGreek ? 'Διεύθυνση Εστιατορίου' : 'Restaurant Location'}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-serif-heading text-xl sm:text-2xl font-bold ${
                    isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'
                  }`}>
                    {isGreek ? RESTAURANT_INFO.addressEl || RESTAURANT_INFO.address : RESTAURANT_INFO.address}
                  </h3>
                  <p className={`text-xs font-medium pt-0.5 ${
                    isLight ? 'text-[#6B6154]' : 'text-[#a0a0a0]'
                  }`}>
                    {isGreek ? 'Νέα Σμύρνη 171 21, Αθήνα' : 'Nea Smyrni 171 21, Athens, Greece'}
                  </p>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className={`font-chinese text-2xl font-black ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                    金鼎
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                    GoldenWok
                  </span>
                </div>
              </div>
            </div>

            {/* Embedded Live Map Display */}
            <div className={`relative w-full h-[380px] sm:h-[420px] rounded-sm overflow-hidden border shadow-inner ${
              isLight ? 'border-[#C8BCA8]' : 'border-[#262626]'
            }`}>
              <InteractiveMap isLight={isLight} />

              {/* Direct Open in Google Maps overlay button */}
              <div className="absolute bottom-3 right-3 flex items-center space-x-2 z-[400]">
                <button
                  onClick={openGoogleMaps}
                  className="px-3.5 py-2 rounded bg-black/95 hover:bg-[#d4af37] text-white hover:text-black text-xs font-bold border border-[#d4af37]/80 flex items-center space-x-1.5 shadow-xl transition-all cursor-pointer backdrop-blur-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isGreek ? 'Άνοιγμα στο Google Maps' : 'Open in Google Maps'}</span>
                </button>
              </div>
            </div>

            {/* Quick Contact & Directions Bar */}
            <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isLight ? 'border-[#E5DDCF]' : 'border-[#1c1c1c]'
            }`}>
              <div className="space-y-1.5 text-xs text-left w-full sm:w-auto">
                <div className={`flex items-center space-x-2 ${isLight ? 'text-[#3E3830]' : 'text-[#cccccc]'}`}>
                  <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className={`font-bold ${isLight ? 'hover:text-[#8A6310]' : 'hover:text-[#d4af37]'}`}>
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
                <div className={`flex items-center space-x-2 ${isLight ? 'text-[#3E3830]' : 'text-[#cccccc]'}`}>
                  <Mail className={`w-3.5 h-3.5 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  <a href={`mailto:${RESTAURANT_INFO.email}`} className={isLight ? 'hover:text-[#8A6310]' : 'hover:text-[#d4af37]'}>
                    {RESTAURANT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={openGoogleMaps}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-sm bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] hover:brightness-110 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-black" />
                  <span>{t('location.directions')}</span>
                </button>

                <button
                  onClick={openAppleMaps}
                  title={isGreek ? 'Άνοιγμα στο Apple Maps' : 'Open in Apple Maps'}
                  className={`p-2.5 rounded-sm border transition-colors cursor-pointer ${
                    isLight 
                      ? 'bg-[#F2EBE1] border-[#C8BCA8] text-[#574F44] hover:text-[#8A6310]' 
                      : 'bg-[#181818] border-[#333333] text-[#cccccc] hover:text-[#d4af37]'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
