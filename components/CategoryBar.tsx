
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryBarProps {
  onSelectCategory: (id: string | null) => void;
  selectedId: string | null;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ onSelectCategory, selectedId }) => {
  return (
    <div className="bg-white py-4 shadow-sm overflow-x-auto hide-scrollbar border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 md:gap-6">
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex flex-col items-center gap-2 min-w-[70px] transition-all ${
            selectedId === null ? 'scale-110' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-xl shadow-sm border border-gray-200">
            🌍
          </div>
          <span className={`text-[11px] font-bold text-center ${selectedId === null ? 'text-green-600' : 'text-gray-600'}`}>
            All
          </span>
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex flex-col items-center gap-2 min-w-[70px] transition-all ${
              selectedId === cat.id ? 'scale-110' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-gray-200"
              style={{ backgroundColor: cat.color }}
            >
              {cat.icon}
            </div>
            <span className={`text-[11px] font-bold text-center ${selectedId === cat.id ? 'text-green-600' : 'text-gray-600'}`}>
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
