// src/app/providers/AuthProvider.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// 🔹 Add userRole to the type
type AuthContextType = {
  isAuthenticated: boolean;
  userRole: 'admin' | 'vendor' | 'delivery' | null; // 👈 add this
  login: (email: string, password: string, role: 'admin' | 'vendor' | 'delivery') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 👇 This is the key: export the hook!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'vendor' | 'delivery' | null>(null); // 👈 add state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole') as 'admin' | 'vendor' | 'delivery' | null;
    
    setIsAuthenticated(!!token);
    setUserRole(role);
    setIsLoading(false);
  }, []);

  // 🔹 Update login to accept role
  const login = async (
    email: string, 
    password: string, 
    role: 'admin' | 'vendor' | 'delivery'  // 👈 add role param
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // 🔐 Simulate login
      if (email && password) {
        localStorage.setItem('authToken', 'fake-jwt');
        localStorage.setItem('userRole', role); // 👈 save role
        setIsAuthenticated(true);
        setUserRole(role); // 👈 update state
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        userRole,    // 👈 expose it
        login, 
        logout, 
        isLoading, 
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};