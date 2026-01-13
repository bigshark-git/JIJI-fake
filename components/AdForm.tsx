
import React, { useState } from 'react';
/* Added X to the imports from lucide-react */
import { Camera, ChevronRight, Wand2, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { CATEGORIES, REGIONS, COLORS } from '../constants';
import { geminiService } from '../services/gemini';

interface AdFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export const AdForm: React.FC<AdFormProps> = ({ onCancel, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moderationError, setModerationError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    condition: 'Used',
    region: 'Greater Accra',
    city: '',
    isNegotiable: true
  });

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.category) return;
    setLoading(true);
    const desc = await geminiService.generateDescription(formData.title, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setModerationError(null);

    // AI Moderation before saving
    const moderation = await geminiService.moderateListing(formData.title, formData.description);
    if (!moderation.safe) {
      setModerationError(moderation.reason || "This listing violated our safety standards.");
      setLoading(false);
      return;
    }

    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Post a free Ad</h1>
          <p className="text-gray-500">Reach thousands of buyers in Ghana instantly.</p>
        </div>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">Cancel</button>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? 'bg-green-500' : 'bg-gray-200'}`} 
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button type="button" className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-green-400 hover:text-green-500 transition-all bg-gray-50">
                <Camera className="w-8 h-8" />
                <span className="text-xs font-bold">Add Photo</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
              <input 
                type="text" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="e.g. Brand New iPhone 15 Pro"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <button 
              type="button"
              disabled={!formData.category || !formData.title}
              onClick={() => setStep(2)}
              className="w-full bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-700">Description *</label>
                <button 
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={loading}
                  className="text-xs font-bold flex items-center gap-1 text-green-600 hover:text-green-700 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                  Generate with AI
                </button>
              </div>
              <textarea 
                rows={5}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Describe your item in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Condition *</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price (GHS) *</label>
                <input 
                  type="number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="negotiable" 
                className="w-5 h-5 rounded text-green-600 focus:ring-green-500"
                checked={formData.isNegotiable}
                onChange={(e) => setFormData({ ...formData, isNegotiable: e.target.checked })}
              />
              <label htmlFor="negotiable" className="text-sm font-medium text-gray-600">Negotiable</label>
            </div>

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl"
              >
                Back
              </button>
              <button 
                type="button"
                onClick={() => setStep(3)}
                className="flex-[2] bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700"
              >
                Last Step <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Region *</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                >
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City/Area *</label>
                <input 
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="e.g. Osu"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
              <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div className="text-xs text-amber-700">
                <p className="font-bold mb-1">Safety Tip</p>
                <p>Never pay in advance. Meet the seller in a public place to inspect the item before making any payment.</p>
              </div>
            </div>

            {moderationError && (
              <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700 font-medium">{moderationError}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-[2] bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg shadow-green-200 disabled:opacity-70 transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                {loading ? 'Verifying...' : 'POST AD NOW'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
