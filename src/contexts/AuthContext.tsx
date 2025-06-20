import { User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login:  (email: string, password: string, role?: string) => Promise<void>;
  register:(email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]     = useState<User | null>(null);
  const [loading, setLoad]  = useState(true);

  // keep session in sync on refresh / tab change
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoad(false);
    });
    // initial fetch (in case onAuthStateChange fires before mount)
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoad(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string, _role?: string) => {
    setLoad(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // Fetch the latest user data (with metadata)
    const session = data.session;
    if (session && session.user) {
      // Optionally, you can refresh the user object from Supabase
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (!userError && userData.user) {
        setUser(userData.user);
      } else {
        setUser(session.user);
      }
    }
    setLoad(false);
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: string
  ) => {
    setLoad(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });
    if (error) throw error;
    setLoad(false);
  };

  const logout = async () => {
    setLoad(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoad(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};