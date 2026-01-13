
export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type ListingCondition = 'New' | 'Used' | 'Refurbished';

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'GHS';
  category: string;
  images: string[];
  location: {
    region: string;
    city: string;
  };
  condition: ListingCondition;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  postedAt: string;
  isBoosted?: boolean;
  isNegotiable?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  totalAds: number;
  joinedAt: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image' | 'location';
};
