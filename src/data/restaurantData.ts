import { MenuItem, ReviewItem, GalleryPhoto, BanquetSpace } from '../types';
import { CHINESE_MENU_ITEMS } from './chineseMenuData';
import { JAPANESE_MENU_ITEMS } from './japaneseMenuData';

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
    title: 'Authentic Asian Dining & Atmosphere',
    titleEl: 'Αυθεντική Ασιατική Ατμόσφαιρα & Φιλοξενία',
    category: 'ambiance',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczPR2pJrssPUa0rUScyQlHJqP2IzTYqjfKPpxvgj1B52O93oJgwzphZ39pjoNtyCuviaMaCXjl0Ga6Ndq_emE9JZKxnw1Yu8Ny4AcYZYCmyeZW4wUrk=w1600-h1200-no',
    caption: 'Authentic culinary moments and vibrant dining space at GoldenWok.',
    captionEl: 'Αυθεντικές γαστρονομικές στιγμές και ζεστός χώρος στο GoldenWok.'
  },
  {
    id: 'gal-2',
    title: 'Exquisite Dining & Culinary Art',
    titleEl: 'Εκλεπτυσμένη Γαστρονομία & Πιάτα',
    category: 'dishes',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczNLTA-M0ENGkUWtu5ts8nCabzmB309kvgz1XTHqgnGSbTRmVMKzvY971RX3dyJZ3FkVw1Yv_AtcnflLKena6y-3wKAPz7VxuKXGy0AfJZbgMbPK1Mw=w1600-h1200-no',
    caption: 'Artisanal dishes and refined Asian flavors prepared with passion.',
    captionEl: 'Χειροποίητα πιάτα και εκλεπτυσμένες ασιατικές γεύσεις με πάθος.'
  },
  {
    id: 'gal-3',
    title: 'Warm Hospitality & Elegant Interior',
    titleEl: 'Ζεστή Φιλοξενία & Κομψός Εσωτερικός Χώρος',
    category: 'ambiance',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczMMayv2170bkYQNUTKVRxhBIEr4DmWkl-upSuuNFPRohWJjurULaK-Wz4jNI91-cjKm7xP12gAP_FY6fXfGYQhwvT7RxpGh5942G12SqRyLs67AcnU=w1600-h1200-no',
    caption: 'Welcoming dining spaces crafted for memorable Asian culinary gatherings.',
    captionEl: 'Φιλόξενοι χώροι εστίασης σχεδιασμένοι για αξέχαστες γαστρονομικές στιγμές.'
  },
  {
    id: 'gal-4',
    title: 'Signature Delicacies & Fresh Appetizers',
    titleEl: 'Σπεσιαλιτέ & Φρέσκα Ορεκτικά',
    category: 'dishes',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczMBqguArwK8dMbqJXrPmExHlcNBrRad8kuxCvlARlgjiRJgd2ryK8p5jKGgTUaTs24tT5sk6uWKgjk9Rvv-bvNX2Gb6kCqkHPyk4IFur-1fFhgNKM0=w1600-h1200-no',
    caption: 'Freshly prepared Asian delicacies and appetizers served daily.',
    captionEl: 'Φρεσκομαγειρεμένα ασιατικά εδέσματα και ορεκτικά που ετοιμάζονται καθημερινά.'
  },
  {
    id: 'gal-5',
    title: 'Master Dim Sum & Traditional Wok',
    titleEl: 'Χειροποίητο Dim Sum & Παραδοσιακό Wok',
    category: 'dishes',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczPH5ZMlQWQalAC7Ln_mqOMaESnqEkKbfNFC6Vq30YG3EHIWDvNFVWFLCfi06edF0qpX0ZlZ9HixGmKJnKtLtDSegtolkPtsoVqiGZuEx1qo6xksuVQ=w1600-h1200-no',
    caption: 'Crispy rolls, steamed dim sum, and rich flavors from our Asian kitchen.',
    captionEl: 'Τραγανά ρολά, αχνιστό dim sum και πλούσιες παραδοσιακές γεύσεις από την κουζίνα μας.'
  },
  {
    id: 'gal-6',
    title: 'Golden Buffet & Fresh Specialties',
    titleEl: 'Πλούσιος Ασιατικός Μπουφές & Σπεσιαλιτέ',
    category: 'dishes',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczPg8x63oTd9jG7B8T-8ngY_nrwLdQwOoyzlR0BT2k0P7dWgl4EHjf1g-HzKXsWeQQikbstWGr74EPdmP_KrKysBEqXSc5htrxEi7joEtD2vxeN-VS4=w1600-h1200-no',
    caption: 'An abundant variety of hot authentic dishes and fresh choices.',
    captionEl: 'Μεγάλη ποικιλία από ζεστά αυθεντικά πιάτα και ολόφρεσκες επιλογές.'
  },
  {
    id: 'gal-7',
    title: 'Artisanal Sushi & Fresh Rolls',
    titleEl: 'Χειροποίητο Sushi & Φρέσκα Rolls',
    category: 'dishes',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczMarOcLDgkk7hpn3XErqXODrTvCeny-5ok9NcLjAP87EZSpdxdrCFgoIn3orM764KztR0xk0GTHDdo9JMR6Iw9MlelW46jU28L0w21xu5cJ6hyMH2E=w1600-h1200-no',
    caption: 'Meticulously crafted sushi rolls, sashimi, and fresh Japanese creations.',
    captionEl: 'Εκλεκτά sushi rolls, sashimi και ολόφρεσκες ιαπωνικές δημιουργίες.'
  },
  {
    id: 'gal-8',
    title: 'Warm Asian Ambiance & Lighting',
    titleEl: 'Ζεστή Ασιατική Ατμόσφαιρα & Φωτισμός',
    category: 'ambiance',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczNX60uvh-njV_jZFqAth617N_efn0BF825BqoPzG5hhc2ax9aLfksISAtC1uZ4y38t9XENlCKRUZRysI04u7jdOBOTLb_YBsTznav5UjY2T232YdRM=w1600-h1200-no',
    caption: 'Comfortable seating and traditional touches for an authentic culinary experience.',
    captionEl: 'Άνετοι χώροι και παραδοσιακές πινελιές για μια αυθεντική γαστρονομική εμπειρία.'
  },
  {
    id: 'gal-9',
    title: 'Celebrations & Memorable Gatherings',
    titleEl: 'Εκδηλώσεις & Αξέχαστες Στιγμές',
    category: 'ambiance',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczPqU79ooskg8PJBndL-8rUlxAVTkdk02j3UxvLd-ye2gLYKTSqIsWqa321dFfK7hSJjDHlspRIVjIBx5YZvkRwLctuG5TPiE5Wwz_scNlCZ8n1s6Sk=w1600-h1200-no',
    caption: 'The ideal venue for family dinners, banquets, and special celebrations.',
    captionEl: 'Ο ιδανικός προορισμός για οικογενειακά γεύματα, τραπέζια και γιορτές.'
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
