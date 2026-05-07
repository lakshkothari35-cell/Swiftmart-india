import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Search, X, Home, Briefcase, Plus, Check, ChevronRight, Zap, Globe } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { Address } from '../../types';
import { cn } from '../../lib/utils';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { currentAddress, savedAddresses, isLoading, detectLocation, setCurrentAddress, addAddress } = useLocation();
  const [step, setStep] = useState<'search' | 'details'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [tempAddress, setTempAddress] = useState<Partial<Address>>({});
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleManualLocation = () => {
    setTempAddress({
      full_address: searchQuery || 'Manual Location Entry',
      lat: 21.1702,
      lng: 72.8311
    });
    setStep('details');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    addAddress({
      type: formData.get('type') as 'Home' | 'Work' | 'Other',
      full_address: tempAddress.full_address || '',
      house_no: formData.get('house_no') as string,
      area: formData.get('area') as string,
      landmark: formData.get('landmark') as string,
      city: tempAddress.city || '',
      state: tempAddress.state || '',
      pincode: formData.get('pincode') as string,
      lat: tempAddress.lat || 0,
      lng: tempAddress.lng || 0,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-gray-900 border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/5">
              <h2 className="text-xl font-bold tracking-tight text-white">
                {step === 'search' ? 'Change Location' : 'Address Details'}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {step === 'search' ? (
                <div className="space-y-6">
                  {/* Search Bar */}
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={18} />
                    <input
                      type="text"
                      placeholder="Search for area, street name..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                      autoFocus
                    />
                  </div>

                  {/* Manual Entry or Detect Location */}
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        detectLocation().then(() => onClose());
                      }}
                      className="w-full flex items-center gap-4 p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl group hover:bg-brand-primary/10 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.3)]">
                        <Navigation size={20} className="text-black" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-brand-primary uppercase tracking-tighter">Use current location</p>
                        <p className="text-[11px] text-brand-primary/60 font-bold uppercase tracking-widest">Detecting location via GPS</p>
                      </div>
                    </button>

                    {searchQuery.length > 0 && (
                      <button
                        onClick={handleManualLocation}
                        className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-brand-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                            <Plus size={20} />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-white tracking-tight">Use "{searchQuery}"</p>
                            <p className="text-[11px] text-slate-500 font-medium">Add details for this address</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-600 group-hover:text-brand-primary" />
                      </button>
                    )}
                  </div>

                  {/* Saved Addresses */}
                  {savedAddresses.length > 0 && searchQuery.length === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Saved Addresses</h3>
                      <div className="space-y-2">
                        {savedAddresses.map((addr) => (
                          <button
                            key={addr.id}
                            onClick={() => {
                                setCurrentAddress(addr);
                                onClose();
                            }}
                            className="w-full flex items-center gap-4 p-4 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-2xl transition-all text-left"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                              {addr.type === 'Home' ? <Home size={20} /> : addr.type === 'Work' ? <Briefcase size={20} /> : <MapPin size={20} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{addr.type}</p>
                                <p className="text-xs text-slate-500 truncate font-medium">{addr.full_address}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSaveAddress} className="space-y-6">
                    <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Selected Location</p>
                            <p className="text-xs text-white font-medium line-clamp-2">{tempAddress.full_address}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <input
                                name="house_no"
                                type="text"
                                required
                                placeholder="House / Flat No.*"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                            />
                            <input
                                name="area"
                                type="text"
                                required
                                placeholder="Apartment / Road / Area*"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                            />
                            <input
                                name="landmark"
                                type="text"
                                placeholder="Landmark (Optional)"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                            />
                            <input
                                name="pincode"
                                type="text"
                                required
                                placeholder="Pincode*"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Save address as</p>
                            <div className="flex gap-3">
                                {['Home', 'Work', 'Other'].map((type) => (
                                    <label key={type} className="flex-1 cursor-pointer group">
                                        <input type="radio" name="type" value={type} defaultChecked={type === 'Home'} className="hidden peer" />
                                        <div className="w-full p-3 rounded-xl border border-white/5 bg-white/5 text-center transition-all peer-checked:bg-brand-primary/10 peer-checked:border-brand-primary peer-checked:text-brand-primary group-hover:bg-white/10">
                                            {type === 'Home' && <Home size={18} className="mx-auto mb-1" />}
                                            {type === 'Work' && <Briefcase size={18} className="mx-auto mb-1" />}
                                            {type === 'Other' && <MapPin size={18} className="mx-auto mb-1" />}
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{type}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-gray-950 py-4 rounded-2xl font-black text-sm uppercase tracking-tighter shadow-[0_4px_20px_rgba(0,242,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Save & Proceed
                    </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
