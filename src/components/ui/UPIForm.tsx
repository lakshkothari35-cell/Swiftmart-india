import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Smartphone, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface UPIFormProps {
  onValidationChange: (isValid: boolean) => void;
}

export const UPIForm = ({ onValidationChange }: UPIFormProps) => {
  const [upiId, setUpiId] = useState(() => localStorage.getItem('saved_upi_id') || '');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (upiId) {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      const valid = upiRegex.test(upiId);
      setIsValid(valid);
      onValidationChange(valid);
    }
  }, []);

  const handleUpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setUpiId(val);
    localStorage.setItem('saved_upi_id', val);
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    const valid = upiRegex.test(val);
    setIsValid(valid);
    onValidationChange(valid);
  };

  const handleHandleSelect = (handle: string) => {
    const prefix = upiId.split('@')[0];
    const newVal = prefix ? prefix + handle : handle;
    setUpiId(newVal);
    localStorage.setItem('saved_upi_id', newVal);
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    const valid = upiRegex.test(newVal);
    setIsValid(valid);
    onValidationChange(valid);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 pt-4 overflow-hidden"
    >
      <div className="space-y-3">
        <div className="relative group">
          <Smartphone className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
            isValid ? "text-green-500" : "text-slate-500 group-focus-within:text-brand-primary"
          )} size={16} />
          <input
            type="text"
            placeholder="Enter UPI ID (e.g. mobile@okaxis)"
            value={upiId}
            onChange={handleUpiChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
          />
          {isValid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CheckCircle2 size={16} className="text-green-500" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {['@okaxis', '@okicici', '@paytm', '@ybl'].map((handle) => (
            <button
              key={handle}
              onClick={() => handleHandleSelect(handle)}
              className="text-[10px] font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:border-white/20 transition-all text-slate-400 hover:text-white"
            >
              {handle}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 px-1">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verify and Pay Instantly</span>
      </div>
    </motion.div>
  );
};
