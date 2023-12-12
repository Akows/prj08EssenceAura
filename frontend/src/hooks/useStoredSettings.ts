import { useEffect, useState } from 'react';

export const useStoredSettings = () => {
    const [storedTheme, setStoredTheme] = useState('light');
    const [storedLanguage, setStoredLanguage] = useState('ko');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLanguage = localStorage.getItem('language') || 'ko';
        setStoredTheme(savedTheme);
        setStoredLanguage(savedLanguage);
    }, []);

    return { storedTheme, storedLanguage };
};
