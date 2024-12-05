import "./styles.css";
import { useEffect, useState, useCallback } from "react";

export default function App() {
  const [page, setPage] = useState(1);
  const [productsData, setProductsData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = useCallback(async () => {
    const url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.products && data.products.length > 0) {
      setProductsData(data.products);
      setTotalPages(Math.ceil(data.total / 10));
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const selectPageHandler = (num) => {
    if (num >= 1 && num <= totalPages && num !== page) setPage(num);
  };

  return (
    <div className="App">
      <h1>Pagination</h1>
      {productsData.length > 0 ? (
        <div className="products">
          {productsData.map((product) => (
            <ul className="products__list" key={product.id}>
              <img src={product.thumbnail} alt={product.brand} />
              <li>{product.title}</li>
            </ul>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      {productsData.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disable1"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ⏮️
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={page === i + 1 ? "pagination_selected" : ""}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={page < totalPages ? "" : "pagination_disable2"}
            onClick={() => selectPageHandler(page + 1)}
          >
            ⏭️
          </span>
        </div>
      )}
    </div>
  );
}
