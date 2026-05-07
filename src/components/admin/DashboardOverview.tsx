import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, DollarSign, Clock, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const data = [
  { name: '08:00', orders: 120, revenue: 124000 },
  { name: '10:00', orders: 210, revenue: 242000 },
  { name: '12:00', orders: 450, revenue: 490000 },
  { name: '14:00', orders: 380, revenue: 376000 },
  { name: '16:00', orders: 520, revenue: 510400 },
  { name: '18:00', orders: 610, revenue: 612200 },
  { name: '20:00', orders: 440, revenue: 428800 },
];

const categoryData = [
  { name: 'Grocery', value: 850 },
  { name: 'Dairy', value: 650 },
  { name: 'Snacks', value: 450 },
  { name: 'Fruits & Veggies', value: 720 },
  { name: 'Beverages', value: 380 },
  { name: 'Personal Care', value: 290 },
];

export function DashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Executive <span className="text-brand-primary">Overview</span></h2>
          <p className="text-slate-400">Real-time telemetry from SwiftMart urban nodes.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">Export Report</button>
          <button className="px-4 py-2 bg-brand-primary text-gray-950 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:scale-105 transition-all">Live View</button>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Daily Revenue" 
          value="₹3,54,230.00" 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign}
          color="rgba(0, 242, 255, 0.1)"
          accent="#00f2ff"
        />
        <MetricCard 
          title="Active Orders" 
          value="1,284" 
          change="+18.2%" 
          trend="up" 
          icon={Zap}
          color="rgba(112, 0, 255, 0.1)"
          accent="#7000ff"
        />
        <MetricCard 
          title="Avg. Delivery" 
          value="12.4m" 
          change="-2.1m" 
          trend="up" 
          icon={Clock}
          color="rgba(255, 0, 200, 0.1)"
          accent="#ff00c8"
        />
        <MetricCard 
          title="New Customers" 
          value="452" 
          change="+5.4%" 
          trend="up" 
          icon={Users}
          color="rgba(0, 255, 150, 0.1)"
          accent="#00ff96"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800/50 overflow-hidden backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-xl">Omnichannel Revenue Flow</CardTitle>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Intraday metrics (all regions)</p>
            </div>
            <TrendingUp size={20} className="text-brand-primary" />
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#00f2ff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#00f2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="bg-slate-900/50 border-slate-800/50 overflow-hidden backdrop-blur-xl">
          <CardHeader className="pb-8">
            <CardTitle className="text-xl">Volume by Category</CardTitle>
            <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Regional demand distribution</p>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                />
                <Bar dataKey="value" fill="#7000ff" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Mini-Table */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Critical Operations Stream</CardTitle>
            <button className="text-brand-primary text-xs font-bold hover:underline">View All Notifications</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: '1', event: 'Stock Out Alert', detail: 'Aashirvaad Atta at ST-Surat Node', status: 'critical', time: '2m ago' },
              { id: '2', event: 'Delayed Order', detail: 'ORD-7729 (Adajan Region)', status: 'warning', time: '12m ago' },
              { id: '3', event: 'Partner Onboarded', detail: 'SwiftRider-RAJ (New Unit)', status: 'info', time: '1h ago' },
              { id: '4', event: 'Heavy Demand Spike', detail: 'Dairy sector exceeding capacity', status: 'warning', time: '3h ago' },
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl border border-slate-800/50">
                <div className="flex items-center gap-4">
                   <div className={`w-2 h-2 rounded-full ${
                     item.status === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 
                     item.status === 'warning' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]' :
                     'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                   }`} />
                   <div>
                    <p className="font-bold text-sm">{item.event}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                   </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 capitalize">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, change, trend, icon: Icon, color, accent }: any) {
  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl hover:border-slate-700 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300" style={{ backgroundColor: color }}>
            <Icon size={20} style={{ color: accent }} />
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {trend === 'up' ? <ArrowUpRight size={10} className="text-green-400" /> : <ArrowDownRight size={10} className="text-red-400" />}
            {change}
          </div>
        </div>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{title}</p>
        <h3 className="text-2xl font-black">{value}</h3>
      </CardContent>
    </Card>
  );
}
