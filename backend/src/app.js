const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();

// CORS 미들웨어 설정
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // 이 옵션을 통해 쿠키를 함께 보낼 수 있도록 허가
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// 사용자 라우트 추가
app.use('/api', userRoutes);

module.exports = app;
