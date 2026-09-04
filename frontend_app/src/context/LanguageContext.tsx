import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation, LanguageCode, translations } from '../i18n';
import { storageService } from '../services/storageService';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: async () => {},
  t: translations.en,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<LanguageCode>('en');

  useEffect(() => {
    storageService.getLanguage().then((saved) => {
      if (saved) setLangState(saved);
    });
  }, []);

  const handleSetLanguage = async (newLang: LanguageCode) => {
    setLangState(newLang);
    await storageService.setLanguage(newLang);
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
