import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [page, setPage] = useState(1);
  const [productsData, setProductsData] = useState([]);
  const fetchData = async () => {
    const url = "https://dummyjson.com/products";
    const response = await fetch(url);
    const data = await response.json();

    setProductsData(data.products);
    console.log(data.products);
  };

  const selectPageHandler = (num) => {
    if (num >= 1 && num <= productsData.length / 10 && num !== page)
      setPage(num);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {productsData.length > 0 && (
        <div className="products">
          {productsData
            .slice(page * 10 - 10, page * 10)
            .map((product, index) => (
              <>
                <ul className="products__list">
                  <img src={product.thumbnail} alt={product.brand} />
                  <li>{product.title} </li>
                </ul>
              </>
            ))}
        </div>
      )}

      {productsData.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disable1"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ⏮️
          </span>
          {[...Array(productsData.length / 10)].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination_selected" : ""}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          ))}

          <span
            className={
              page < productsData.length / 10 ? "" : "pagination_disable2"
            }
            onClick={() => selectPageHandler(page + 1)}
          >
            {" "}
            ⏭️
          </span>
        </div>
      )}
    </div>
  );
}
