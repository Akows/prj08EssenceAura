const { DatabaseError, NotFoundError } = require('../error/error');
const { getProductById, getProducts } = require('../service/productService');

const getProductByIdHandler = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await getProductById(productId);
  
      if (!product) {
        throw new NotFoundError('제품을 찾을 수 없습니다.');
      }
  
      res.json(product);
    } catch (error) {
      if (error instanceof DatabaseError) {
        res.status(500).send({ message: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).send({ message: error.message });
      } else {
        res.status(500).send({ message: '제품 정보 조회 중, 서버에서 오류가 발생하였습니다.' });
      }
    }
};

const getProductsHandler = async (req, res) => {
    try {
      const query = req.query;
      const products = await getProducts(query);
  
      res.json(products);
    } catch (error) {
      if (error instanceof DatabaseError) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(500).send({ message: '제품 목록 조회 중, 서버에서 오류가 발생하였습니다.' });
      }
    }
};

const getSearchSuggestionsHandler = async (req, res) => {
    try {
      // 쿼리 파라미터에서 검색 키워드를 추출합니다.
      const keyword = req.query.keyword;
      if (!keyword) {
        return res.status(400).json({ message: '검색 키워드가 필요합니다.' });
      }
  
      // 검색 서비스를 호출하여 제안을 가져옵니다.
      const suggestions = await searchService.getSearchSuggestions(keyword);
      res.json(suggestions);
    } catch (error) {
      if (error instanceof DatabaseError) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
      }
    }
  };


module.exports = {
    getProductByIdHandler,
    getProductsHandler,
    getSearchSuggestionsHandler,
};
