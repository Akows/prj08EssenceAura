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
                'http://localhost:3001/auth/find-email',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, phone }),
                }
            );

            // 만약 axios를 사용했을 경우..
            // HTTP 요청을 보낼 때 필요한 헤더와 본문의 형식을 정의하는 부분을 axios에서는 알아서 수행해준다.
            // Axios는 JSON 객체를 자동으로 JSON 문자열로 변환해주고.
            // Content-Type 헤더도 알아서 설정해준다.
            // 제공된 JavaScript 객체를 자동으로 JSON으로 변환 해주기에 JSON.stringify()를 호출할 필요도 없다.

            // const response = await axios.post(
            //     'http://localhost:3001/auth/find-email',
            //     { name, phone }
            // );

            const data = await response.json();

            if (response.ok) {
                setName('');
                setPhone('');
                alert('회원님의 이메일 주소는 : ' + data.email + '입니다.');
                setError(null);
            } else {
                alert(data.message || '알 수 없는 에러가 발생하였습니다.');
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
        handleSubmit,
    };
};
