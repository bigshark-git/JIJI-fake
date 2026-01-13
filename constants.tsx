
import React from 'react';
import { Category, Listing, User } from './types';

export const COLORS = {
  primary: '#3db83a', // Jiji Green
  accent: '#ffcc00',  // Jiji Yellow
  secondary: '#1a1a1a',
  light: '#f8fafc'
};

export const CATEGORIES: Category[] = [
  { id: 'vehicles', name: 'Vehicles', icon: '🚗', color: '#eef2ff' },
  { id: 'property', name: 'Property', icon: '🏠', color: '#fef2f2' },
  { id: 'phones', name: 'Mobile Phones', icon: '📱', color: '#ecfdf5' },
  { id: 'electronics', name: 'Electronics', icon: '💻', color: '#fffbeb' },
  { id: 'furniture', name: 'Home & Garden', icon: '🛋️', color: '#f5f3ff' },
  { id: 'fashion', name: 'Fashion', icon: '👗', color: '#fdf2f8' },
  { id: 'jobs', name: 'Jobs', icon: '💼', color: '#f0f9ff' },
  { id: 'services', name: 'Services', icon: '🛠️', color: '#f5f5f4' },
  { id: 'beauty', name: 'Beauty', icon: '💄', color: '#fff1f2' },
  { id: 'pets', name: 'Pets', icon: '🐾', color: '#fff7ed' },
];

export const REGIONS = [
  'Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern', 
  'Northern', 'Volta', 'Bono', 'Upper East', 'Upper West'
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Kwame Mensah',
  email: 'kwame@example.com',
  phone: '024 123 4567',
  avatar: 'https://picsum.photos/seed/kwame/200/200',
  rating: 4.8,
  totalAds: 12,
  joinedAt: 'Jan 2023'
};

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    title: 'Toyota Corolla 2018 Special Edition',
    description: 'Neatly used 2018 Toyota Corolla. Very fuel efficient and well maintained. Clean interior, cold AC, and smooth engine. One of the most reliable cars in Ghana.',
    price: 85000,
    currency: 'GHS',
    category: 'vehicles',
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800'],
    location: { region: 'Greater Accra', city: 'East Legon' },
    condition: 'Used',
    sellerId: 'u1',
    sellerName: 'Kwame Mensah',
    sellerPhone: '024 123 4567',
    postedAt: '2024-05-20T10:00:00Z',
    isBoosted: true,
    isNegotiable: true
  },
  {
    id: 'l2',
    title: 'iPhone 15 Pro Max 256GB - Sealed',
    description: 'Brand new iPhone 15 Pro Max. Sealed in box. All colors available including Natural Titanium. 1-year Apple Warranty included. Fast delivery within Accra.',
    price: 18500,
    currency: 'GHS',
    category: 'phones',
    images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800'],
    location: { region: 'Greater Accra', city: 'Circle' },
    condition: 'New',
    sellerId: 'u2',
    sellerName: 'Gadget Hub',
    sellerPhone: '055 999 8888',
    postedAt: '2024-05-21T08:30:00Z'
  },
  {
    id: 'l3',
    title: '2 Bedroom Furnished Apartment in Adum',
    description: 'Beautifully furnished apartment in the heart of Kumasi. Secure environment with 24/7 security. Modern kitchen, spacious balcony, and backup generator.',
    price: 3500,
    currency: 'GHS',
    category: 'property',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800'],
    location: { region: 'Ashanti', city: 'Adum' },
    condition: 'New',
    sellerId: 'u3',
    sellerName: 'Abena Real Estate',
    sellerPhone: '020 444 5555',
    postedAt: '2024-05-19T14:15:00Z'
  },
  {
    id: 'l4',
    title: 'Dell XPS 13 Laptop (2023)',
    description: 'High performance laptop for developers and creatives. 16GB RAM, 512GB SSD. Lightweight and powerful. Perfect for students and professionals.',
    price: 7200,
    currency: 'GHS',
    category: 'electronics',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'],
    location: { region: 'Western', city: 'Takoradi' },
    condition: 'Used',
    sellerId: 'u4',
    sellerName: 'Tech Deals GH',
    sellerPhone: '027 111 2222',
    postedAt: '2024-05-20T16:45:00Z'
  },
  {
    id: 'l5',
    title: 'Organic Shea Butter - 1kg',
    description: 'Pure, organic unrefined shea butter from Northern Ghana. Excellent for skin and hair care. Wholesale and retail available.',
    price: 45,
    currency: 'GHS',
    category: 'beauty',
    images: ['https://images.unsplash.com/photo-1626778400035-7c980309990e?auto=format&fit=crop&q=80&w=800'],
    location: { region: 'Northern', city: 'Tamale' },
    condition: 'New',
    sellerId: 'u5',
    sellerName: 'Ama Organics',
    sellerPhone: '024 000 0000',
    postedAt: '2024-05-22T09:00:00Z'
  },
  {
    id: 'l6',
    title: 'Nike Air Jordan 1 Retro',
    description: 'Authentic Nike sneakers. Multiple sizes available. Trendy and comfortable. Order now for same-day delivery.',
    price: 850,
    currency: 'GHS',
    category: 'fashion',
    images: ['https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'],
    location: { region: 'Greater Accra', city: 'Madina' },
    condition: 'New',
    sellerId: 'u6',
    sellerName: 'Kickz GH',
    sellerPhone: '054 555 1234',
    postedAt: '2024-05-22T12:30:00Z'
  }
];
