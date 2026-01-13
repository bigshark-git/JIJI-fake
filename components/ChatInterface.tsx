
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Image, MapPin, ShieldCheck, MoreVertical, Phone } from 'lucide-react';
import { Listing, Message } from '../types';

interface ChatInterfaceProps {
  listing: Listing;
  onClose: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ listing, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'seller', text: `Hi! Is this ${listing.title} still available?`, timestamp: new Date().toISOString(), type: 'text' },
    { id: '2', senderId: 'me', text: "Yes, it's still available. Would you like to come check it?", timestamp: new Date().toISOString(), type: 'text' },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-[110] w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full lg:hidden">
            <X className="w-5 h-5" />
          </button>
          <img src={`https://picsum.photos/seed/${listing.sellerId}/200`} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">{listing.sellerName}</h3>
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-500 hover:text-green-600 rounded-full"><Phone className="w-5 h-5" /></button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full lg:block hidden" onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Listing Summary */}
      <div className="p-3 bg-gray-50 border-b flex items-center gap-3">
        <img src={listing.images[0]} className="w-12 h-12 rounded-lg object-cover" />
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-gray-800 truncate">{listing.title}</h4>
          <p className="text-sm font-black text-gray-900">GHS {listing.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Safety Banner */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-amber-500" />
        <span className="text-[10px] font-bold text-amber-700">Safety Tip: Never pay before inspection. Stay safe!</span>
      </div>

      {/* Chat Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.senderId === 'me' 
              ? 'bg-green-600 text-white rounded-br-none shadow-md' 
              : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
            }`}>
              {msg.text}
              <div className={`text-[10px] mt-1 ${msg.senderId === 'me' ? 'text-green-100' : 'text-gray-400'}`}>
                12:45 PM
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors"><Image className="w-5 h-5" /></button>
            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors"><MapPin className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Type your message..."
              className="w-full bg-gray-100 border-none rounded-full py-3 px-4 focus:ring-2 focus:ring-green-500 outline-none text-sm"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <button 
            onClick={handleSend}
            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all shadow-md active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
