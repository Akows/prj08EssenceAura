const db = require("../config/database");
const { NotFoundError, DatabaseError } = require("../error/error");

const getProductById = async (productId) => {
    try {
        // 데이터베이스에서 productId에 해당하는 제품을 조회
        const product = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);
        
        // 제품이 없는 경우 NotFoundError 발생
        if (product.length === 0) {
          throw new NotFoundError('제품을 찾을 수 없습니다.');
        }

        return product[0];
      } catch (error) {
        // 데이터베이스 쿼리 실행 중 에러 처리
        throw error instanceof NotFoundError ? error : new DatabaseError(error.message);
      }
};

const getProducts = async (queryParams) => {
    const {
      name,
      priceFrom,
      priceTo,
      category,
      tags,
      whatEvent,
      sortBy,
      order = 'asc',
      limit = 10,
      page = 1
    } = queryParams;
  
    try {
        // 기본 쿼리 설정. WHERE 1=1은 조건 추가를 용이하게 하기 위해 사용
        let query = 'SELECT * FROM products WHERE 1=1';

        // SQL 인젝션 공격 방지용 보안장치. 자세한 개념은 기획서 문서에 정리
        const queryParamsToEscape = [];

        // 이름으로 검색. '%'는 와일드카드로, 이름의 일부분만으로도 검색할 수 있도록
        if (name) {
            query += ' AND name LIKE ?';
            queryParamsToEscape.push(`%${name}%`);
        }

        // 가격 필터링. BETWEEN을 사용하여 주어진 가격 범위 내의 상품을 찾는다
        if (priceFrom && priceTo) {
            query += ' AND price BETWEEN ? AND ?';
            queryParamsToEscape.push(priceFrom, priceTo);
        } else if (priceFrom) {
            query += ' AND price >= ?';
            queryParamsToEscape.push(priceFrom);
        } else if (priceTo) {
            query += ' AND price <= ?';
            queryParamsToEscape.push(priceTo);
        }

        // 카테고리, 태그, 이벤트에 따른 필터링
        if (category) {
            query += ' AND category = ?';
            queryParamsToEscape.push(category);
        }
        if (tags) {
            query += ' AND tags LIKE ?';
            queryParamsToEscape.push(`%${tags}%`);
        }
        if (whatEvent) {
            query += ' AND what_event = ?';
            queryParamsToEscape.push(whatEvent);
        }

        // 정렬 옵션. 사용자가 선택한 필드와 순서(오름차순/내림차순)에 따라 정렬
        if (sortBy) {
            query += ` ORDER BY ${sortBy} ${order}`;
        }

        // 페이지네이션. LIMIT은 한 페이지에 보여줄 상품의 수, OFFSET은 건너뛸 상품의 수를 결정
        const offset = (page - 1) * limit;
        query += ' LIMIT ? OFFSET ?';
        queryParamsToEscape.push(Number(limit), offset);

        // 쿼리 실행. queryParamsToEscape 배열을 사용하여 쿼리 매개변수를 안전하게 삽입
        const products = await db.query(query, queryParamsToEscape);
        return products;
      } catch (error) {
        // 데이터베이스 쿼리 실행 중 에러 처리
        throw new DatabaseError(error.message);
      }
};

const getSearchSuggestions = async (keyword) => {
    try {
      const searchQuery = `%${keyword}%`;
  
      // 카테고리, 태그, 이벤트명에 기반하여 검색
      const categories = await db.query('SELECT DISTINCT category FROM products WHERE category LIKE ?', [searchQuery]);
      const tags = await db.query('SELECT DISTINCT tags FROM products WHERE tags LIKE ?', [searchQuery]);
      const events = await db.query('SELECT DISTINCT what_event FROM products WHERE what_event LIKE ?', [searchQuery]);
  
      // 검색 결과를 하나의 객체로 합침
      const suggestions = {
        categories: categories.map(row => row.category),
        tags: tags.map(row => row.tags),
        events: events.map(row => row.what_event)
      };
  
      return suggestions;
    } catch (error) {
      // 에러 처리
      throw new DatabaseError(error.message);
    }
  };

module.exports = {
    getProductById,
    getProducts,
    getSearchSuggestions,
};
