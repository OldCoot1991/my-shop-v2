"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "retroboard_users";
const SESSION_KEY = "retroboard_session";

function getStoredUsers(): Record<string, { name: string; password: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function setStoredUsers(
  users: Record<string, { name: string; password: string }>,
) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const users = getStoredUsers();
    const stored = users[email.toLowerCase()];
    if (!stored) throw new Error("Пользователь с таким email не найден");
    if (stored.password !== password) throw new Error("Неверный пароль");
    const u: User = { name: stored.name, email: email.toLowerCase() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const users = getStoredUsers();
    if (users[email.toLowerCase()])
      throw new Error("Пользователь с таким email уже существует");
    users[email.toLowerCase()] = { name, password };
    setStoredUsers(users);
    const u: User = { name, email: email.toLowerCase() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
