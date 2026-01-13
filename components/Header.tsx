
import React, { useState } from 'react';
import { Search, User, PlusCircle, Menu, X, Bell, MessageSquare } from 'lucide-react';
import { COLORS } from '../constants';

interface HeaderProps {
  onPostClick: () => void;
  onDashboardClick: () => void;
  onHomeClick: () => void;
  onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onPostClick, onDashboardClick, onHomeClick, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={onHomeClick}
          className="flex items-center gap-1 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: COLORS.primary }}>
            M
          </div>
          <span className="hidden md:block font-bold text-xl tracking-tight text-gray-800">
            MarketPlace<span style={{ color: COLORS.primary }}>GH</span>
          </span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-sm md:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </form>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="text-gray-600 hover:text-green-600 relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </button>
          <button className="text-gray-600 hover:text-green-600">
            <MessageSquare className="w-6 h-6" />
          </button>
          <button 
            onClick={onDashboardClick}
            className="flex items-center gap-2 text-gray-700 font-medium hover:text-green-600 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>My Profile</span>
          </button>
          <button 
            onClick={onPostClick}
            className="flex items-center gap-2 text-white px-6 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
            style={{ backgroundColor: COLORS.accent, color: '#1a1a1a' }}
          >
            <PlusCircle className="w-5 h-5" />
            SELL
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 p-4 flex flex-col gap-4 shadow-xl">
          <button 
            onClick={() => { onDashboardClick(); setIsMenuOpen(false); }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            <User className="w-6 h-6" />
            <span className="font-medium">My Profile</span>
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
            <Bell className="w-6 h-6" />
            <span className="font-medium">Notifications</span>
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
            <MessageSquare className="w-6 h-6" />
            <span className="font-medium">Messages</span>
          </button>
          <button 
            onClick={() => { onPostClick(); setIsMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-bold text-lg"
            style={{ backgroundColor: COLORS.accent, color: '#1a1a1a' }}
          >
            <PlusCircle className="w-6 h-6" />
            POST FREE AD
          </button>
        </div>
      )}
    </header>
  );
};
