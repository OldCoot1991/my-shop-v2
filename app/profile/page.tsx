"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  User,
  Mail,
  ShoppingBag,
  ChevronRight,
  Cpu,
} from "lucide-react";
import * as motion from "motion/react-client";
import { useAuth } from "@/components/auth-context";
import { Navbar } from "@/components/navbar";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <svg
          className="animate-spin h-6 w-6 text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-8 pb-16 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Profile header */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 p-8 mb-4">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xl font-bold flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {user.name}
                  </h1>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Личный аккаунт
                  </p>
                </div>
              </div>
            </div>

            {/* Info cards */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 mb-4 overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <User className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">
                    Имя
                  </p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {user.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <Mail className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">
                    Email
                  </p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 mb-4 overflow-hidden">
              <Link
                href="/"
                className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <Cpu className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <span className="flex-1 font-medium text-zinc-900 dark:text-zinc-100">
                  Каталог товаров
                </span>
                <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/"
                className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <ShoppingBag className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <span className="flex-1 font-medium text-zinc-900 dark:text-zinc-100">
                  Мои заказы
                </span>
                <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/40">
                <LogOut className="h-4 w-4 text-red-500 dark:text-red-400" />
              </div>
              <span className="flex-1 text-left font-medium text-red-600 dark:text-red-400">
                Выйти из аккаунта
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
