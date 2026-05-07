import { useState } from 'react';
import { COUPONS } from '../../constants/coupons';
import { Tag, Plus, Search, MoreVertical, Trash2, Edit, Calendar, Info, BarChart3, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const CouponManagement = () => {
  const [coupons, setCoupons] = useState(COUPONS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Campaign Manager</h2>
          <p className="text-slate-500 text-sm">Create, manage and track promotional performance.</p>
        </div>
        <button className="bg-brand-primary text-gray-950 px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,242,255,0.2)]">
          <Plus size={20} />
          NEW CAMPAIGN
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Tag size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Coupons</p>
              <h3 className="text-2xl font-black text-white">{coupons.length}</h3>
            </div>
          </div>
          <div className="text-[10px] text-brand-primary font-bold">2 expiring in 48 hours</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Redemptions</p>
              <h3 className="text-2xl font-black text-white">15,442</h3>
            </div>
          </div>
          <div className="text-[10px] text-brand-secondary font-bold">+12% from last month</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue Impact</p>
              <h3 className="text-2xl font-black text-white">₹2.4L</h3>
            </div>
          </div>
          <div className="text-[10px] text-orange-400 font-bold">ROI: 4.8x</div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-bold"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Coupon Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Rules</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Redemptions</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Expiry</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex flex-col items-center justify-center uppercase">
                        <span className="text-[10px] font-black text-slate-500">Code</span>
                        <span className="text-xs font-black text-brand-primary">{coupon.code}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{coupon.title}</h4>
                        <p className="text-xs text-slate-500 max-w-xs truncate">{coupon.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-white/5 border border-white/10 text-slate-400">
                      {coupon.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-white flex items-center gap-1.5">
                        <Info size={10} className="text-brand-secondary" />
                        Min Order: ₹{coupon.minOrderValue}
                      </div>
                      {coupon.maxDiscount && (
                        <div className="text-[10px] font-bold text-slate-500">
                          Max Cap: ₹{coupon.maxDiscount}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-mono font-bold text-slate-400">
                    {coupon.usageCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar size={14} />
                      {new Date(coupon.expiryDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
