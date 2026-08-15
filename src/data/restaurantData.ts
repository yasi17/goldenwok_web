import { MenuItem, ReviewItem, GalleryPhoto, BanquetSpace } from '../types';
import { CHINESE_MENU_ITEMS } from './chineseMenuData';
import { JAPANESE_MENU_ITEMS } from './japaneseMenuData';

import imgF19 from '../assets/images/f19.webp';
import imgF18 from '../assets/images/f18.webp';
import imgF22 from '../assets/images/f22.webp';
import imgFood2 from '../assets/images/food2.webp';
import imgFood6 from '../assets/images/food6.webp';
import imgFood10 from '../assets/images/food10.webp';
import imgFood13 from '../assets/images/food13.webp';

export const RESTAURANT_INFO = {
  name: '金鼎 GoldenWok',
  tagline: 'Authentic Traditional Chinese & Japanese cuisine',
  taglineEl: 'Αυθεντική Παραδοσιακή Κινέζικη & Ιαπωνική Κουζίνα',
  chineseName: '金鼎',
  englishName: 'GoldenWok',
  subtitle: 'Fresh Daily Dim Sum, Sushi & Authentic Home Cooking',
  subtitleEl: 'Φρέσκο Χειροποίητο Dim Sum, Sushi & Παραδοσιακές Σπιτικές Γεύσεις',
  address: 'L. Andrea Sygrou 207, Nea Smyrni 171 21, Greece',
  addressEl: 'Λεωφόρος Ανδρέα Συγγρού 207, Νέα Σμύρνη 171 21, Αθήνα',
  phone: '+30 210 934 5137',
  email: 'goldenwok207@gmail.com',
  instagram: 'https://www.instagram.com/goldenwok_neasmyrni/',
  instagramHandle: '@goldenwok_neasmyrni',
  hours: {
    tuesdayToSaturday: '13:00 – 23:00',
    sunday: '13:00 – 22:00',
    monday: 'Closed'
  },
  established: 1998,
  awards: [
    'Nea Smyrni & Athens Neighborhood Favorite',
    'Best Fresh Dim Sum, Sushi & Wok Delicacies',
    'Community Choice Award'
  ]
};

