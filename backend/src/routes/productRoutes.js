const express = require('express');
const router = express.Router();
const { getProductsHandler, getProductByIdHandler, getSearchSuggestionsHandler } = require('../controllers/productController');

// 단일 제품 조회 라우트
router.get('/:productId', getProductByIdHandler);

// 복수 제품 조회 라우트
router.get('/', getProductsHandler);

// 검색 제안 라우트
router.get('/suggestions', getSearchSuggestionsHandler);

module.exports = router;
