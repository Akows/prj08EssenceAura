const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

// CORS 미들웨어 설정
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // 이 옵션을 통해 쿠키를 함께 보낼 수 있도록 허가
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// 로깅 미들웨어
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} Request to ${req.originalUrl}`);
    next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// 계정 라우트 추가
app.use('/auth', authRoutes);

// 유저 라우트 추가
app.use('/user', userRoutes);

// 관리자 라우트 추가
app.use('/admin', adminRoutes);

// 제품 라우트 추가
app.use('/product', productRoutes);

module.exports = app;
