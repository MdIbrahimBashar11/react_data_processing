// CartPage.js

import React, { useState, useEffect } from 'react';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Ensure that all item quantities are numbers and initialize them to 1 if missing
    const updatedCartItems = storedCartItems.map((item) => ({
      ...item,
      quantity: typeof item.quantity === 'number' ? item.quantity : 1,
    }));
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Calculate total quantity
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <h1 className='text-center py-4'>Cart</h1>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Album ID</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.thumbnailUrl} alt={item.title} style={{ maxWidth: '100px' }} />
                </td>
                <td>{item.title}</td>
                <td>{item.id}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className='btn btn-danger'
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className='btn btn-success mx-2'
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className='btn btn-warning'
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <p>Total Quantity: {totalQuantity}</p>
      </div>
    </div>
  );
}

export default CartPage;
