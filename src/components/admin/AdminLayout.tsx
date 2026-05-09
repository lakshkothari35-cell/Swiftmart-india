import { ReactNode } from 'react';
import { LayoutDashboard, ShoppingBag, Package, Truck, Users, Settings, LogOut, Bell, Search, Tag } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/src/context/AuthContext';
import { useCart } from '@/src/context/CartContext';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
  { icon: Package, label: 'Inventory', path: '/admin/inventory' },
  { icon: Tag, label: 'Promotions', path: '/admin/promotions' },
  { icon: Truck, label: 'Delivery', path: '/admin/delivery' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const { unseenOrdersCount, resetUnseenOrders } = useCart();
  const location = useLocation();

  // Reset notifications if we are on the orders page
  useEffect(() => {
    if (location.pathname === '/admin/orders' && unseenOrdersCount > 0) {
      resetUnseenOrders();
    }
  }, [location.pathname, unseenOrdersCount, resetUnseenOrders]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-950 text-slate-50 w-full">
        {/* Futuristic Sidebar */}
        <Sidebar className="border-r border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
          <SidebarHeader className="p-6">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)]">
                <span className="font-black text-gray-950">S</span>
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold tracking-tighter">SWIFT<span className="text-brand-primary">HUB</span></h1>
                <p className="text-[10px] text-brand-primary uppercase tracking-[0.2em] font-bold">Admin Engine</p>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent className="px-4">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <NavLink to={item.path} end>
                    {({ isActive }: { isActive: boolean }) => (
                      <SidebarMenuButton 
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                          isActive 
                            ? "bg-brand-primary/10 text-brand-primary shadow-[inset_0_0_10px_rgba(0,242,255,0.1)] border border-brand-primary/20" 
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <item.icon size={20} className={isActive ? "text-brand-primary" : ""} />
                        <span className="font-medium">{item.label}</span>
                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(0,242,255,0.8)]" />}
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4 mt-auto">
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-brand-primary/20">
                <AvatarFallback className="bg-brand-primary text-gray-950 font-black">
                  {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-bold truncate">{user?.name || 'Admin User'}</p>
                <p className="text-[10px] text-slate-500 truncate italic">Super Admin</p>
              </div>
              <button 
                onClick={logout}
                className="text-slate-500 hover:text-brand-accent transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col overflow-x-hidden">
          {/* Header */}
          <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="relative group max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search orders, products, or units..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary/5 border border-brand-primary/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">System Live</span>
              </div>
              
              <button 
                onClick={resetUnseenOrders}
                className="relative text-slate-400 hover:text-white transition-colors"
              >
                <Bell size={20} />
                {unseenOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full text-[10px] font-bold flex items-center justify-center text-white ring-2 ring-slate-950 animate-bounce">
                    {unseenOrdersCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          <main className="p-8 flex-grow overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
