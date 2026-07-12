import React, { createContext, useState, useCallback } from 'react';
import type { User, UserRole } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  role: null,
  login: async () => false,
  logout: () => {},
});

// Mock credentials map
const mockCredentials: Record<string, { password: string; user: User }> = {
  'admin@transitops.com': {
    password: 'admin123',
    user: { id: 'u1', name: 'Alex Johnson', email: 'admin@transitops.com', role: 'Admin' },
  },
  'fleet@transitops.com': {
    password: 'fleet123',
    user: { id: 'u2', name: 'Sarah Williams', email: 'fleet@transitops.com', role: 'Fleet Manager' },
  },
  'driver@transitops.com': {
    password: 'driver123',
    user: { id: 'u3', name: 'Mike Davis', email: 'driver@transitops.com', role: 'Driver' },
  },
  'safety@transitops.com': {
    password: 'safety123',
    user: { id: 'u4', name: 'Emma Clark', email: 'safety@transitops.com', role: 'Safety Officer' },
  },
  'finance@transitops.com': {
    password: 'finance123',
    user: { id: 'u5', name: 'Robert Lee', email: 'finance@transitops.com', role: 'Financial Analyst' },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('transitops_auth') === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('transitops_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [role, setRole] = useState<UserRole | null>(() => {
    const stored = localStorage.getItem('transitops_role');
    return stored ? (stored as UserRole) : null;
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate async
    await new Promise((res) => setTimeout(res, 500));
    const entry = mockCredentials[email];
    if (entry && entry.password === password) {
      setIsAuthenticated(true);
      setUser(entry.user);
      setRole(entry.user.role);
      localStorage.setItem('transitops_auth', 'true');
      localStorage.setItem('transitops_user', JSON.stringify(entry.user));
      localStorage.setItem('transitops_role', entry.user.role);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem('transitops_auth');
    localStorage.removeItem('transitops_user');
    localStorage.removeItem('transitops_role');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
