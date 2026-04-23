"use client";

import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" shape="pill" className="w-9 h-9" />;
  }

  const toggleLanguage = () => {
    setLang(lang === "ru" ? "en" : "ru");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      shape="pill"
      className="relative flex items-center gap-2 px-3 h-9 overflow-hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      onClick={toggleLanguage}
      title={lang === "ru" ? "Switch to English" : "Переключить на русский"}
    >
      <div className="flex items-center gap-1.5 z-10">
        <Languages className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        <span className="text-xs font-bold font-display uppercase tracking-wider text-zinc-900 dark:text-white">
          {lang}
        </span>
      </div>

      <motion.div
        className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-700/50"
        initial={false}
        animate={{
          x: lang === "ru" ? "-100%" : "0%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </Button>
  );
}
