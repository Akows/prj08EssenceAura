import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

const PageNumber = styled.button`
    padding: 5px 10px;
    margin: 0 5px;
    border: 1px solid #ddd;
    background: transparent;
    cursor: pointer;
    &:hover {
        background: #f0f0f0;
    }
    &.active {
        border-color: #000;
        font-weight: bold;
        background: #e0e0e0;
    }
`;

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
}) => {
    return (
        <PaginationContainer>
            {Array.from({ length: totalPages }, (_, index) => (
                <PageNumber
                    key={index + 1}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </PageNumber>
            ))}
        </PaginationContainer>
    );
};

export default Pagination;
