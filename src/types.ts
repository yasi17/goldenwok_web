export type MenuCategory = 
  | 'all'
  | 'dim-sum'
  | 'wok-hei'
  | 'duck-specialties'
  | 'noodles-rice'
  | 'soups-greens'
  | 'tea-cocktails'
  | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  nameEl?: string;
  chineseName: string;
  category: MenuCategory;
  price: number;
  description: string;
  descriptionEl?: string;
  ingredients: string[];
  ingredientsEl?: string[];
  imageUrl: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  dietary?: ('Vegetarian' | 'Gluten-Free' | 'Nut-Free' | 'Shellfish-Free' | 'Dairy-Free')[];
  prepTimeMinutes?: number;
  pairingNote?: string;
  pairingNoteEl?: string;
  calories?: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  spicePreference?: 'Mild' | 'Medium' | 'Authentic Szechuan Spicy' | 'Non-Spicy';
  specialInstructions?: string;
}

export interface ReservationDetails {
  id?: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  seatingArea: 'Main Lantern Dining Room' | 'Chef\'s Wok Counter' | 'Courtyard Bamboo Garden' | 'Private Imperial Pavilion';
  occasion?: 'Casual Dining' | 'Birthday' | 'Anniversary' | 'Business Dinner' | 'Date Night' | 'Celebration';
  specialRequests?: string;
  createdAt?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  source: string;
  quote: string;
  date: string;
  reviewUrl?: string;
  avatarUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'dishes' | 'ambiance' | 'wok-fire' | 'bar-tea';
  imageUrl: string;
  caption: string;
}

export interface BanquetSpace {
  id: string;
  name: string;
  chineseName: string;
  capacity: string;
  description: string;
  features: string[];
  imageUrl: string;
  minSpend: string;
}
