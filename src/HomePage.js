import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './HomePage.css';

const HomePage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    axios.get('/db.json')
      .then(response => {
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error('Invalid data structure. Expected an array of products.');
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const addToCart = () => {
    if (selectedProduct) {
      const updatedCart = [...cart, selectedProduct];
      setCart(updatedCart);
    }
  };

  const toggleLike = (productId) => {
    setLikedProducts(prevLikedProducts => {
      if (prevLikedProducts.includes(productId)) {
        return prevLikedProducts.filter(id => id !== productId);
      } else {
        return [...prevLikedProducts, productId];
      }
    });
  };

  return (
    <div>
      {/* Products Gallery */}
      <div className="product-gallery">
        {products.map(product => (
          <div key={product.id} className="product-card" > {/* Added onClick here */}
            <img src={product.image} alt={product.title} />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>₹ {product.amount}</p>
              <p>
                <span className="product-rating">{product.rating}</span>
              </p>
              <div className="icon-container">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  color ={likedProducts.includes(product.id) ? "red" : "none"}
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => toggleLike(product.id)}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.0122 5.57169L10.9252 4.48469C8.77734 2.33681 5.29493 2.33681 3.14705 4.48469C0.999162 6.63258 0.999162 10.115 3.14705 12.2629L11.9859 21.1017L11.9877 21.0999L12.014 21.1262L20.8528 12.2874C23.0007 10.1395 23.0007 6.65711 20.8528 4.50923C18.705 2.36134 15.2226 2.36134 13.0747 4.50923L12.0122 5.57169ZM11.9877 18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386 5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101 5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182 4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  
                  onClick={() => openProductDetails(product)}
                >
                  <path
                    d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Overlay */}
      {selectedProduct && (
        <div className="product-details-overlay">
          <div className="overlay-content">
            <img src={selectedProduct.image} alt={selectedProduct.title} className="product-detail-image" />

            <div className="details">
              <h3>{selectedProduct.title}</h3>
              <p>Description: {selectedProduct.description}</p>
              <p>₹ {selectedProduct.amount}</p>
              <div className="buttons-container">
                <Link to="/cart" className="nav-link">
                  <button className="buy-now-button" onClick={addToCart}>Buy Now</button>
                </Link>
                <button className="add-to-cart-button" onClick={addToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
            <button className="close-button" onClick={closeProductDetails}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
