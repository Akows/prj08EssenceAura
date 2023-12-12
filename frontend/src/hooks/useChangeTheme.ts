import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/slices/uiSlice';
import { RootState } from '../redux/store';

export const useChangeTheme = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.ui.theme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (newTheme: 'light' | 'dark') => {
        dispatch(setTheme(newTheme));
    };
};
