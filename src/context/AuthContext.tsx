"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor" | "receptionist";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "admin@dental.com": {
    password: "admin123",
    user: { id: "1", name: "Dr. García", email: "admin@dental.com", role: "admin" },
  },
  "doctor@dental.com": {
    password: "doctor123",
    user: { id: "2", name: "Dra. López", email: "doctor@dental.com", role: "doctor" },
  },
  "recepcion@dental.com": {
    password: "recepcion123",
    user: { id: "3", name: "María Ruiz", email: "recepcion@dental.com", role: "receptionist" },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("dental_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const mock = MOCK_USERS[email];
    if (mock && mock.password === password) {
      setUser(mock.user);
      localStorage.setItem("dental_user", JSON.stringify(mock.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dental_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
