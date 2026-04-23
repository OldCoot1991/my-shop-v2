"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { dictionaries, Lang, Dictionary } from "@/lib/i18n/dictionaries";
import { useRouter } from "next/navigation";

interface I18nContextType {
  lang: Lang;
  setLang: (newLang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "ru",
  setLang: () => {},
  t: (key) => key,
});

export const I18nProvider = ({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) => {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const router = useRouter();

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    // Update HTML attribute
    document.documentElement.lang = newLang;
    // Set cookie for 1 year
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    router.refresh();
  }, [router]);

  const t = useCallback(
    (key: string) => {
      const keys = key.split(".");
      let value: any = dictionaries[lang];
      for (const k of keys) {
        if (value === undefined) break;
        value = value[k];
      }
      return typeof value === "string" ? value : key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
