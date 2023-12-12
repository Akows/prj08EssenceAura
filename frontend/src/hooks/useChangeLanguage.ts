import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slices/uiSlice';

// 스토어의 타입 정보를 가져옵니다.
import { RootState } from '../redux/store';

export const useChangeLanguage = () => {
    // useDispatch 훅을 사용하여 Redux의 dispatch 함수에 접근합니다.
    const dispatch = useDispatch();

    // useSelector 훅을 사용하여 Redux 스토어에서 현재 언어 상태를 가져옵니다.
    const language = useSelector((state: RootState) => state.ui.language);

    // useEffect 훅을 사용하여 컴포넌트가 렌더링될 때마다 특정 작업을 수행합니다.
    useEffect(() => {
        // localStorage에 현재 언어를 저장합니다.
        localStorage.setItem('language', language);
    }, [language]); // language가 변경될 때마다 useEffect 내부의 코드가 실행됩니다.

    // 이 훅은 새로운 언어로 상태를 변경하는 함수를 반환합니다.
    return (newLanguage: 'ko' | 'en') => {
        // dispatch 함수를 사용하여 setLanguage 액션을 디스패치합니다.
        // 이는 선택된 새 언어로 상태를 업데이트합니다.
        dispatch(setLanguage(newLanguage));
    };
};
