const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// 사용자 라우트 추가
app.use('/api', userRoutes);

module.exports = app;
