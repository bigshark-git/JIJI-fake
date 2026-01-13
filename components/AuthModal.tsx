
import React, { useState } from 'react';
import { X, Phone, Mail, Facebook, Loader2 } from 'lucide-react';
import { COLORS } from '../constants';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState<'method' | 'otp'>('method');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({ name: 'User', phone });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1">Connect with millions of buyers and sellers</p>
          </div>

          {step === 'method' ? (
            <div className="space-y-4">
              <form onSubmit={handlePhoneSubmit}>
                <div className="relative mb-3">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-2 border-gray-200">
                    <img src="https://flagcdn.com/w20/gh.png" alt="GH" className="w-4 h-3" />
                    <span className="text-sm font-bold text-gray-600">+233</span>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    className="w-full pl-24 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Phone className="w-5 h-5" />}
                  Continue with Phone
                </button>
              </form>

              <div className="relative py-4 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs font-bold text-gray-400 uppercase">Or continue with</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-100 rounded-xl hover:bg-gray-50 font-bold text-sm text-gray-700">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" /> Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1877F2] text-white rounded-xl hover:opacity-90 font-bold text-sm">
                  <Facebook className="w-4 h-4" /> Facebook
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">We've sent a 4-digit code to</p>
                <p className="font-bold text-gray-800">+233 {phone}</p>
                <button type="button" onClick={() => setStep('method')} className="text-xs text-green-600 font-bold hover:underline mt-1">Change Number</button>
              </div>

              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4].map(i => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    autoFocus={i === 1}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                Verify & Login
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-gray-400">
            By continuing, you agree to MarketPlace GH's <br />
            <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
