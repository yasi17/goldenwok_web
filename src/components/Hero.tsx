import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  ArrowRight, 
  Utensils, 
  CheckCircle2, 
  X, 
  Phone, 
  User, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  ShoppingBag,
  Mail,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
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

  // Quick booking state
  const todayStr = new Date().toISOString().split('T')[0];
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>('13:30');

  // Contact info for instant reservation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Confirmed booking state
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Target Restaurant Contact Info
  const TARGET_EMAIL = 'wangjianfeng1976@gmail.com';
  const RESTAURANT_PHONE = '2109345137';
  const RESTAURANT_PHONE_DISPLAY = '210 934 5137';

  const sendReservationEmail = async (code: string) => {
    setIsSendingEmail(true);
    setEmailSentStatus('idle');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🥢 Νέα Κράτηση GoldenWok (${code}) - ${guestName.trim()}`,
          _captcha: 'false',
          'Κωδικός Κράτησης / Code': code,
          'Όνομα Πελάτη / Name': guestName.trim(),
          'Τηλέφωνο / Phone': guestPhone.trim(),
          'Αριθμός Ατόμων / Guests': `${guests} άτομα`,
          'Ημερομηνία / Date': date,
          'Ώρα / Time': time,
          'Ειδικές Σημειώσεις / Notes': specialRequests.trim() || 'Καμία',
          'Ημερομηνία Αποστολής / Sent At': new Date().toLocaleString('el-GR')
        })
      });

      if (response.ok) {
        setEmailSentStatus('success');
      } else {
        setEmailSentStatus('error');
      }
    } catch {
      // Non-blocking fallback
      setEmailSentStatus('error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleOpenBookingModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;

    const randomCode = 'GW-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomCode);
    setIsConfirmed(true);
    setIsModalOpen(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f5e298', '#b38728', '#ffd700', '#ffffff']
    });

    // Send directly to wangjianfeng1976@gmail.com
    sendReservationEmail(randomCode);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;

    const randomCode = 'GW-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomCode);
    setIsConfirmed(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f5e298', '#b38728', '#ffd700', '#ffffff']
    });

    // Send directly to wangjianfeng1976@gmail.com
    sendReservationEmail(randomCode);
  };

  const resetReservationForm = () => {
    setGuestName('');
    setGuestPhone('');
    setSpecialRequests('');
    setGuests(2);
    setDate(todayStr);
    setTime('13:30');
    setIsConfirmed(false);
    setConfirmationCode('');
    setEmailSentStatus('idle');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isConfirmed) {
      resetReservationForm();
    }
  };

  return (
    <section className={`relative min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-between overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-[#F7F3EB]' : 'bg-black'
    }`}>
      {/* Cinematic Background with Atmospheric Layers */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background Image */}
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczNz7sK9xc34gonPucn75OKpCVkP7bnKTGTE6HCBwZHBKusoRv5iME6U5WCRj44RaR5x3iZrzY4CjdzzzWRQOuGDPLlAtdbX1lu4MzIrbWSei14M1gQ=w1200-h900-no"
          alt="GoldenWok Atmosphere Mobile"
          className={`block sm:hidden w-full h-full object-cover object-center filter ${
            isLight ? 'brightness-[0.52] contrast-[1.08]' : 'brightness-[0.40] contrast-[1.12]'
          }`}
        />
        {/* Tablet & Desktop Background Image */}
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczNz7sK9xc34gonPucn75OKpCVkP7bnKTGTE6HCBwZHBKusoRv5iME6U5WCRj44RaR5x3iZrzY4CjdzzzWRQOuGDPLlAtdbX1lu4MzIrbWSei14M1gQ=w1920-h1080-no"
          alt="GoldenWok Restaurant Exterior"
          className={`hidden sm:block w-full h-full object-cover object-center scale-105 filter ${
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
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Τετάρτη' : 'Wednesday'}</span>
                  <span className="text-stone-300">19:00 - 23:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">15€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Πέμπτη' : 'Thursday'}</span>
                  <span className="text-stone-300">19:00 - 23:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">15€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-24 sm:w-28 font-medium text-stone-100">{isGreek ? 'Παρασκευή' : 'Friday'}</span>
                  <span className="text-stone-300">19:00 - 23:00</span>
                  <span className="font-bold text-[#fbf5b7] pl-2">16€</span>
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

              {/* Kids & Reminder text */}
              <div className="pt-2 text-xs sm:text-sm text-stone-300 space-y-1">
                <p>
                  {isGreek ? (
                    <>Για παιδιά <span className="font-bold text-[#fbf5b7]">6 έως 12 ετών: 12€</span> και <span className="font-bold text-[#fbf5b7]">κάτω των 6 ετών είναι δωρεάν!</span></>
                  ) : (
                    <>For children <span className="font-bold text-[#fbf5b7]">6 to 12 years old: 12€</span> and <span className="font-bold text-[#fbf5b7]">under 6 years old is free!</span></>
                  )}
                </p>
                <p className="text-[#fbf5b7] font-semibold italic tracking-wide">
                  {isGreek ? 'Μην ξεχάσετε να κάνετε κράτηση!' : "Don't forget to make a reservation!"}
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
          className={`mt-6 sm:mt-8 w-full max-w-4xl backdrop-blur-xl border p-4 sm:p-5 rounded-sm shadow-2xl transition-all duration-300 ${
            isLight
              ? 'bg-[#FFFFFF]/95 border-[#C8BCA8] text-[#1C1917] shadow-stone-900/10'
              : 'bg-[#0d0d0d]/95 border-[#d4af37]/40 text-[#f0f0f0] shadow-black'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2 max-w-xl text-left">
              <div className="flex items-center space-x-2">
                <ShoppingBag className={`w-5 h-5 ${isLight ? 'text-[#8A6310]' : 'text-[#fbf5b7]'}`} />
                <h3 className={`text-base sm:text-lg font-extrabold tracking-wider uppercase ${
                  isLight ? 'text-[#1C1917]' : 'text-[#fbf5b7]'
                }`}>
                  {isGreek ? 'Παραγγελία & Takeaway' : 'Order Now'}
                </h3>
              </div>
              <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                isLight ? 'text-[#2D241E]' : 'text-[#f3eee5]'
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

        {/* Quick Table Reservation Bar (Floating Card) */}
        <motion.div 
          id="reservations"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-6 sm:mt-8 w-full max-w-4xl backdrop-blur-xl border p-4 sm:p-6 rounded-sm shadow-2xl transition-all duration-300 scroll-mt-28 ${
            isLight
              ? 'bg-[#FFFFFF]/95 border-[#C8BCA8] text-[#1C1917] shadow-stone-900/10'
              : 'bg-[#0d0d0d]/95 border-[#d4af37]/40 text-[#f0f0f0] shadow-black'
          }`}
        >
          <div className={`flex items-center justify-between pb-3 mb-4 border-b ${
            isLight ? 'border-[#E5DDCF]' : 'border-[#222222]'
          }`}>
            <div className="flex items-center space-x-2">
              <Calendar className={`w-4 h-4 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
              <span className={`text-xs uppercase tracking-widest font-semibold ${isLight ? 'text-[#1C1917]' : 'text-[#f0f0f0]'}`}>
                {t('res.title')}
              </span>
            </div>
          </div>

          <form onSubmit={handleOpenBookingModal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Guests Selector */}
              <div className="space-y-1">
                <label className={`text-[11px] uppercase tracking-wider font-medium flex items-center space-x-1 ${
                  isLight ? 'text-[#6B6154]' : 'text-[#a0a0a0]'
                }`}>
                  <Users className={`w-3 h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  <span>{t('res.guests')} (1 - 16)</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none font-medium ${
                    isLight
                      ? 'bg-[#F5EFEB] border-[#C8BCA8] text-[#1C1917] focus:border-[#8A6310]'
                      : 'bg-[#181818] border-[#d4af37]/30 text-[#f0f0f0] focus:border-[#d4af37]'
                  }`}
                >
                  {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} {isGreek ? (num === 1 ? 'Άτομο' : 'Άτομα') : (num === 1 ? 'Guest' : 'Guests')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selector */}
              <div className="space-y-1">
                <label className={`text-[11px] uppercase tracking-wider font-medium flex items-center space-x-1 ${
                  isLight ? 'text-[#6B6154]' : 'text-[#a0a0a0]'
                }`}>
                  <Calendar className={`w-3 h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  <span>{t('res.date')}</span>
                </label>
                <input
                  type="date"
                  value={date}
                  min={todayStr}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none font-medium ${
                    isLight
                      ? 'bg-[#F5EFEB] border-[#C8BCA8] text-[#1C1917] focus:border-[#8A6310]'
                      : 'bg-[#181818] border-[#d4af37]/30 text-[#f0f0f0] focus:border-[#d4af37]'
                  }`}
                />
              </div>

              {/* Time Slot Selector */}
              <div className="space-y-1">
                <label className={`text-[11px] uppercase tracking-wider font-medium flex items-center space-x-1 ${
                  isLight ? 'text-[#6B6154]' : 'text-[#a0a0a0]'
                }`}>
                  <Clock className={`w-3 h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  <span>{t('res.time')}</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none font-medium ${
                    isLight
                      ? 'bg-[#F5EFEB] border-[#C8BCA8] text-[#1C1917] focus:border-[#8A6310]'
                      : 'bg-[#181818] border-[#d4af37]/30 text-[#f0f0f0] focus:border-[#d4af37]'
                  }`}
                >
                  {[
                    '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
                    '16:30', '17:00', '17:30', '18:00', '18:30', '19:00',
                    '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
                  ].map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name, Phone, Comments & Submit CTA Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
              {/* Mandatory Name */}
              <div className="space-y-1">
                <label className={`text-[11px] uppercase tracking-wider font-semibold flex items-center space-x-1 ${
                  isLight ? 'text-[#574F44]' : 'text-[#cccccc]'
                }`}>
                  <User className={`w-3 h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  <span>{t('res.name')} *</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={isGreek ? 'π.χ. Γιώργος Παπαδόπουλος' : 'e.g. John Smith'}
                  className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none font-medium ${
                    isLight
                      ? 'bg-[#F5EFEB] border-[#C8BCA8] text-[#1C1917] placeholder-[#8C8275] focus:border-[#8A6310]'
                      : 'bg-[#181818] border-[#d4af37]/30 text-[#f0f0f0] placeholder-[#666666] focus:border-[#d4af37]'
                  }`}
                />
              </div>

              {/* Mandatory Phone */}
              <div className="space-y-1">
                <label className={`text-[11px] uppercase tracking-wider font-semibold flex items-center space-x-1 ${
                  isLight ? 'text-[#574F44]' : 'text-[#cccccc]'
                }`}>
                  <Phone className={`w-3 h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  <span>{t('res.phone')} *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder={isGreek ? 'π.χ. 698 123 4567' : 'e.g. +30 698 123 4567'}
                  className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none font-medium ${
                    isLight
                      ? 'bg-[#F5EFEB] border-[#C8BCA8] text-[#1C1917] placeholder-[#8C8275] focus:border-[#8A6310]'
                      : 'bg-[#181818] border-[#d4af37]/30 text-[#f0f0f0] placeholder-[#666666] focus:border-[#d4af37]'
                  }`}
                />
              </div>

              {/* Optional Comments / Special Requests */}
              <div className="space-y-1">
                <label className={`text-[11px] uppercase tracking-wider font-semibold flex items-center space-x-1 ${
                  isLight ? 'text-[#574F44]' : 'text-[#cccccc]'
                }`}>
                  <MessageSquare className={`w-3 h-3 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                  <span>{isGreek ? 'Σχόλια (Προαιρετικό)' : 'Comments (Optional)'}</span>
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder={isGreek ? 'π.χ. γενέθλια, ήσυχο τραπέζι...' : 'e.g. birthday, quiet table...'}
                  className={`w-full border rounded-sm px-3 py-2 text-sm focus:outline-none font-medium ${
                    isLight
                      ? 'bg-[#F5EFEB] border-[#C8BCA8] text-[#1C1917] placeholder-[#8C8275] focus:border-[#8A6310]'
                      : 'bg-[#181818] border-[#d4af37]/30 text-[#f0f0f0] placeholder-[#666666] focus:border-[#d4af37]'
                  }`}
                />
              </div>

              {/* Submit CTA */}
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="w-full py-2.5 px-4 rounded-sm bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-bold text-sm tracking-wider uppercase shadow-md hover:brightness-110 flex items-center justify-center space-x-1.5 transition-all cursor-pointer h-[38px] disabled:opacity-75"
                >
                  {isSendingEmail ? (
                    <>
                      <Loader2 className="w-4 h-4 text-black animate-spin" />
                      <span>{isGreek ? 'Αποστολή...' : 'Sending...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('nav.reserve')}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Inquiries / Telephone Notice */}
            <div className={`pt-2 flex items-center justify-center space-x-2 text-xs font-medium ${
              isLight ? 'text-[#574F44]' : 'text-[#d4af37]'
            }`}>
              <Phone className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
              <span>
                {isGreek ? 'Αν έχετε οποιαδήποτε πληροφορία καλέστε στο ' : 'If you have any questions or inquiries, please call '}
                <a 
                  href={`tel:${RESTAURANT_PHONE}`} 
                  className="font-bold underline hover:text-[#B8860B] transition-colors"
                >
                  {RESTAURANT_PHONE_DISPLAY}
                </a>
              </span>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Instant Reservation Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div 
            className={`relative w-full max-w-lg border rounded-sm shadow-2xl p-6 sm:p-8 my-8 transition-colors ${
              isLight ? 'bg-[#FFFFFF] border-[#C8BCA8]' : 'bg-[#0d0d0d] border-[#d4af37]/60 text-[#f0f0f0]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className={`absolute top-4 right-4 p-2 rounded-full border transition-colors cursor-pointer ${
                isLight 
                  ? 'bg-[#FFFFFF] text-[#1C1917] hover:bg-[#EFE8DD] border-[#C8BCA8]' 
                  : 'bg-[#141414] text-[#cccccc] hover:text-white border-[#333333]'
              }`}
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {isConfirmed ? (
              <div className="text-center space-y-5 py-4 animate-in zoom-in-95 duration-200">
                <div className={`w-14 h-14 rounded-full border flex items-center justify-center mx-auto ${
                  isLight ? 'bg-[#FAF6F0] border-[#8A6310] text-[#8A6310]' : 'bg-[#141414] border-[#d4af37] text-[#d4af37]'
                }`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <span className="px-3 py-1 rounded bg-[#141414] border border-[#d4af37]/40 text-[#d4af37] font-mono text-xs font-bold">
                    {confirmationCode}
                  </span>
                  <h3 className={`font-serif-heading text-2xl font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>
                    {t('res.successTitle')}
                  </h3>
                  <p className={`text-xs font-light ${isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'}`}>
                    {isGreek ? (
                      <>Σας ευχαριστούμε, <strong className={isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}>{guestName}</strong>! Το αίτημα κράτησης καταχωρήθηκε.</>
                    ) : (
                      <>Thank you, <strong className={isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}>{guestName}</strong>! Your reservation request has been submitted.</>
                    )}
                  </p>
                </div>

                <div className={`p-4 rounded text-left space-y-2 text-xs border ${
                  isLight ? 'bg-[#FAF6F0] border-[#C8BCA8]' : 'bg-[#141414] border-[#262626]'
                }`}>
                  <div className="flex justify-between">
                    <span className={isLight ? 'text-[#6B6154]' : 'text-[#888888]'}>{isGreek ? 'Άτομα:' : 'Party Size:'}</span>
                    <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>
                      {guests} {isGreek ? (guests === 1 ? 'Άτομο' : 'Άτομα') : (guests === 1 ? 'Guest' : 'Guests')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isLight ? 'text-[#6B6154]' : 'text-[#888888]'}>{isGreek ? 'Ημερομηνία & Ώρα:' : 'Date & Time:'}</span>
                    <span className={`font-bold ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>{date} {isGreek ? 'στις' : 'at'} {time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isLight ? 'text-[#6B6154]' : 'text-[#888888]'}>{isGreek ? 'Τηλέφωνο:' : 'Phone:'}</span>
                    <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>{guestPhone}</span>
                  </div>
                  {specialRequests && (
                    <div className="flex justify-between border-t pt-2 mt-2 border-[#C8BCA8]/40">
                      <span className={isLight ? 'text-[#6B6154]' : 'text-[#888888]'}>{isGreek ? 'Σημειώσεις:' : 'Notes:'}</span>
                      <span className={`font-medium italic ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>{specialRequests}</span>
                    </div>
                  )}
                </div>

                {/* Reservation Transmitted Status Box */}
                <div className={`p-3.5 rounded border text-left flex items-start space-x-3 text-xs ${
                  isLight 
                    ? 'bg-[#B8860B]/10 border-[#B8860B]/30 text-[#2D241E]' 
                    : 'bg-[#d4af37]/10 border-[#d4af37]/30 text-[#f5f2eb]'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-[#B8860B]">
                      {isGreek ? 'Αυτόματη Ενημέρωση Εστιατορίου' : 'Restaurant Successfully Notified'}
                    </p>
                    <p className="text-[11px] opacity-90 leading-relaxed">
                      {isGreek 
                        ? 'Τα στοιχεία της κράτησής σας καταχωρήθηκαν και απεστάλησαν αυτόματα στο εστιατόριο.'
                        : 'Your reservation details have been confirmed and transmitted directly to the restaurant.'}
                    </p>
                  </div>
                </div>

                {/* Inquiry Phone Callout */}
                <div className={`p-3 rounded border text-center text-xs ${
                  isLight ? 'bg-[#FAF6F0] border-[#C8BCA8]' : 'bg-[#141414] border-[#2a2a2a]'
                }`}>
                  <p className="font-medium">
                    {isGreek ? 'Αν έχετε οποιαδήποτε πληροφορία καλέστε στο ' : 'If you have any questions, please call '}
                    <a 
                      href={`tel:${RESTAURANT_PHONE}`}
                      className="font-bold text-[#B8860B] underline hover:brightness-110 ml-1 inline-flex items-center space-x-1"
                    >
                      <Phone className="w-3 h-3 inline mr-0.5" />
                      <span>{RESTAURANT_PHONE_DISPLAY}</span>
                    </a>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${RESTAURANT_PHONE}`}
                    className="w-full py-2.5 px-3 rounded-sm bg-[#1C1917] hover:bg-[#2D241E] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{isGreek ? `Κλήση ${RESTAURANT_PHONE_DISPLAY}` : `Call ${RESTAURANT_PHONE_DISPLAY}`}</span>
                  </a>

                  <button
                    onClick={handleCloseModal}
                    className="w-full py-2.5 px-3 rounded-sm bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all cursor-pointer"
                  >
                    {isGreek ? 'Ολοκλήρωση' : 'Done'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGreek ? 'Ολοκλήρωση Κράτησης' : 'Complete Reservation'}</span>
                  </div>
                  <h3 className={`font-serif-heading text-xl sm:text-2xl font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>
                    {isGreek ? `Κράτηση για ${guests} Άτομα` : `Reserve for ${guests} Guests`}
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-[#574F44]' : 'text-[#888888]'}`}>
                    {date} • {time}
                  </p>
                </div>

                <form onSubmit={handleConfirmReservation} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className={`text-xs uppercase tracking-wider font-semibold flex items-center space-x-1 ${
                      isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'
                    }`}>
                      <User className="w-3.5 h-3.5" />
                      <span>{t('res.name')} *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={isGreek ? 'π.χ. Μαρία Δημητρίου' : 'e.g. Eleanor Chen'}
                      className={`w-full border px-3.5 py-2 rounded text-xs focus:outline-none ${
                        isLight
                          ? 'bg-[#FAF6F0] border-[#C8BCA8] text-[#1C1917] placeholder-[#8C8275] focus:border-[#8A6310]'
                          : 'bg-[#141414] border-[#2a2a2a] text-[#f0f0f0] placeholder-[#666666] focus:border-[#d4af37]'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`text-xs uppercase tracking-wider font-semibold flex items-center space-x-1 ${
                      isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'
                    }`}>
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t('res.phone')} *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder={isGreek ? 'π.χ. 698 123 4567' : 'e.g. (213) 555-0199'}
                      className={`w-full border px-3.5 py-2 rounded text-xs focus:outline-none ${
                        isLight
                          ? 'bg-[#FAF6F0] border-[#C8BCA8] text-[#1C1917] placeholder-[#8C8275] focus:border-[#8A6310]'
                          : 'bg-[#141414] border-[#2a2a2a] text-[#f0f0f0] placeholder-[#666666] focus:border-[#d4af37]'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`text-xs uppercase tracking-wider font-semibold flex items-center space-x-1 ${
                      isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'
                    }`}>
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isGreek ? 'Σχόλια & Ειδικές Επιθυμίες (Προαιρετικό)' : 'Comments & Special Requests (Optional)'}</span>
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder={isGreek ? 'π.χ. Επέτειος, γενέθλια, ήσυχο τραπέζι, παιδικό καρεκλάκι, αλλεργίες...' : 'e.g. Anniversary, birthday, quiet corner, high chair, dietary notes...'}
                      className={`w-full border px-3.5 py-2 rounded text-xs focus:outline-none resize-none ${
                        isLight
                          ? 'bg-[#FAF6F0] border-[#C8BCA8] text-[#1C1917] placeholder-[#8C8275] focus:border-[#8A6310]'
                          : 'bg-[#141414] border-[#2a2a2a] text-[#f0f0f0] placeholder-[#666666] focus:border-[#d4af37]'
                      }`}
                    />
                  </div>

                  {/* Telephone Inquiries Callout */}
                  <p className={`text-[11px] text-center pt-1 ${isLight ? 'text-[#6B6154]' : 'text-[#a0a0a0]'}`}>
                    {isGreek ? 'Αν έχετε οποιαδήποτε πληροφορία καλέστε στο ' : 'If you have any questions, please call '}
                    <a href={`tel:${RESTAURANT_PHONE}`} className="font-bold text-[#B8860B] underline">
                      {RESTAURANT_PHONE_DISPLAY}
                    </a>
                  </p>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSendingEmail}
                      className="w-full py-3 rounded-sm bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-75"
                    >
                      {isSendingEmail ? (
                        <>
                          <Loader2 className="w-4 h-4 text-black animate-spin" />
                          <span>{isGreek ? 'Αποστολή Κράτησης...' : 'Sending Reservation...'}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-black" />
                          <span>{isGreek ? 'Επιβεβαίωση Κράτησης Τραπεζιού' : 'Confirm Table Reservation'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
