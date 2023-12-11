import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/slices/uiSlice';

export const useChangeLanguage = () => {
  const dispatch = useDispatch();

  const changeLanguage = (language : string) => {
    dispatch(setLanguage(language));
    localStorage.setItem('language', language);
  };

  return changeLanguage;
};
