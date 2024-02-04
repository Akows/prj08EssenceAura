const db = require('../config/database');

const createOrder = async (userId, items, totalAmount, deliveryAddress) => {
    // 주문 데이터를 데이터베이스에 저장하는 로직
    try {
        const orderResult = await db.query(
            'INSERT INTO orders (user_id, total_price, delivery_address, status, created_at) VALUES (?, ?, ?, "PENDING", NOW())',
            [userId, totalAmount, deliveryAddress]
        );

        const orderId = orderResult.insertId;

        // order_details 테이블에 각 항목을 저장
        for (const item of items) {
            await db.query(
                'INSERT INTO order_details (order_id, product_id, price, quantity) VALUES (?, ?, ?, ?)',
                [orderId, item.productId, item.price, item.quantity]
            );
        }

        return orderId;
    } catch (error) {
        throw new Error('주문 생성 중 데이터베이스 오류가 발생했습니다.');
    }
};

const processPayment = async (orderId, amount, paymentMethod) => {
    // 결제 데이터를 데이터베이스에 저장하는 로직
    try {
        const paymentResult = await db.query(
            'INSERT INTO payments (order_id, amount, payment_method, paid_at, payment_status) VALUES (?, ?, ?, NOW(), "SUCCESS")',
            [orderId, amount, paymentMethod]
        );

        return paymentResult.insertId;
    } catch (error) {
        throw new Error('결제 처리 중 데이터베이스 오류가 발생했습니다.');
    }
};

module.exports = {
    createOrder,
    processPayment
};