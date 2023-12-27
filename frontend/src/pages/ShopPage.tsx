import axios from 'axios';
import React from 'react';

const ShopPage: React.FC = () => {
    // 프론트엔드 -> 백엔드 -> 데이터베이스 연동 확인용 임시 기능.
    // 각 파트의 연동이 정상 동작함을 확인하고 코드를 주석 처리함.
    const handleCreate = () => {
        const testData = 'Test data';

        axios
            .post('http://3.36.128.6:3001/api/create', { data: testData })
            .then((response) => {
                // console.log(response.data);
                alert('Data created successfully');
            })
            .catch((error) => {
                // console.error('Error creating data', error);
                alert('Error creating data');
            });
    };

    const handleFetchData = () => {
        axios
            .get('http://3.36.128.6:3001/api/getAll')
            .then((response) => {
                // console.log(response.data);
                alert('Data fetched successfully');
            })
            .catch((error) => {
                // console.error('Error fetching data', error);
                alert('Error fetching data');
            });
    };

    return (
        <div>
            <h1>향수 온라인 쇼핑몰에 오신 것을 환영합니다!</h1>
            <p>다양한 향수를 탐색하고, 새로운 향기를 경험해 보세요.</p>
            <button onClick={handleCreate}>Create Test Data</button>
            <button onClick={handleFetchData}>Fetch Test Data</button>
        </div>
    );
};

export default ShopPage;
