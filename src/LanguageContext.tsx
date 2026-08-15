import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'el' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
  el: {
    // Nav
    'nav.home': 'Αρχική',
    'nav.menu': 'Μενού',
    'nav.gallery': 'Φωτογραφίες',
    'nav.reviews': 'Κριτικές',
    'nav.contact': 'Επικοινωνία',
    'nav.reserve': 'Κράτηση Τραπεζιού',
    'nav.theme.dark': 'Σκοτεινό',
    'nav.theme.light': 'Φωτεινό',
    'nav.lang.el': 'ΕΛ',
    'nav.lang.en': 'EN',
    'nav.lang.full': 'Ελληνικά',

    // Hero
    'hero.badge': 'Αυθεντική Παραδοσιακή Κινέζικη & Ιαπωνική κουζίνα',
    'hero.tagline': 'Φρέσκο Χειροποίητο Dim Sum & Παραδοσιακές Σπιτικές Γεύσεις',
    'hero.desc': 'Ανακαλύψτε τις πλούσιες, αυθεντικές γεύσεις της κινεζικής γαστρονομίας στη Νέα Σμύρνη. Καθημερινά φρέσκα χειροποίητα dumplings, τραγανή πάπια Πεκίνου και λαχταριστά πιάτα στο wok φτιαγμένα με μεράκι και παραδοσιακές συνταγές.',
    'hero.exploreMenu': 'Εξερευνήστε το Μενού',
    'hero.orderNowTitle': 'Order Now',
    'hero.orderNowText': 'Our restaurant provides takeaway services; you may simply place your order by phone (call us {phone}) and collect it directly from our premises. Alternatively, you can place your order through the Wolt, e-food, and Box applications.',
    'hero.orderNowTextEl': 'Το εστιατόριό μας παρέχει υπηρεσίες takeaway. Μπορείτε απλά να δώσετε την παραγγελία σας τηλεφωνικά (καλέστε μας στο {phone}) και να την παραλάβετε απευθείας από το κατάστημά μας. Εναλλακτικά, μπορείτε να παραγγείλετε μέσω των εφαρμογών Wolt, e-food και Box.',

    // Quick Reservation Bar in Hero
    'res.title': 'Κράτηση Τραπεζιού',
    'res.date': 'Ημερομηνία',
    'res.time': 'Ώρα',
    'res.guests': 'Άτομα',
    'res.guestCount': '{count} Άτομα',
    'res.guestSingle': '1 Άτομο',
    'res.name': 'Ονοματεπώνυμο',
    'res.phone': 'Τηλέφωνο Επικοινωνίας',
    'res.email': 'Email',
    'res.area': 'Χώρος',
    'res.submit': 'Ολοκλήρωση Κράτησης',
    'res.successTitle': 'Η Κράτησή σας Επιβεβαιώθηκε!',
    'res.successDesc': 'Σας ευχαριστούμε. Σας περιμένουμε στο GoldenWok για μια μοναδική γαστρονομική εμπειρία.',
    'res.close': 'Κλείσιμο',

    // Menu Section
    'menu.badge': 'Κουζίνα & Σπεσιαλιτέ',
    'menu.title': 'Το Μενού του GoldenWok',
    'menu.subtitle': 'Ζήστε την αληθινή τέχνη της μαγειρικής στο wok, όπου η έντονη φωτιά και τα εκλεκτά υλικά ενώνονται για να σας προσφέρουν αυθεντικές ασιατικές γεύσεις.',
    'menu.searchPlaceholder': 'Αναζήτηση πιάτων, υλικών, κινέζικων ονομασιών...',
    'menu.all': 'Όλα τα Πιάτα',
    'menu.cat.dim-sum': 'Dim Sum & Dumplings',
    'menu.cat.duck-specialties': 'Πάπια Πεκίνου & Ψητά',
    'menu.cat.wok-hei': 'Σπεσιαλιτέ Wok',
    'menu.cat.noodles-rice': 'Χειροποίητα Noodles & Ρύζι',
    'menu.cat.soups-greens': 'Σούπες & Λαχανικά',
    'menu.cat.tea-cocktails': 'Τσάι & Cocktails',
    'menu.cat.desserts': 'Παραδοσιακά Επιδόρπια',
    'menu.chefsChoice': 'Επιλογή Σεφ',
    'menu.popular': 'Δημοφιλές',
    'menu.viewDetails': 'Λεπτομέρειες',
    'menu.spicy': 'Καυτερό',
    'menu.noResults': 'Δεν βρέθηκαν πιάτα που να ταιριάζουν με την αναζήτησή σας.',
    'menu.clearFilters': 'Εκκαθάριση φίλτρων',

    // Dish Modal
    'modal.ingredients': 'Κύρια Υλικά',
    'modal.dietary': 'Διατροφικά Χαρακτηριστικά',
    'modal.pairing': 'Προτεινόμενο Συνοδευτικό',
    'modal.prepTime': 'Χρόνος προετοιμασίας',
    'modal.minutes': 'λεπτά',
    'modal.close': 'Κλείσιμο',

    // Atmosphere / Gallery
    'gallery.badge': 'Χώρος & Ατμόσφαιρα',
    'gallery.title': 'Ο Κόσμος του GoldenWok',
    'gallery.subtitle': 'Μια ζεστή και αυθεντική ασιατική ατμόσφαιρα σχεδιασμένη να σας ταξιδέψει σε κάθε επίσκεψη.',

    // Reviews
    'reviews.badge': 'Κριτικές & Εμπειρίες',
    'reviews.title': 'Τι Λένε οι Επισκέπτες μας',
    'reviews.googleScore': '4.4 / 5.0 στο Google',
    'reviews.recent': 'Πρόσφατη κριτική',

    // Location & Hours
    'location.title': 'Ώρες Λειτουργίας & Τοποθεσία',
    'location.subtitle': 'Επισκεφθείτε μας στη Νέα Σμύρνη ή απολαύστε τις γεύσεις μας στο σπίτι με takeaway & delivery.',
    'hours.open': 'Ανοιχτά Τώρα',
    'hours.closed': 'Κλειστά Τώρα',
    'hours.title': 'Πρόγραμμα Λειτουργίας & Μπουφέ',
    'loc.badge': 'Τοποθεσία & Ωράριο',
    'loc.title': 'Ώρες Λειτουργίας & Τοποθεσία',
    'loc.address': 'Διεύθυνση',
    'loc.hours': 'Ωράριο Λειτουργίας',
    'loc.tueSat': 'Τρίτη έως Σάββατο',
    'loc.sun': 'Κυριακή',
    'loc.mon': 'Δευτέρα',
    'loc.closed': 'Κλειστά',
    'loc.phone': 'Τηλέφωνο',
    'loc.email': 'Email',
    'loc.openNow': 'Ανοιχτά Τώρα • Σάλα, Μπουφές & Takeaway',
    'loc.closedMon': 'Κλειστά Σήμερα (Δευτέρα) • Ανοίγουμε την Τρίτη στις 13:00',
    'loc.closedNight': 'Κλειστά για σήμερα • Ανοίγουμε αύριο στις 13:00',
    'loc.closedNow': 'Κλειστά αυτή την ώρα • Ανοίγουμε σήμερα στις 13:00',
    'loc.directions': 'Οδηγίες Πρόσβασης',
    'loc.byCar': 'Με Αυτοκίνητο',
    'loc.byCarDesc': 'Άνετη πρόσβαση μέσω της Λεωφόρου Ανδρέα Συγγρού με διαθέσιμο πάρκινγκ στους γύρω δρόμους της Νέας Σμύρνης.',
    'loc.byTransit': 'Με Μέσα Μαζικής Μεταφοράς',
    'loc.byTransitDesc': 'Εύκολη πρόσβαση με λεωφορεία επί της Συγγρού (Στάση Αγία Φωτεινή / Σκαγιόπουλο) και σύνδεση με το Μετρό Συγγρού-Φιξ.',
    'loc.openGoogle': 'Google Maps',
    'loc.openApple': 'Apple Maps',

    // Banquet & Events
    'banquet.badge': 'Εκδηλώσεις & Τραπέζια',
    'banquet.title': 'Ειδικές Εκδηλώσεις & Γιορτές',
    'banquet.desc': 'Φιλοξενούμε ιδιωτικά δείπνα, επαγγελματικά γεύματα και οικογενειακές γιορτές με ειδικά διαμορφωμένα μενού.',

    // Footer
    'footer.nav': 'Πλοήγηση',
    'footer.connect': 'Επικοινωνία',
    'footer.rights': 'Με την επιφύλαξη παντός δικαιώματος.',
    'footer.hoursTitle': 'Ωράριο',
    'footer.quickLinks': 'Σύνδεσμοι',
    'footer.bookTable': 'Κράτηση',
    'footer.exploreMenu': 'Μενού'
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.menu': 'Dining Menu',
    'nav.gallery': 'Photos',
    'nav.reviews': 'Reviews',
    'nav.contact': 'Contact us',
    'nav.reserve': 'Reserve Table',
    'nav.theme.dark': 'Dark',
    'nav.theme.light': 'Light',
    'nav.lang.el': 'ΕΛ',
    'nav.lang.en': 'EN',
    'nav.lang.full': 'English',

    // Hero
    'hero.badge': 'Authentic Traditional Chinese & Japanese cuisine',
    'hero.tagline': 'Fresh Daily Dim Sum & Authentic Home Cooking',
    'hero.desc': 'Experience masterfully prepared imperial recipes, delicate handmade dim sum, and aromatic wok delicacies in the heart of Nea Smyrni, Athens.',
    'hero.exploreMenu': 'Explore Dining Menu',
    'hero.orderNowTitle': 'Order Now',
    'hero.orderNowText': 'Our restaurant provides takeaway services; you may simply place your order by phone (call us {phone}) and collect it directly from our premises. Alternatively, you can place your order through the Wolt, e-food, and Box applications.',
    'hero.orderNowTextEl': 'Our restaurant provides takeaway services; you may simply place your order by phone (call us {phone}) and collect it directly from our premises. Alternatively, you can place your order through the Wolt, e-food, and Box applications.',

    // Quick Reservation Bar in Hero
    'res.title': 'Table Reservation',
    'res.date': 'Date',
    'res.time': 'Time',
    'res.guests': 'Guests',
    'res.guestCount': '{count} Guests',
    'res.guestSingle': '1 Guest',
    'res.name': 'Full Name',
    'res.phone': 'Phone Number',
    'res.email': 'Email Address',
    'res.area': 'Seating Area',
    'res.submit': 'Confirm Reservation',
    'res.successTitle': 'Reservation Confirmed!',
    'res.successDesc': 'Thank you! We look forward to welcoming you to GoldenWok for an unforgettable dining experience.',
    'res.close': 'Close',

    // Menu Section
    'menu.badge': 'Master Culinary Repertoire',
    'menu.title': 'The GoldenWok Dining Menu',
    'menu.subtitle': 'Experience the true art of wok cooking, where blazing heat and premium ingredients unite to bring you authentic Asian flavors.',
    'menu.searchPlaceholder': 'Search dishes, ingredients, Chinese characters...',
    'menu.all': 'All Offerings',
    'menu.cat.dim-sum': 'Dim Sum & Dumplings',
    'menu.cat.duck-specialties': 'Peking Duck & Roasts',
    'menu.cat.wok-hei': 'Wok Hei Signatures',
    'menu.cat.noodles-rice': 'Handcrafted Noodles & Claypot',
    'menu.cat.soups-greens': 'Imperial Soups & Greens',
    'menu.cat.tea-cocktails': 'Artisanal Tea & Cocktails',
    'menu.cat.desserts': 'Sweet Delicacies',
    'menu.chefsChoice': "Chef's Choice",
    'menu.popular': 'Popular',
    'menu.viewDetails': 'View Details',
    'menu.spicy': 'Spicy',
    'menu.noResults': 'No dishes found matching your search.',
    'menu.clearFilters': 'Clear filters',

    // Dish Modal
    'modal.ingredients': 'Key Ingredients',
    'modal.dietary': 'Dietary & Allergens',
    'modal.pairing': 'Sommelier Pairing Note',
    'modal.prepTime': 'Preparation Time',
    'modal.minutes': 'mins',
    'modal.close': 'Close',

    // Atmosphere / Gallery
    'gallery.badge': 'Atmosphere & Visual Chronicle',
    'gallery.title': 'The World Inside GoldenWok',
    'gallery.subtitle': 'A serene and authentic dining sanctuary designed to elevate every culinary moment.',

    // Reviews
    'reviews.badge': 'Community & Diner Praise',
    'reviews.title': 'Words From Our Guests',
    'reviews.googleScore': '4.4 / 5.0 on Google',
    'reviews.recent': 'Recent review',

    // Location & Hours
    'location.title': 'Opening hours & Location',
    'location.subtitle': 'Visit our welcoming sanctuary in Nea Smyrni or enjoy takeaway & delivery at home.',
    'hours.open': 'Open Now',
    'hours.closed': 'Currently Closed',
    'hours.title': 'Weekly Hours & Buffet Schedule',
    'loc.badge': 'Location & Opening Hours',
    'loc.title': 'Opening hours & Location',
    'loc.address': 'Address',
    'loc.hours': 'Opening Hours',
    'loc.tueSat': 'Tuesday to Saturday',
    'loc.sun': 'Sunday',
    'loc.mon': 'Monday',
    'loc.closed': 'Closed',
    'loc.phone': 'Phone',
    'loc.email': 'Email',
    'loc.openNow': 'Open Now • Full Dining, Buffet & Takeaway Service',
    'loc.closedMon': 'Closed Today (Monday) • Doors reopen Tuesday at 13:00',
    'loc.closedNight': 'Closed for the Night • Doors open tomorrow at 13:00',
    'loc.closedNow': 'Closed Now • Doors open today at 13:00',
    'loc.directions': 'Transit & Access Directions',
    'loc.byCar': 'By Car & Parking',
    'loc.byCarDesc': 'Convenient access via Leoforos Andrea Sygrou with nearby street parking throughout Nea Smyrni.',
    'loc.byTransit': 'By Public Transit',
    'loc.byTransitDesc': 'Easily accessible via Sygrou bus lines (Agia Fotini / Skagiopoulo stop) and connected to Sygrou-Fix Metro.',
    'loc.openGoogle': 'Google Maps',
    'loc.openApple': 'Apple Maps',

    // Banquet & Events
    'banquet.badge': 'Celebrations & Gatherings',
    'banquet.title': 'Private Banquets & Dining',
    'banquet.desc': 'We host bespoke private dinner parties, corporate events, and family feasts with custom curated multi-course menus.',

    // Footer
    'footer.nav': 'Navigation',
    'footer.connect': 'Connect',
    'footer.rights': 'All rights reserved.',
    'footer.hoursTitle': 'Hours',
    'footer.quickLinks': 'Quick Links',
    'footer.bookTable': 'Bookings',
    'footer.exploreMenu': 'Menu'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('goldenwok_lang');
      return saved === 'el' ? 'el' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('goldenwok_lang', language);
      document.documentElement.lang = language;
    } catch (e) {
      console.error(e);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'el' ? 'en' : 'el'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
