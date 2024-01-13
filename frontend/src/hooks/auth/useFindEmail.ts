import { useState } from 'react';

export const useFindEmail = () => {
    const [name, setName] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API 호출 또는 추가 처리
    };

    return {
        name,
        setName,
        handleSubmit,
    };
};
