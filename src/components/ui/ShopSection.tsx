import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../../constants/data';
import { ShoppingCart, Plus, Minus, Info, Zap, Search, SlidersHorizontal } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { PriceFilter } from './PriceFilter';

export const ShopSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const { language, t } = useLanguage();
  const { products } = useProduct();

  const getTranslatedProduct = (product: any) => {
    if (language === 'HI') {
      return {
        ...product,
        name: product.name_hi || product.name,
        description: product.description_hi || product.description,
        unit: product.unit_hi || product.unit
      };
    }
    if (language === 'GU') {
      return {
        ...product,
        name: product.name_gu || product.name,
        description: product.description_gu || product.description,
        unit: product.unit_gu || product.unit
      };
    }
    return product;
  };

  const filteredProducts = useMemo(() => {
    return products.map(getTranslatedProduct).filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, activeCategory, priceRange, language]);

  const maxProductPrice = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  return (
    <section id="shop" className="py-24 px-6 relative z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 transition-colors duration-500">{t('shop.title')}</h2>
            <p className="text-gray-400 max-w-lg">
              {t('shop.subtitle')}
            </p>
          </div>
        </div>

        <div className="sticky top-20 z-40 mb-12 py-4 bg-background/80 backdrop-blur-md rounded-2xl transition-colors duration-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-grow">
              <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder={t('shop.search')} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all focus:bg-white/10 font-medium"
                />
              </div>
              
              <PriceFilter 
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
                maxLimit={maxProductPrice + 500}
                onFilterChange={(min, max) => setPriceRange({ min, max })}
              />
            </div>

            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-3 rounded-xl border border-white/5 flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-brand-primary" />
              {t('shop.results').replace('{count}', filteredProducts.length.toString())}
            </div>
          </div>
          
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All Products', ...CATEGORIES].map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${
                  activeCategory === category 
                    ? 'bg-brand-primary text-gray-950 border-brand-primary shadow-[0_0_20px_rgba(0,242,255,0.2)]' 
                    : 'glass border-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                 {category === 'All Products' ? t('shop.all') : t(`categories.${category}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Floating Filter Stats */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:hidden z-50 flex items-center gap-2 pointer-events-none">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-brand-primary text-gray-950 px-6 py-3 rounded-full font-black text-xs shadow-[0_10px_30px_rgba(0,242,255,0.4)] flex items-center gap-3 backdrop-blur-md pointer-events-auto"
          >
            <SlidersHorizontal size={14} />
            <span>{filteredProducts.length} PRODUCTS</span>
            <div className="w-[1px] h-3 bg-gray-950/20" />
            <button 
              onClick={() => {
                const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                searchInput?.focus();
                window.scrollTo({ top: document.getElementById('shop')?.offsetTop! - 20, behavior: 'smooth' });
              }}
              className="hover:scale-110 active:scale-95 transition-transform"
            >
              <Search size={14} />
            </button>
          </motion.div>
        </div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
              <Search size={32} className="text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
    >
      <div className="bg-gray-900 rounded-[22px] p-4 sm:p-6 h-full flex flex-col relative overflow-hidden">
        {/* Decorative background glow */}
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none transition-transform duration-700" 
          style={{ backgroundColor: product.color, transform: isHovered ? 'scale(1.5)' : 'scale(1)' }}
        />

        <div className="h-40 sm:h-64 mb-4 sm:mb-6 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110">
          <div 
            className="w-28 h-28 sm:w-44 sm:h-44 rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center border border-white/10"
            style={{ 
              backgroundColor: `${product.color}11`,
            }}
          >
            <div 
              className="absolute inset-0 opacity-20 bg-center bg-cover scale-110 blur-sm"
              style={{ backgroundImage: `url(${product.image})` }}
            />
            <img 
              src={product.image} 
              alt={product.name} 
              className="relative z-10 w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-gray-500 truncate mr-2">{t(`categories.${product.category}`)} • {product.unit}</span>
            {product.mrp > product.price && (
              <span className="bg-green-500/20 text-green-400 text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full border border-green-500/20 whitespace-nowrap">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-brand-primary transition-colors line-clamp-1">{product.name}</h3>
          <p className="text-[10px] sm:text-sm text-gray-500 mb-4 sm:mb-6 line-clamp-1 sm:line-clamp-2">{product.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-white/5 gap-2">
          <div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <div className="text-xl sm:text-2xl font-black text-white">₹{product.price}</div>
              {product.mrp > product.price && (
                <div className="text-[10px] sm:text-sm text-gray-500 line-through font-medium">₹{product.mrp}</div>
              )}
            </div>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 bg-white text-gray-950 font-bold px-3 sm:px-4 py-2 sm:py-2 rounded-xl group-hover:bg-brand-primary transition-colors active:scale-90 duration-200 text-xs sm:text-base w-full sm:w-auto"
          >
            <Plus size={16} /> <span className="sm:inline">{t('shop.addToCart')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
