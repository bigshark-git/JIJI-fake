
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { AdForm } from './components/AdForm';
import { AuthModal } from './components/AuthModal';
import { ChatInterface } from './components/ChatInterface';
/* Added CATEGORIES to the constants import to resolve missing name on line 126 */
import { MOCK_LISTINGS, MOCK_USER, COLORS, CATEGORIES } from './constants';
import { Listing, Category } from './types';
import { ArrowRight, Star, MapPin, Phone, MessageCircle, AlertTriangle, ChevronLeft, Heart, Share2, Filter, X, PlusCircle, CheckCircle2, Clock } from 'lucide-react';

type View = 'Home' | 'AdDetails' | 'PostAd' | 'Dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('Home');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatListing, setActiveChatListing] = useState<Listing | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Filters state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [conditionFilter, setConditionFilter] = useState<string | null>(null);

  const filteredListings = useMemo(() => {
    let list = [...MOCK_LISTINGS];
    if (selectedCategoryId) {
      list = list.filter(l => l.category === selectedCategoryId);
    }
    if (searchTerm) {
      list = list.filter(l => 
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (conditionFilter) {
      list = list.filter(l => l.condition === conditionFilter);
    }
    list = list.filter(l => l.price >= priceRange[0] && l.price <= priceRange[1]);
    
    return list;
  }, [selectedCategoryId, searchTerm, priceRange, conditionFilter]);

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentView('AdDetails');
    window.scrollTo(0, 0);
  };

  const openChat = (listing: Listing) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setActiveChatListing(listing);
    setIsChatOpen(true);
  };

  const handlePostClick = () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setCurrentView('PostAd');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'Home':
        return (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl">
                  <div className="relative z-10">
                    <h2 className="text-4xl font-black mb-2 leading-tight">Fastest way to sell <br/>anything in Ghana</h2>
                    <p className="opacity-90 mb-8 max-w-xs text-lg">Post your free ad and reach verified buyers in minutes.</p>
                    <button 
                      onClick={handlePostClick}
                      className="bg-white text-green-700 px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-lg"
                    >
                      Post an Ad
                    </button>
                  </div>
                  <div className="absolute right-[-40px] bottom-[-40px] opacity-10 transform group-hover:rotate-12 transition-transform duration-700">
                    <PlusCircle className="w-80 h-80" />
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl border border-gray-800">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2">Verified Sellers Only</h2>
                    <p className="font-medium opacity-60 mb-8 max-w-xs">Shop with confidence from pre-screened dealers and individuals.</p>
                    <div className="flex gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <img key={i} src={`https://picsum.photos/seed/${i+10}/50`} className="w-10 h-10 rounded-full border-2 border-[#1a1a1a]" />
                        ))}
                      </div>
                      <div className="text-xs font-bold text-gray-400">Join 10k+ <br/> active sellers</div>
                    </div>
                  </div>
                  <div className="absolute right-6 top-6">
                    <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <CategoryBar 
              selectedId={selectedCategoryId} 
              onSelectCategory={setSelectedCategoryId} 
            />

            {/* Main Listings Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-black text-gray-900">
                    {selectedCategoryId ? `${CATEGORIES.find(c => c.id === selectedCategoryId)?.name}` : 'Trending near you'}
                  </h2>
                  <p className="text-gray-500 font-medium">Over {filteredListings.length} results found in Ghana</p>
                </div>
                
                {/* Desktop Filter Bar */}
                <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-sm font-bold text-gray-700 whitespace-nowrap">
                    <Filter className="w-4 h-4 text-green-600" />
                    Filters
                  </div>
                  <select 
                    onChange={(e) => setConditionFilter(e.target.value || null)}
                    className="px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-sm font-bold text-gray-700 outline-none"
                  >
                    <option value="">Condition: All</option>
                    <option value="New">Brand New</option>
                    <option value="Used">Used</option>
                  </select>
                  <button 
                    onClick={() => setPriceRange([0, 5000])}
                    className="px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-sm font-bold text-gray-700 whitespace-nowrap hover:bg-green-50"
                  >
                    Under GHS 5,000
                  </button>
                  {(conditionFilter || priceRange[0] !== 0 || priceRange[1] !== 1000000) && (
                    <button 
                      onClick={() => { setConditionFilter(null); setPriceRange([0, 1000000]); }}
                      className="text-xs font-black text-red-500 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {filteredListings.map(listing => (
                    <ProductCard 
                      key={listing.id} 
                      listing={listing} 
                      onClick={handleListingClick} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-[40px] border border-gray-100 shadow-sm">
                  <div className="text-7xl mb-6">🏜️</div>
                  <h3 className="text-2xl font-black text-gray-900">Nothing here yet</h3>
                  <p className="text-gray-500 mt-2 text-lg">Try widening your filters or search keywords.</p>
                  <button 
                    onClick={() => { setSelectedCategoryId(null); setSearchTerm(''); setConditionFilter(null); setPriceRange([0, 1000000]); }}
                    className="mt-8 bg-green-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-100"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'AdDetails':
        if (!selectedListing) return null;
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setCurrentView('Home')}
              className="mb-8 flex items-center gap-2 text-gray-600 font-bold hover:text-green-600 p-2 -ml-2 rounded-xl hover:bg-green-50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" /> Back to Listings
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column: Media & Description */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 relative group">
                  <div className="aspect-[16/10]">
                    <img 
                      src={selectedListing.images[0]} 
                      alt={selectedListing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute top-6 left-6 flex gap-2">
                    <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {selectedListing.images.length} Photos
                    </div>
                    {selectedListing.isBoosted && (
                      <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" /> Featured
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                      <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">{selectedListing.title}</h1>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 font-bold text-gray-700">
                          <MapPin className="w-4 h-4 text-green-600" />
                          {selectedListing.location.city}, {selectedListing.location.region}
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-4 h-4 text-gray-400" />
                          Posted 2 hours ago
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 text-gray-600 transition-colors">
                        <Heart className="w-6 h-6" />
                      </button>
                      <button className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 text-gray-600 transition-colors">
                        <Share2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                    <div className="p-4 bg-gray-50 rounded-3xl text-center border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Condition</p>
                      <p className="font-black text-gray-900">{selectedListing.condition}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-3xl text-center border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Category</p>
                      <p className="font-black text-gray-900 capitalize">{selectedListing.category}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-3xl text-center border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Negotiable</p>
                      <p className="font-black text-gray-900">{selectedListing.isNegotiable ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-3xl text-center border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Verified</p>
                      <p className="font-black text-green-600 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Seller
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-gray-900">Item Description</h3>
                    <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                      {selectedListing.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & Seller */}
              <div className="space-y-8">
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 sticky top-24">
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-4xl font-black text-gray-900">GHS {selectedListing.price.toLocaleString()}</span>
                    {selectedListing.isNegotiable && (
                      <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Negotiable</span>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-green-600 text-white font-black py-5 rounded-[22px] flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-xl shadow-green-100 group">
                      <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
                      {selectedListing.sellerPhone}
                    </button>
                    <button 
                      onClick={() => openChat(selectedListing)}
                      className="w-full border-2 border-green-600 text-green-600 font-black py-5 rounded-[22px] flex items-center justify-center gap-3 hover:bg-green-50 transition-all shadow-sm"
                    >
                      <MessageCircle className="w-5 h-5" /> Start Chat
                    </button>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <img 
                          src={`https://picsum.photos/seed/${selectedListing.sellerId}/200`} 
                          className="w-20 h-20 rounded-[24px] object-cover border-4 border-gray-50"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl text-gray-900">{selectedListing.sellerName}</h4>
                        <div className="flex items-center gap-1.5 text-yellow-500">
                          <Star className="w-4 h-4 fill-yellow-500" />
                          <span className="text-sm font-black">4.8 Rating</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-black rounded-2xl transition-all">
                      Visit Seller's Store
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 p-8 rounded-[40px] border border-amber-100">
                  <div className="flex items-center gap-3 mb-4 text-amber-600">
                    <AlertTriangle className="w-6 h-6" />
                    <h5 className="font-black text-lg">Safety Precautions</h5>
                  </div>
                  <ul className="text-sm text-amber-900/70 space-y-4 font-medium">
                    <li className="flex gap-2"><span>1.</span> Never pay any advance for items you haven't seen.</li>
                    <li className="flex gap-2"><span>2.</span> Meet the seller in a public place (e.g. Accra Mall).</li>
                    <li className="flex gap-2"><span>3.</span> Verify the item's condition before final payment.</li>
                    <li className="flex gap-2"><span>4.</span> Beware of unrealistically low prices.</li>
                  </ul>
                  <button className="mt-8 w-full text-red-500 text-sm font-black underline decoration-2 underline-offset-4">
                    Report Fraudulent Ad
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'PostAd':
        return (
          <AdForm 
            onCancel={() => setCurrentView('Home')} 
            onSuccess={() => {
              setIsSuccessModalOpen(true);
              setCurrentView('Home');
            }} 
          />
        );

      case 'Dashboard':
        return (
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-green-700 h-48 relative">
                <div className="absolute -bottom-16 left-12 p-2 bg-white rounded-[32px] shadow-2xl">
                  <img src={MOCK_USER.avatar} className="w-32 h-32 rounded-[28px] object-cover" />
                </div>
              </div>
              <div className="pt-20 pb-10 px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h1 className="text-4xl font-black text-gray-900">{MOCK_USER.name}</h1>
                  <p className="text-gray-500 font-bold mt-1">Verified Member • Joined Jan 2023</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center bg-gray-50 px-8 py-5 rounded-[24px] border border-gray-100">
                    <div className="text-3xl font-black text-gray-900">{MOCK_USER.totalAds}</div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">My Ads</div>
                  </div>
                  <div className="text-center bg-gray-50 px-8 py-5 rounded-[24px] border border-gray-100">
                    <div className="text-3xl font-black text-gray-900">{MOCK_USER.rating}</div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Rating</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 bg-gray-50/50 p-6 flex gap-6 overflow-x-auto hide-scrollbar">
                {['My Listings', 'Chats', 'Favorites', 'Reviews', 'Settings'].map((tab, idx) => (
                  <button key={tab} className={`px-8 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${idx === 0 ? 'bg-white shadow-md text-green-600' : 'text-gray-500 hover:bg-white'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-12 space-y-6">
                <h3 className="text-2xl font-black text-gray-900">Recently Posted</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_LISTINGS.slice(0, 2).map(l => (
                    <div key={l.id} className="bg-white p-6 rounded-[32px] border border-gray-100 flex gap-6 hover:shadow-xl transition-all group">
                      <img src={l.images[0]} className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="font-black text-lg text-gray-900 truncate">{l.title}</h4>
                        <p className="text-green-600 font-black text-xl mb-3">GHS {l.price.toLocaleString()}</p>
                        <div className="flex gap-2">
                          <button className="text-xs font-black px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100">Edit Ad</button>
                          <button className="text-xs font-black px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24 lg:pb-0">
      <Header 
        onHomeClick={() => { setCurrentView('Home'); setSelectedCategoryId(null); setSearchTerm(''); }}
        onPostClick={handlePostClick}
        onDashboardClick={() => user ? setCurrentView('Dashboard') : setIsAuthOpen(true)}
        onSearch={setSearchTerm}
      />
      
      <main className="min-h-screen">
        {renderContent()}
      </main>

      {/* Auth Modal */}
      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)} 
          onSuccess={(u) => { setUser(u); setIsAuthOpen(false); }} 
        />
      )}

      {/* Chat Sidebar/Interface */}
      {isChatOpen && activeChatListing && (
        <ChatInterface 
          listing={activeChatListing} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}

      {/* Mobile Bottom Nav */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center h-20 px-4 z-40 shadow-2xl rounded-t-3xl">
        <button 
          onClick={() => setCurrentView('Home')}
          className={`flex flex-col items-center gap-1.5 ${currentView === 'Home' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <div className="text-2xl">🏠</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
        </button>
        <button 
          onClick={() => {
            if(!user) { setIsAuthOpen(true); return; }
            // In a real app, open chats list
          }}
          className="flex flex-col items-center gap-1.5 text-gray-400"
        >
          <div className="text-2xl">💬</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Chats</span>
        </button>
        <button 
          onClick={handlePostClick}
          className="flex flex-col items-center justify-center -mt-12 group"
        >
          <div className="w-16 h-16 rounded-[24px] shadow-2xl shadow-green-200 flex items-center justify-center text-white transform group-active:scale-95 transition-all" style={{ backgroundColor: COLORS.accent }}>
            <PlusCircle className="w-9 h-9 text-gray-900" />
          </div>
          <span className="text-[10px] font-black mt-2 text-gray-700 uppercase tracking-widest">Sell</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-400">
          <div className="text-2xl">❤️</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Saved</span>
        </button>
        <button 
          onClick={() => user ? setCurrentView('Dashboard') : setIsAuthOpen(true)}
          className={`flex flex-col items-center gap-1.5 ${currentView === 'Dashboard' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <div className="text-2xl">👤</div>
          <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
        </button>
      </nav>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-12 max-sm w-full text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-2">Listing Success!</h3>
            <p className="text-gray-500 mb-10 text-lg">Your ad is being reviewed by our moderation team.</p>
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full bg-green-600 text-white font-black py-5 rounded-2xl hover:bg-green-700 shadow-xl shadow-green-100 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
