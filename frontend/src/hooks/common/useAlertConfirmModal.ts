import { useState } from 'react';

const useAlertConfirmModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const showModal = (message: string) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return {
        isModalOpen,
        modalMessage,
        showModal,
        closeModal,
    };
};

export default useAlertConfirmModal;
