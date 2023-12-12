import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slices/uiSlice';
import { RootState } from '../redux/store';

export const useChangeLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.ui.language);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (newLanguage: 'ko' | 'en') => {
    dispatch(setLanguage(newLanguage));
  };
};