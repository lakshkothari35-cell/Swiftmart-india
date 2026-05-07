import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useDragControls } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { IndianRupee, Filter, X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onFilterChange: (min: number, max: number) => void;
  maxLimit?: number;
}

export const PriceFilter = ({ minPrice, maxPrice, onFilterChange, maxLimit = 1000 }: PriceFilterProps) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const sliderWidth = 224; // Width of the slider track in px
  
  const presets = [
    { label: 'Under ₹100', min: 0, max: 100 },
    { label: '₹100 – ₹300', min: 100, max: 300 },
    { label: '₹300 – ₹700', min: 300, max: 700 },
    { label: 'Above ₹700', min: 700, max: maxLimit },
  ];

  const handleReset = () => {
    onFilterChange(0, maxLimit);
  };

  const isActive = minPrice > 0 || maxPrice < maxLimit;

  // Simple slider logic for PriceFilter
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const val = parseInt(e.target.value);
    if (type === 'min') {
      onFilterChange(Math.min(val, maxPrice - 1), maxPrice);
    } else {
      onFilterChange(minPrice, Math.max(val, minPrice + 1));
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border border-white/10",
          isActive 
            ? "bg-brand-primary/20 text-brand-primary border-brand-primary/50 shadow-[0_0_15px_rgba(0,242,255,0.1)]" 
            : "glass hover:bg-white/10 text-white"
        )}
      >
        <Filter size={16} />
        {isActive ? `₹${minPrice} — ₹${maxPrice}` : t('shop.priceFilter')}
        <ChevronDown size={14} className={cn("transition-transform duration-300", isExpanded && "rotate-180")} />
      </button>

      {isExpanded && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsExpanded(false)} 
          />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed md:absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 bottom-6 md:bottom-auto md:top-full md:mt-2 w-[calc(100vw-2rem)] md:w-72 glass border-white/10 rounded-2xl md:rounded-2xl p-6 z-50 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-brand-primary" />
                {t('shop.priceFilter')}
              </h4>
              <button 
                onClick={handleReset}
                className="text-[10px] font-bold text-brand-primary hover:underline uppercase tracking-wider"
              >
                Reset
              </button>
            </div>

            {/* Slider UI */}
            <div className="relative h-10 flex items-center mb-6">
              <div className="absolute w-full h-1 bg-white/10 rounded-full" />
              <div 
                className="absolute h-1 bg-brand-primary rounded-full transition-all"
                style={{ 
                  left: `${(minPrice / maxLimit) * 100}%`,
                  right: `${100 - (maxPrice / maxLimit) * 100}%`
                }}
              />
              <input
                type="range"
                min="0"
                max={maxLimit}
                value={minPrice}
                onChange={(e) => handleSliderChange(e, 'min')}
                className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-primary [&::-webkit-slider-thumb]:shadow-lg pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
              />
              <input
                type="range"
                min="0"
                max={maxLimit}
                value={maxPrice}
                onChange={(e) => handleSliderChange(e, 'max')}
                className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-primary [&::-webkit-slider-thumb]:shadow-lg pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
              />
            </div>

            <div className="flex justify-between items-center mb-6 px-1">
              <div className="text-lg font-black text-white">₹{minPrice}</div>
              <div className="text-gray-500 font-bold">—</div>
              <div className="text-lg font-black text-white">₹{maxPrice}</div>
            </div>

            {/* Presets */}
            <div className="space-y-1.5 mb-6">
              {presets.map((preset) => {
                const isSelected = minPrice === preset.min && maxPrice === preset.max;
                return (
                  <button
                    key={preset.label}
                    onClick={() => {
                      onFilterChange(preset.min, preset.max);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all",
                      isSelected 
                        ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary" 
                        : "bg-white/5 border-white/5 hover:border-white/20 text-slate-400 hover:text-white"
                    )}
                  >
                    <span className="text-xs font-bold">{preset.label}</span>
                    {isSelected && <Check size={14} />}
                  </button>
                );
              })}
            </div>

            {/* Done Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full py-3 bg-brand-primary text-gray-950 text-xs font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-brand-primary/20"
            >
              SAVE CHANGES
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};

