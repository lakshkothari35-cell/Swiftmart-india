import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Calendar, Lock, User } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CardFormProps {
  onValidationChange: (isValid: boolean) => void;
}

export const CardForm = ({ onValidationChange }: CardFormProps) => {
  const [cardNumber, setCardNumber] = useState(() => localStorage.getItem('saved_card_number') || '');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState(() => localStorage.getItem('saved_card_name') || '');

  useEffect(() => {
    validate(cardNumber, expiry, cvv, name);
  }, []);

  const validate = (card: string, exp: string, cv: string, nm: string) => {
    const isCardValid = card.replace(/\s+/g, '').length >= 15;
    const isExpiryValid = /^\d{2}\/\d{2}$/.test(exp);
    const isCvvValid = cv.length >= 3;
    const isNameValid = nm.length >= 3;
    onValidationChange(isCardValid && isExpiryValid && isCvvValid && isNameValid);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
      localStorage.setItem('saved_card_number', formatted);
      validate(formatted, expiry, cvv, name);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    if (value.length <= 5) {
      setExpiry(value);
      validate(cardNumber, value, cvv, name);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 3) {
      setCvv(value);
      validate(cardNumber, expiry, value, name);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setName(value);
    localStorage.setItem('saved_card_name', value);
    validate(cardNumber, expiry, cvv, value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 pt-4 overflow-hidden"
    >
      <div className="space-y-3">
        {/* Card Number */}
        <div className="relative group">
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={16} />
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Expiry */}
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={16} />
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-mono"
            />
          </div>

          {/* CVV */}
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={16} />
            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={handleCvvChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-mono"
            />
          </div>
        </div>

        {/* Name on Card */}
        <div className="relative group">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={16} />
          <input
            type="text"
            placeholder="Name on Card"
            value={name}
            onChange={handleNameChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-bold uppercase tracking-wider"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 px-1">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End-to-End Encrypted Payment</span>
      </div>
    </motion.div>
  );
};
