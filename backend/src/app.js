const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

// 기타 미들웨어 및 라우트
// ...

module.exports = app;
