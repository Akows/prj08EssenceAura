import React, { useState } from 'react';
import styled from 'styled-components';
import InventoryManagement from '../../components/admin/InventoryManagement';
import OrderManagement from '../../components/admin/OrderManagement';

const DashboardContainer = styled.div`
    margin: 30px;
    width: 100%; // 화면 전체 폭을 사용하도록 변경
    max-width: 1200px;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const DashboardHeader = styled.header`
    padding: 20px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderTitle = styled.h1`
    font-size: 24px;
    color: #333;
`;

const TabLink = styled.button`
    background: none;
    border: none;
    color: #e44d26;
    padding: 10px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }

    &.active {
        color: #f55f3b;
        text-decoration: underline;
    }
`;

const DashboardMain = styled.main`
    display: grid;
    gap: 20px;
    padding: 20px 0;
`;

const Card = styled.div`
    background: white;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DashboardFooter = styled.footer`
    padding: 20px;
    text-align: center;
    border-top: 1px solid #ddd;
`;

const AdminDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('orders');

    const renderContent = () => {
        switch (activeTab) {
        case 'orders':
            return <OrderManagement />;
        case 'stock':
            return <InventoryManagement />;
        case 'feedback':
            return <Card>사용자 피드백 내용</Card>;
        default:
            return <Card>선택된 탭에 해당하는 정보가 없습니다.</Card>;
        }
    };

    return (
        <DashboardContainer>
            <DashboardHeader>
                <HeaderTitle>관리자 대시보드</HeaderTitle>
                <div>
                    <TabLink
                        onClick={() => setActiveTab('orders')}
                        className={activeTab === 'orders' ? 'active' : ''}
                    >
                        주문 관리
                    </TabLink>
                    <TabLink
                        onClick={() => setActiveTab('stock')}
                        className={activeTab === 'stock' ? 'active' : ''}
                    >
                        재고 관리
                    </TabLink>
                    <TabLink
                        onClick={() => setActiveTab('feedback')}
                        className={activeTab === 'feedback' ? 'active' : ''}
                    >
                        사용자 피드백
                    </TabLink>
                </div>
            </DashboardHeader>
            <DashboardMain>{renderContent()}</DashboardMain>
            <DashboardFooter>
                &copy; {new Date().getFullYear()} EssenceAura 관리자 페이지
            </DashboardFooter>
        </DashboardContainer>
    );
};

export default AdminDashboardPage;
