import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid #eaeaea;
    align-items: center;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const Image = styled.img`
    width: 80px;
    height: 80px;
    margin-right: 20px;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        margin-right: 0;
        margin-bottom: 10px;
        width: 100%;
        height: 50%;
    }
`;

const Title = styled.h3`
    flex: 1;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        margin-bottom: 10px;
        font-size: 24px;
        width: 100%;
    }
`;

const PriceQuantityContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        align-items: flex-start;
        width: 100%;
        margin-bottom: 10px;
    }
`;

const Price = styled.div`
    padding: 0 10px;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        padding: 0;
        padding-bottom: 10px;
        margin-right: 5px;
    }
`;

const QuantityInput = styled.input`
    width: 50px;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        margin-bottom: 10px;
    }
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    font-weight: bolder;
    color: #f44336;
    cursor: pointer;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        font-size: 22px;
        font-weight: bolder;
        order: 3;
    }
`;

interface CartItemProps {
    product_id: number;
    image_url: string;
    name: string;
    final_price: number;
    quantity: number;
}

interface CartItemComponentProps {
    item: CartItemProps;
    onQuantityChange: (product_id: number, quantity: number) => void;
    onRemove: (product_id: number) => void;
}

const CartItem: React.FC<CartItemComponentProps> = ({
    item,
    onQuantityChange,
    onRemove,
}) => {
    // 가격을 정수로 표현하기 위해 parseInt를 사용
    const formattedPrice = parseInt(item.final_price).toLocaleString();

    return (
        <ItemContainer>
            <Image src={item.image_url} alt={item.name} />
            <Title>{item.name}</Title>

            <PriceQuantityContainer>
                <Price>{formattedPrice}원</Price>

                <QuantityInput
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                        onQuantityChange(
                            item.product_id,
                            parseInt(e.target.value)
                        )
                    }
                    min="1"
                />
            </PriceQuantityContainer>

            <RemoveButton onClick={() => onRemove(item.product_id)}>
                삭제
            </RemoveButton>
        </ItemContainer>
    );
};

export default CartItem;
