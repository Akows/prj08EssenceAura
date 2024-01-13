import { useState } from 'react';

export const useFindEmail = () => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !phone) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(
                'http://localhost:3001/api/find-email',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, phone }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                setEmail(data.email);
                setError(null);
            } else {
                throw new Error(
                    data.message || '알 수 없는 에러가 발생하였습니다.'
                );
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('알 수 없는 에러가 발생하였습니다.');
            }
            setEmail(null);
        }
    };

    return {
        name,
        setName,
        phone,
        setPhone,
        email,
        error,
        handleSubmit,
    };
};
