import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const STORAGE_KEY = "i18n_language";

function LangButton() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored === "ru" ? "ru" : "en";
    return i18n?.language?.startsWith("ru") ? "ru" : "en";
  });

  // Initialize i18n with stored or detected language on mount
  useEffect(() => {
    if (i18n && !i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, []);

  // Listen to i18n language changes from other sources
  useEffect(() => {
    const handle = (lng) => {
      const newLang = lng?.startsWith("ru") ? "ru" : "en";
      setLang(newLang);
      localStorage.setItem(STORAGE_KEY, newLang);
    };
    if (i18n && i18n.on) {
      i18n.on("languageChanged", handle);
      return () => i18n.off("languageChanged", handle);
    }
    return undefined;
  }, [i18n]);

  function toggleLanguage() {
    const next = lang === "en" ? "ru" : "en";
    i18n.changeLanguage(next);
    setLang(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLanguage();
    }
  }

  return (
    <div className="inline-flex items-center fixed top-4 right-4 z-50">
      <button
        type="button"
        role="switch"
        aria-checked={lang === "ru"}
        onClick={toggleLanguage}
        onKeyDown={onKeyDown}
        className="relative inline-flex items-center w-40 h-12 p-1 rounded-2xl bg-slate-900 border border-slate-700 shadow-lg  "
      >
        <span
          className={`
      absolute left-1 top-[0.2rem] w-16 h-10 rounded-[0.8rem] flex items-center justify-center 
      font-semibold transition-transform duration-300 shadow-md text-white 
      ${
        lang === "en"
          ? "translate-x-0 bg-indigo-600"
          : "translate-x-[5.3rem] bg-sky-600"
      }
    `}
        >
          {lang === "en" ? "EN" : "RU"}
        </span>
        <span className="flex-1 text-sm font-medium flex items-center justify-between px-5 pointer-events-none text-slate-300">
          <span
            className={`${
              lang === "en" ? "text-indigo-300" : "text-slate-400"
            } flex items-center gap-2`}
          >
            EN
          </span>
          <span
            className={`${
              lang === "ru" ? "text-sky-300" : "text-slate-400"
            } flex items-center gap-2`}
          >
            RU
          </span>
        </span>
      </button>
    </div>
  );
}

export { LangButton, STORAGE_KEY };
