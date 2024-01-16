const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

// CORS 미들웨어 설정
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // 이 옵션을 통해 쿠키를 함께 보낼 수 있도록 허가
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// 사용자 라우트 추가
app.use('/api', userRoutes);

module.exports = app;
