import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';

export const useStoredSettings = () => {
    const reduxTheme = useSelector((state: RootState) => state.ui.theme);
    const reduxLanguage = useSelector((state: RootState) => state.ui.language);

    const [storedTheme, setStoredTheme] = useState(reduxTheme);
    const [storedLanguage, setStoredLanguage] = useState(reduxLanguage);

    useEffect(() => {
        setStoredTheme(reduxTheme);
        setStoredLanguage(reduxLanguage);
        localStorage.setItem('theme', reduxTheme);
        localStorage.setItem('language', reduxLanguage);
    }, [reduxTheme, reduxLanguage]);

    return { storedTheme, storedLanguage };
};
