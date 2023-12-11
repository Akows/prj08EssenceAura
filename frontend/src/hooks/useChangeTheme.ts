import { useDispatch } from 'react-redux';
import { setTheme } from '../redux/slices/uiSlice';

export const useChangeTheme = () => {
  const dispatch = useDispatch();

  const changeTheme = (theme : string) => {
    dispatch(setTheme(theme));
    localStorage.setItem('theme', theme);
  };

  return changeTheme;
};
