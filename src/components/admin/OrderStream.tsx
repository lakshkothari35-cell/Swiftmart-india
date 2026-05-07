import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Box, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';

const mockOrders = [
  { id: '#SW-10292', customer: 'Rajesh Kumar', items: 12, price: 1425.50, status: 'Out for Delivery', time: '8m ago', type: 'Priority' },
  { id: '#SW-10291', customer: 'Amit Shah', items: 4, price: 220.10, status: 'Packed', time: '14m ago', type: 'Standard' },
  { id: '#SW-10290', customer: 'Priya Joshi', items: 7, price: 560.00, status: 'Processing', time: '22m ago', type: 'Priority' },
  { id: '#SW-10289', customer: 'Deepak Verma', items: 21, price: 3105.45, status: 'Delivered', time: '1h ago', type: 'Standard' },
  { id: '#SW-10288', customer: 'Sonal Patel', items: 2, price: 129.99, status: 'Cancelled', time: '2h ago', type: 'Priority' },
  { id: '#SW-10287', customer: 'Karan Mehra', items: 9, price: 890.20, status: 'Delivered', time: '3h ago', type: 'Standard' },
];

export function OrderStream() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = mockOrders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Active <span className="text-brand-secondary">Order Stream</span></h2>
          <p className="text-slate-400">Continuous telemetry of hyper-local transactions.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex -space-x-3 overflow-hidden">
            {[1,2,3,4].map(i => (
              <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-950 bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                 {i === 4 ? '+12' : 'D'}
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
             <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Online Partners</span>
             <span className="text-sm font-black text-green-500">242 Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatusFilterCard label="Pending" count={42} active icon={Clock} color="text-yellow-500" />
        <StatusFilterCard label="Processing" count={12} icon={Box} color="text-blue-500" />
        <StatusFilterCard label="In Transit" count={85} icon={Navigation} color="text-brand-primary" />
        <StatusFilterCard label="Completed" count={1420} icon={CheckCircle2} color="text-green-500" />
      </div>

      <Card className="bg-slate-950/50 border-slate-800 backdrop-blur-xl">
        <div className="p-6 border-b border-slate-800/50 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="flex gap-2 p-1 bg-slate-900 rounded-xl">
              <button className="px-4 py-1.5 text-xs font-bold bg-slate-800 rounded-lg shadow-sm border border-white/5">Show All</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-300">Errors Only</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-300">Bulk Actions</button>
           </div>
           
           <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Find specific order ID..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-brand-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
        </div>
        <CardContent className="p-0">
           <Table>
            <TableHeader className="bg-slate-900/50">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="font-bold text-slate-400 px-6">Order Hash</TableHead>
                <TableHead className="font-bold text-slate-400">Customer</TableHead>
                <TableHead className="font-bold text-slate-400 text-center">Payload</TableHead>
                <TableHead className="font-bold text-slate-400 text-right">Value</TableHead>
                <TableHead className="font-bold text-slate-400 text-center">Protocol</TableHead>
                <TableHead className="font-bold text-slate-400 text-center">Status</TableHead>
                <TableHead className="font-bold text-slate-400 text-right pr-6">ETA Leak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-slate-800/50 hover:bg-white/5 transition-colors">
                  <TableCell className="px-6 font-mono font-bold text-brand-primary">{order.id}</TableCell>
                  <TableCell>
                    <div className="font-bold text-sm tracking-tight">{order.customer}</div>
                  </TableCell>
                  <TableCell className="text-center font-mono text-xs">{order.items} items</TableCell>
                  <TableCell className="text-right font-bold text-sm">₹{order.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                     <Badge variant="outline" className={order.type === 'Priority' ? 'border-brand-primary text-brand-primary' : 'border-slate-800 text-slate-400'}>
                        {order.type}
                     </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'Out for Delivery' ? 'text-brand-primary' : 
                      order.status === 'Delivered' ? 'text-green-500' :
                      order.status === 'Cancelled' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-6 text-[10px] font-mono text-slate-500">{order.time}</TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                    No orders found matching "{searchQuery}"
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

function StatusFilterCard({ label, count, active = false, icon: Icon, color }: any) {
  return (
    <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${
      active 
        ? 'bg-slate-900 border-brand-primary/30 shadow-[0_0_15px_rgba(0,242,255,0.1)]' 
        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
    }`}>
      <div className="flex items-center justify-between mb-2">
         <div className={`p-2 rounded-lg bg-slate-900 ${color}`}>
            <Icon size={16} />
         </div>
         <span className="text-xl font-black">{count}</span>
      </div>
      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{label}</p>
    </div>
  );
}
