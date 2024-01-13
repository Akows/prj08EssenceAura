import { useState } from 'react';
import { isEmailValid } from '../../utils/auth';

export const useFindId = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEmailValid(email)) {
            alert('잘못된 이메일 형식입니다.');
            return;
        }

        // API 호출 또는 추가 처리
    };

    return {
        name,
        setName,
        email,
        setEmail,
        handleSubmit,
    };
};
