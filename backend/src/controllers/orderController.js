const { createOrder, processPayment } = require("../service/orderService");

const createOrderHandler = async (req, res) => {
    try {
        const userId = req.body.userId;
        const items = req.body.items; // 배열 형태: [{ productId, quantity, price }, ...]
        const totalAmount = req.body.totalAmount;
        const deliveryAddress = req.body.deliveryAddress;

        const orderId = await createOrder(userId, items, totalAmount, deliveryAddress);

        res.status(201).json({ message: '주문이 생성되었습니다.', orderId });
    } catch (error) {
        res.status(500).json({ message: '주문 생성 중 오류가 발생했습니다.', error: error.message });
    }
};

const processPaymentHandler = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const amount = req.body.amount;
        const paymentMethod = req.body.paymentMethod;

        const paymentId = await processPayment(orderId, amount, paymentMethod);

        res.status(201).json({ message: '결제가 성공적으로 처리되었습니다.', paymentId });
    } catch (error) {
        res.status(500).json({ message: '결제 처리 중 오류가 발생했습니다.', error: error.message });
    }
};

module.exports = {
    createOrderHandler,
    processPaymentHandler
};