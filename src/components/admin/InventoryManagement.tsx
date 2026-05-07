import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { PRODUCTS } from '@/src/constants/data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `SKU-${product.id}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Active <span className="text-brand-primary">Inventory</span></h2>
          <p className="text-slate-400">Control product availability, pricing, and urban warehouse stock.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-primary text-gray-950 px-6 py-2.5 rounded-xl font-bold shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:scale-105 transition-all">
          <Plus size={20} />
          Add Neural Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total SKUs</p>
            <h3 className="text-2xl font-black">4,284</h3>
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
                      <p className="text-[10px] uppercase text-slate-500 font-mono">SKU-{product.id}1092</p>
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
                        <DropdownMenuItem className="gap-2 focus:bg-red-500/10 focus:text-red-500 text-red-500">
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
