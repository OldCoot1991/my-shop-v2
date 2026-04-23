"use client";

import { ShoppingBag, Search, Menu, User, Cpu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-context";
import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/components/i18n-provider";
import { LanguageToggle } from "@/components/language-toggle";

export function Navbar() {
  const { user } = useAuth();
  const { t } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchValue("");
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-colors">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              {t("navbar.brand")}
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {t("navbar.boards")}
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {t("navbar.controllers")}
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {t("navbar.displays")}
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {t("navbar.cases")}
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {t("navbar.kits")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <LanguageToggle />
          {/* Animated Search Bar */}
          <div className="relative flex items-center">
            <div
              className={`flex items-center overflow-hidden rounded-full border transition-all duration-300 ease-in-out ${
                searchOpen
                  ? "w-52 sm:w-64 border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 shadow-sm"
                  : "w-9 border-transparent bg-transparent"
              }`}
            >
              {/* Magnifying glass button */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className={`flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full transition-colors duration-200 ${
                  searchOpen
                    ? "text-zinc-500 dark:text-zinc-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
                aria-label={t("navbar.search")}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t("navbar.search")}
                className={`flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none pr-2 transition-opacity duration-200 ${
                  searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />

              {/* Clear / close button */}
              {searchOpen && (
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchValue("");
                  }}
                  className="flex-shrink-0 flex items-center justify-center h-9 w-9 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors duration-200"
                  aria-label={t("navbar.closeSearch")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* User button */}
          <Link
            href={user ? "/profile" : "/login"}
            className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            title={user ? `${t("navbar.profile")}: ${user.name}` : t("navbar.login")}
          >
            {initials ? (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold">
                {initials}
              </span>
            ) : (
              <User className="h-5 w-5" />
            )}
          </Link>

          <button className="relative text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-[10px] font-bold text-white dark:text-zinc-900">
              2
            </span>
            <span className="sr-only">{t("navbar.cart")}</span>
          </button>
          <button className="md:hidden text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("navbar.menu")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
