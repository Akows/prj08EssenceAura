import { useState } from 'react';
import { UseModalReturn } from '../../type/authtypes';

export const useModal = (): UseModalReturn => {
    const [isVisible, setIsVisible] = useState(false);

    const openModal = () => setIsVisible(true);
    const closeModal = () => setIsVisible(false);

    return {
        isVisible,
        openModal,
        closeModal,
    };
};
