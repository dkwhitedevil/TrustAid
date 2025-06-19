import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'beneficiary' | 'ngo' | 'donor';
  walletAddress?: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('trustaid-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    // Simulate API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role: role as any,
      verified: true,
      walletAddress: role === 'donor' ? '0x' + Math.random().toString(16).substr(2, 40) : undefined
    };
    
    setUser(mockUser);
    localStorage.setItem('trustaid-user', JSON.stringify(mockUser));
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    // Simulate API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: role as any,
      verified: false,
      walletAddress: role === 'donor' ? '0x' + Math.random().toString(16).substr(2, 40) : undefined
    };
    
    setUser(mockUser);
    localStorage.setItem('trustaid-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trustaid-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};