
import React from 'react';
import { MapPin, Heart, Clock, ShieldCheck } from 'lucide-react';
import { Listing } from '../types';
import { COLORS } from '../constants';

interface ProductCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ listing, onClick }) => {
  return (
    <div 
      onClick={() => onClick(listing)}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={listing.images[0]} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {listing.isBoosted && (
          <div 
            className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 text-white uppercase shadow-sm"
            style={{ backgroundColor: COLORS.primary }}
          >
            <ShieldCheck className="w-3 h-3" />
            Top Ad
          </div>
        )}
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm"
          onClick={(e) => { e.stopPropagation(); /* Handle Favorite */ }}
        >
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
          {listing.images.length} photos
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors">
          {listing.title}
        </h3>
        
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-lg font-extrabold text-gray-900">
            {listing.currency} {listing.price.toLocaleString()}
          </span>
          {listing.isNegotiable && (
            <span className="text-[10px] font-medium text-gray-400">Negotiable</span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="truncate max-w-[100px]">{listing.location.city}, {listing.location.region}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span>2h ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
