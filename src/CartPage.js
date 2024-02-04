import React, { useState } from 'react';
import './CartPage.css';

const CartPage = ({ cart }) => {
  const [counters, setCounters] = useState({});

  const increaseCount = (productId) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: (prevCounters[productId] || 0) + 1,
    }));
  };

  const decreaseCount = (productId) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: Math.max((prevCounters[productId] || 0) - 1, 0),
    }));
  };

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, product) => total + product.amount * (counters[product.id] || 0), 0);
  };

  const calculateDeliveryCharge = () => {
    // Add your logic for calculating delivery charge
    return 0;
  };

  const calculateOverallTotal = (cart) => {
    return calculateTotalPrice(cart) + calculateDeliveryCharge();
  };

  return (
    <div className="cart-page">
      {/* Left box for product details */}
      <div className="cart-box">
        {cart.map((product) => (
          <div key={product.id} className="cart-part">
            <div className="cart-details">
              {/* Product details */}
              <h3>{product.title}</h3>
              <p>Amount: ₹{product.amount}</p>
              <div className="count-options">
                <button onClick={() => decreaseCount(product.id)}>-</button>
                <span>{counters[product.id] || 0}</span>
                <button onClick={() => increaseCount(product.id)}>+</button>
              </div>
            </div>

            {/* Product image on the right */}
            <img src={product.image} alt={product.title} className="product-image" />
          </div>
        ))}
      </div>

      {/* Right box for price details */}
      <div className="price-details">
        <h3>Price Details</h3>
        <table>
          <tbody>
            <tr>
              <td>Total Price:</td>
              <td>₹{calculateTotalPrice(cart)}</td>
            </tr>
            <tr>
              <td>Delivery Charge:</td>
              <td>₹{calculateDeliveryCharge()}</td>
            </tr>
          </tbody>
        </table>
        <p>Total: ₹{calculateOverallTotal(cart)}</p>
        <button className="place-order-button">Place Order</button>
      </div>
    </div>
  );
};

export default CartPage;
