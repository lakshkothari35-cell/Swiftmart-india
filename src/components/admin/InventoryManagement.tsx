import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '@/src/constants/data';
import { useProduct } from '@/src/context/ProductContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { products, addProduct, deleteProduct } = useProduct();
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Grocery',
    price: 0,
    mrp: 0,
    image: '',
    description: '',
    unit: '1 kg',
    color: '#00f2ff'
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `SKU-${product.id}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct as any);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      category: 'Grocery',
      price: 0,
      mrp: 0,
      image: '',
      description: '',
      unit: '1 kg',
      color: '#00f2ff'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Active <span className="text-brand-primary">Inventory</span></h2>
          <p className="text-slate-400">Control product availability, pricing, and urban warehouse stock.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-brand-primary text-gray-950 px-6 py-2.5 rounded-xl font-bold shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:scale-105 transition-all"
        >
          <Plus size={20} />
          Add Neural Package
        </button>
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black uppercase italic text-white flex items-center gap-3">
                    <Plus className="text-brand-primary" /> Add New <span className="text-brand-primary">SKU</span>
                  </h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Product Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Aashirvaad Atta"
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-all"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                      <select 
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-all appearance-none"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Base Price (₹)</label>
                      <input 
                        type="number" 
                        required
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-all"
                        value={newProduct.price || ''}
                        onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">MRP (₹)</label>
                      <input 
                        type="number" 
                        required
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-all"
                        value={newProduct.mrp || ''}
                        onChange={(e) => setNewProduct({...newProduct, mrp: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                          type="url" 
                          required
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary transition-all"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Unit (e.g. 1 kg)</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-all"
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Brand Color</label>
                      <input 
                        type="color" 
                        className="w-full h-11 bg-slate-950/50 border border-white/10 rounded-xl px-2 text-sm focus:outline-none focus:border-brand-primary transition-all cursor-pointer"
                        value={newProduct.color}
                        onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Description</label>
                      <textarea 
                        rows={3}
                        required
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-brand-primary transition-all resize-none"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setIsAddModalOpen(false)}
                      className="flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 text-slate-400 hover:bg-white/5 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-brand-primary text-gray-950 shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Commission Package
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total SKUs</p>
            <h3 className="text-2xl font-black">{products.length.toLocaleString()}</h3>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Low Stock Alerts</p>
            <h3 className="text-2xl font-black text-brand-accent">24</h3>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">In-Transit Stock</p>
            <h3 className="text-2xl font-black text-brand-primary">850 Units</h3>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-xl">
        <CardHeader className="border-b border-slate-800/50 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Filter by SKU, Category, or Name..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2 border border-slate-800 rounded-xl text-sm hover:bg-slate-900 transition-colors">
                <Filter size={16} /> Filters
              </button>
              <button className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2 border border-slate-800 rounded-xl text-sm hover:bg-slate-900 transition-colors">
                CSV Export
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-900/50">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="w-[80px] font-bold text-slate-400 px-6">Image</TableHead>
                <TableHead className="font-bold text-slate-400">Product Node</TableHead>
                <TableHead className="font-bold text-slate-400">Category</TableHead>
                <TableHead className="font-bold text-slate-400 text-right">Base Price</TableHead>
                <TableHead className="font-bold text-slate-400 text-center">Unit Stock</TableHead>
                <TableHead className="font-bold text-slate-400 text-center">Status</TableHead>
                <TableHead className="font-bold text-slate-400 text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-slate-800/50 hover:bg-white/5 transition-colors group">
                  <TableCell className="px-6">
                    <div 
                      className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5 overflow-hidden"
                      style={{ backgroundColor: `${product.color}22` }}
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold text-sm tracking-tight">{product.name}</p>
                      <p className="text-[10px] uppercase text-slate-500 font-mono">SKU-{product.id.padStart(4, '0')}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-900/50 border-slate-800 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold">₹{product.price}</TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-bold">142</span>
                    <span className="text-[10px] text-slate-500 block">Across 12 Hubs</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Switch defaultChecked className="data-[state=checked]:bg-brand-primary" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 hover:bg-slate-800 rounded-lg transition-colors outline-none">
                        <MoreVertical size={16} className="text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
                        <DropdownMenuItem className="gap-2 focus:bg-brand-primary/10 focus:text-brand-primary">
                          <Edit size={14} /> Edit Unit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteProduct(product.id)}
                          className="gap-2 focus:bg-red-500/10 focus:text-red-500 text-red-500"
                        >
                          <Trash2 size={14} /> Delete SKU
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                    No products found matching "{searchQuery}"
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
