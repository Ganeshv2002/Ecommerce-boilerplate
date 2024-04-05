import React, { useState, useEffect } from 'react';
import './CartPage.css';

const CartPage = ({ cart }) => {
  const [counters, setCounters] = useState({});
  const [showOrderPlaced, setShowOrderPlaced] = useState(false); // State variable for pop-up

  useEffect(() => {
    // Initialize the counters when cart changes
    const initialCounters = {};
    cart.forEach(product => {
      if (initialCounters[product.id]) {
        initialCounters[product.id]++;
      } else {
        initialCounters[product.id] = 1;
      }
    });
    setCounters(initialCounters);
  }, [cart]);

  const increaseCount = (productId) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: (prevCounters[productId] || 0) + 1,
    }));
  };

  const decreaseCount = (productId) => {
    if (counters[productId] > 1) {
      setCounters((prevCounters) => ({
        ...prevCounters,
        [productId]: prevCounters[productId] - 1,
      }));
    } else {
      // Remove the product from the cart
      const { [productId]: removedProduct, ...newCounters } = counters;
      setCounters(newCounters);
    }
  };

  const removeProduct = (productId) => {
    setCounters((prevCounters) => {
      const { [productId]: removedProduct, ...newCounters } = prevCounters;
      return newCounters;
    });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.amount * (counters[product.id] || 0), 0);
  };

  const calculateDeliveryCharge = () => {
    return 50;
  };

  const calculateOverallTotal = () => {
    return calculateTotalPrice() + calculateDeliveryCharge();
  };

  const handlePlaceOrder = () => {
    // Logic to place the order can be added here
    setShowOrderPlaced(true); // Show the pop-up
  };

  return (
    <div className="cart-page">
      {/* Left box for product details */}
      <div className="cart-box">
        {Object.keys(counters).map((productId) => {
          const product = cart.find(p => p.id === parseInt(productId));
          if (product) {
            return (
              <div key={productId} className="cart-part">
                <div className="cart-details">
                  {/* Product details */}
                  <div className="product-header">
                    <h3>{product.title}</h3>
                  </div>
                  <p>Price: ₹{product.amount}</p>
                  <div className="count-options">
                    <button onClick={() => decreaseCount(productId)}>-</button>
                    <span>{counters[productId]}</span>
                    <button onClick={() => increaseCount(productId)}>+</button>
                  </div>
                </div>

                {/* Product image on the right */}
                <img src={product.image} alt={product.title} className="product-image" />
                <span onClick={() => removeProduct(productId)} className="close-icon">x</span>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Right box for price details */}
      <div className="price-details">
        <h3>Price Details</h3>
        <table>
          <tbody>
            <tr>
              <td>Price</td>
              <td>₹{calculateTotalPrice()}</td>
            </tr>
            <tr>
              <td>Delivery Charge</td>
              <td>₹{calculateDeliveryCharge()}</td>
            </tr>
            <tr><td colSpan="2"><div className="total-row"></div></td></tr>
            
            <tr>
              <td>Total Price</td> 
              <td>₹{calculateOverallTotal()}</td>
            </tr>
          </tbody>
        </table>
        <button 
          className={`place-order-button ${Object.keys(counters).length === 0 ? 'disabled' : ''}`} 
          onClick={handlePlaceOrder}
          disabled={Object.keys(counters).length === 0}
        >
          Place Order
        </button>

        {/* Order Placed Pop-up */}
        {showOrderPlaced && (
          <div className="order-placed-popup">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
              <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
              <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
            </svg>
            <p className="success">Order Placed</p>
            <button onClick={() => setShowOrderPlaced(false)}>x</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