// Combined menu items
export const MENU_ITEMS: MenuItem[] = [
  ...CHINESE_MENU_ITEMS,
  ...JAPANESE_MENU_ITEMS
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-elisavet',
    author: 'Elisavet Barberi',
    role: 'Τοπικός οδηγός · 238 κριτικές · 28 φωτογραφίες',
    rating: 5,
    source: 'Google Review',
    quote: 'Πολύ ωραία εμπειρία στο Golden Wok στη Νέα Σμύρνη!\nΟ χώρος είναι όμορφος και ζεστός, το φαγητό έχει αρκετές επιλογές και οι γεύσεις είναι πολύ νόστιμες.\nΞεχώρισα ιδιαίτερα το sushi, τα noodles και τα κινέζικα πιάτα.\nΠολύ καλή επιλογή για όσους αγαπούν την ασιατική κουζίνα, ειδικά αν θέλεις να δοκιμάσεις πολλές διαφορετικές γεύσεις σε ένα μέρος. Σίγουρα θα ξαναπήγαινα! ❤️',
    date: 'Πριν από 16 ώρες · ΝΕΟ',
    reviewUrl: 'https://maps.app.goo.gl/v7ea8Feh8mUSLmvQA'
  },
  {
    id: 'rev-evangelia',
    author: 'Evangelia K.',
    role: 'Τοπικός οδηγός · 18 κριτικές · 9 φωτογραφίες',
    rating: 5,
    source: 'Google Review',
    quote: 'Εξαιρετικά ολα. Το προσωπικο ευγενεστατο, τελεια εξυπηρέτηση και συμπεριφορα και πολυ ωραιο φαγητο. Αξιζει να ερθει κανείς ειτε για το φαγητο ειτε για την εμπειρία καθως η αυτοσφαιρα ειναι σχεδιασμενη για να σε μεταφερει αλλού 🥰',
    date: 'Πριν από μία εβδομάδα · ΝΕΟ',
    reviewUrl: 'https://maps.app.goo.gl/4kQ66hF86o4o9fuq8'
  },
  {
    id: 'rev-polynesian',
    author: 'greg orfán',
    role: 'Τοπικός οδηγός · 72 κριτικές · 35 φωτογραφίες',
    rating: 5,
    source: 'Google Review',
    quote: 'Ίσως ένα από τα καλύτερα και οικονομικότερα εστιατόρια πολυνησιακής κουζίνας που διαθέτει η Αθήνα αυτή τη στιγμή. Το μπουφέ ανανεώνεται συνεχως και παρέχει αρκετά πιάτα με σούσι. Υπέροχες γεύσεις τέλεια εξυπηρέτηση. Μην ξεχάσετε να κάνετε κράτηση πριν πάτε.',
    date: 'Πριν από 2 εβδομάδες · ΝΕΟ',
    reviewUrl: 'https://maps.app.goo.gl/UFXd8yBiHVZWxybe6'
  },
  {
    id: 'rev-anisadepo',
    author: 'Anisadepo Anisadepo',
    role: '4 κριτικές',
    rating: 5,
    source: 'Google Review',
    quote: 'Εξαιρετικό περιβάλλον, προσωπικό, καθαριοτητα, ευγένεια και νοστιμοτατα ΟΛΑ.\nΑν και υπό νεα δνση ειχα καποιες επιφυλαξεις οι οποιες εξαλειφθηκαν.\nΑξιζει να το επισκεφθει κανεις και εμεις σιγουρα βρηκαμε νεο στέκι. Υψηλα στανταρς. Συγχαρητηρια',
    date: 'Πριν από έναν μήνα',
    reviewUrl: 'https://maps.app.goo.gl/qYGuK5cRgWzCiJLm7'
  },
  {
    id: 'rev-eleni',
    author: 'Ελενη Πουλιδακη',
    role: '6 κριτικές',
    rating: 5,
    source: 'Google Review',
    quote: 'Πραγματικά τα 5 αστέρια τα αξίζουν και με το παραπανω ! Το φαγητό εξαιρετικό! Η εξυπηρέτηση φανταστική ! Όλοι είναι πάρα πολυ ευγενικοί! Το κλίμα επεισης είναι πολυ ωραίο και όμορφα στολισμένο.',
    date: 'Πριν από έναν μήνα',
    reviewUrl: 'https://maps.app.goo.gl/Z94Ujzcq7QLJ7aVC9'
  },
  {
    id: 'rev-georgia',
    author: 'Georgia Pattichi',
    role: 'Τοπικός οδηγός · 18 κριτικές · 1 φωτογραφία',
    rating: 5,
    source: 'Google Review',
    quote: 'Το φαγητό είναι καταπληκτικό!! Το φαγητό ανανεωνόταν πολύ συχνά, ήταν πολύ φρέσκο και νόστιμο. Το σούσι ήταν επίσης πεντανόστιμο. Το προσωπικό ήταν πολύ ευγενικό και η ατμόσφαιρα ήταν υπέροχη! Το συνιστώ ανεπιφύλακτα αυτό το μέρος!!',
    date: 'Πριν από έναν μήνα',
    reviewUrl: 'https://maps.app.goo.gl/51UdyWG851pXm4Ds5'
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Authentic Asian Atmosphere & Flavors',
    titleEl: 'Αυθεντική Ασιατική Ατμόσφαιρα & Γεύσεις',
    category: 'ambiance',
    imageUrl: imgF19,
    caption: 'Authentic culinary moments and vibrant atmosphere at GoldenWok.',
    captionEl: 'Αυθεντικές γαστρονομικές στιγμές και ζεστή ατμόσφαιρα στο GoldenWok.'
  },
  {
    id: 'gal-2',
    title: 'Exquisite Dining & Culinary Art',
    titleEl: 'Εκλεπτυσμένη Γαστρονομία & Πιάτα',
    category: 'dishes',
    imageUrl: imgF18,
    caption: 'Artisanal dishes and refined flavors prepared with passion and precision.',
    captionEl: 'Χειροποίητα πιάτα και εκλεπτυσμένες γεύσεις φτιαγμένες με πάθος και ακρίβεια.'
  },
  {
    id: 'gal-3',
    title: 'Warm Hospitality & Fine Ambiance',
    titleEl: 'Ζεστή Φιλοξενία & Εκλεπτυσμένος Χώρος',
    category: 'ambiance',
    imageUrl: imgF22,
    caption: 'Welcoming dining spaces crafted for memorable Asian culinary gatherings.',
    captionEl: 'Φιλόξενοι χώροι εστίασης σχεδιασμένοι για αξέχαστες γαστρονομικές στιγμές.'
  },
  {
    id: 'gal-4',
    title: 'Signature Delicacies & Fresh Appetizers',
    titleEl: 'Σπεσιαλιτέ & Φρέσκα Ορεκτικά',
    category: 'dishes',
    imageUrl: imgFood2,
    caption: 'Freshly prepared Asian delicacies and appetizers served daily.',
    captionEl: 'Φρεσκομαγειρεμένα ασιατικά εδέσματα και ορεκτικά που ετοιμάζονται καθημερινά.'
  },
  {
    id: 'gal-5',
    title: 'Master Dim Sum & Traditional Wok',
    titleEl: 'Χειροποίητο Dim Sum & Παραδοσιακό Wok',
    category: 'dishes',
    imageUrl: imgFood6,
    caption: 'Crispy rolls, steamed dim sum, and rich flavors from our Asian kitchen.',
    captionEl: 'Τραγανά ρολά, αχνιστό dim sum και πλούσιες παραδοσιακές γεύσεις από την κουζίνα μας.'
  },
  {
    id: 'gal-6',
    title: 'Golden Buffet & Fresh Specialties',
    titleEl: 'Πλούσιος Ασιατικός Μπουφές & Σπεσιαλιτέ',
    category: 'dishes',
    imageUrl: imgFood10,
    caption: 'An abundant variety of hot authentic dishes and fresh choices.',
    captionEl: 'Μεγάλη ποικιλία από ζεστά αυθεντικά πιάτα και ολόφρεσκες επιλογές.'
  },
  {
    id: 'gal-7',
    title: 'Artisanal Sushi & Fresh Rolls',
    titleEl: 'Χειροποίητο Sushi & Φρέσκα Rolls',
    category: 'dishes',
    imageUrl: imgFood13,
    caption: 'Meticulously crafted sushi rolls, sashimi, and fresh Japanese creations.',
    captionEl: 'Εκλεκτά sushi rolls, sashimi και ολόφρεσκες ιαπωνικές δημιουργίες.'
  }
];

