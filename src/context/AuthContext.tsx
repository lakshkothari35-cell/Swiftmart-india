import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (credentials: any) => void;
  socialLogin: (provider: 'google' | 'github') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (credentials: any) => {
    // Mock login logic
    setUser({ name: 'Swift User', email: credentials.email || 'user@example.com' });
    setIsLoginModalOpen(false);
  };

  const socialLogin = (provider: 'google' | 'github') => {
    // Mock social login logic
    const names = { google: 'Google User', github: 'GitHub User' };
    setUser({ 
      name: names[provider], 
      email: `${provider}@example.com`,
      provider: provider 
    });
    setIsLoginModalOpen(false);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoginModalOpen, 
      openLoginModal, 
      closeLoginModal, 
      login, 
      socialLogin,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
