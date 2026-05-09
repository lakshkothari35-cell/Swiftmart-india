import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Github, Chrome, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const { isLoginModalOpen, closeLoginModal, login, socialLogin } = useAuth();
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
      <DialogContent className="sm:max-w-md bg-slate-950 border-slate-900 text-white p-0 overflow-hidden text-left">
        <div className="relative p-8">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl" />

          <DialogHeader className="mb-8 relative items-start text-left">
            <DialogTitle className="text-3xl font-black tracking-tight text-white mb-2">
              {mode === 'login' ? t('auth.loginTitle') : t('auth.signupTitle')}
            </DialogTitle>
            <p className="text-slate-500 text-sm">
              {mode === 'login' 
                ? t('auth.loginSub') 
                : t('auth.signupSub')}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={18} />
                    <input
                      type="text"
                      placeholder={t('auth.fullName')}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all focus:bg-white/10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Email or ID"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all focus:bg-white/10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={18} />
              <input
                type="password"
                placeholder={t('auth.password')}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-all focus:bg-white/10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary py-4 rounded-xl font-black text-gray-950 flex items-center justify-center gap-3 hover:translate-y-[-2px] active:translate-y-[1px] transition-all shadow-[0_4px_20px_rgba(0,242,255,0.2)] mt-6"
            >
              {mode === 'login' ? t('auth.signIn') : t('auth.createAccount')}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-950 px-4 text-slate-500">{t('auth.orContinue')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            <button 
              onClick={() => socialLogin('google')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold"
            >
              <Chrome size={18} /> Google
            </button>
            <button 
              onClick={() => socialLogin('github')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold"
            >
              <Github size={18} /> GitHub
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-slate-500 relative">
            {mode === 'login' ? (
              <>
                {t('auth.noAccount')}{' '}
                <button 
                  onClick={() => setMode('signup')}
                  className="text-brand-primary font-bold hover:underline"
                >
                  {t('auth.joinNow')}
                </button>
              </>
            ) : (
              <>
                {t('auth.hasAccount')}{' '}
                <button 
                  onClick={() => setMode('login')}
                  className="text-brand-primary font-bold hover:underline"
                >
                  {t('auth.signIn')}
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