export const BANQUET_SPACES: BanquetSpace[] = [
  {
    id: 'space-1',
    name: 'The Imperial Jade Pavilion',
    chineseName: '玉翠华庭',
    capacity: '12 – 24 Guests',
    description: 'An opulent private dining sanctuary featuring a custom revolving 14-foot dark walnut banquet table, antique Chinese silk screens, dedicated sommelier, and private tea master service.',
    features: ['Custom Rotating Lazy Susan Table', 'Dedicated Sommelier & Tea Master', 'Private Audio & Presentation Screen', 'Personalized Multi-Course Tasting Menu'],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    minSpend: '$1,200 Dinner / $600 Lunch'
  },
  {
    id: 'space-2',
    name: 'The Lantern Terrace & Courtyard',
    chineseName: '红灯别院',
    capacity: '25 – 60 Guests',
    description: 'A breathtaking semi-private indoor-outdoor terrace under glowing hand-woven silk lanterns and a canopy of live black bamboo. Ideal for wedding receptions, milestone birthdays, and company banquets.',
    features: ['Indoor-Outdoor Climate Control', 'Private Cocktail & Dim Sum Bar', 'Custom Lighting & Floral Arrangements', 'Family-Style Feast Packages'],
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    minSpend: '$2,500'
  }
];
