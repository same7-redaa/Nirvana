import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../translations';

type Language = 'ar' | 'en';

interface TranslationValue {
    ar: string;
    en: string;
}

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: TranslationValue) => string;
    translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ar');

    const toggleLanguage = () => {
        setLanguage(prev => {
            const newLang = prev === 'ar' ? 'en' : 'ar';
            // Update HTML dir and lang attributes
            document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = newLang;
            return newLang;
        });
    };

    const t = (key: TranslationValue) => {
        return key[language];
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, translations }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
