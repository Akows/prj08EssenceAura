import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage, setTheme } from '../redux/slices/uiSlice';

export const useStoredSettings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLanguage = localStorage.getItem('language') || 'ko';
        dispatch(setTheme(savedTheme as 'light' | 'dark'));
        dispatch(setLanguage(savedLanguage as 'ko' | 'en'));
    }, [dispatch]);
};
