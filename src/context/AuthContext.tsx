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
  const [user, setUser] = useState<any | null>(() => {
    // Load user from localStorage immediately to avoid flash or clearing
    const savedUser = localStorage.getItem('swiftmart_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing saved user:', e);
      }
    }
    return null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Save user to localStorage when it changes
  React.useEffect(() => {
    if (user) {
      localStorage.setItem('swiftmart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('swiftmart_user');
    }
  }, [user]);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (credentials: any) => {
    // Admin check
    if (credentials.email === 'admin' && credentials.password === 'admin@123') {
      setUser({ 
        name: 'Admin User', 
        email: 'admin', 
        role: 'admin',
        isAdmin: true 
      });
      setIsLoginModalOpen(false);
      return;
    }

    // Mock login logic
    setUser({ name: credentials.name || 'Swift User', email: credentials.email || 'user@example.com', isAdmin: false });
    setIsLoginModalOpen(false);
  };

  const socialLogin = (provider: 'google' | 'github') => {
    // Mock social login logic
    const names = { google: 'Google User', github: 'GitHub User' };
    setUser({ 
      name: names[provider], 
      email: `${provider}@example.com`,
      provider: provider,
      isAdmin: false
    });
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('swiftmart_user');
    setUser(null);
  };

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
