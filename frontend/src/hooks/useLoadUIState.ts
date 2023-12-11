import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme, setLanguage } from '../redux/slices/uiSlice';

export const useLoadUIState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'ko';

    dispatch(setTheme(savedTheme));
    dispatch(setLanguage(savedLanguage));
  }, [dispatch]);
};
