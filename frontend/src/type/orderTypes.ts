export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface Order {
    orderId: number;
    userId: number;
    totalPrice: number;
    discountAmount: number | null;
    deliveryAddress: string;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    createdAt: string;
    updatedAt: string | null;
}

export interface OrderDetail {
    orderDetailId: number;
    orderId: number;
    productId: number;
    price: number;
    quantity: number;
    productOption: Record<string, unknown> | null;
}

export interface Payment {
    orderId: number;
    amount: number;
    paymentMethod: string;
}

export interface OrderResponse {
    orderId: number;
    status: string;
    createdAt: string;
    totalAmount: number;
}

export interface PaymentResponse {
    paymentId: number;
    status: string;
    transactionId: string;
    paidAt: string;
}

export interface OrderState {
    currentOrder: Order | null;
    paymentResult: PaymentResponse | null;
    loading: boolean;
    error: string | null;
}

export interface PaymentResult {
    paymentId: number;
    status: string;
    transactionId: string;
    paidAt: string;
}
