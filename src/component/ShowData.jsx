// ShowData.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShowData({ data }) {
  const [selectedItemsCount, setSelectedItemsCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const slicedItems = data.slice(0, selectedItemsCount);

  const handleSelectChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    setSelectedItemsCount(newCount);
  };

  const handleAddToCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      // Item is already in the cart, you can handle this as needed
      console.log('Item is already in the cart.');
    } else {
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  // Function to filter data based on the search query
  const filteredItems = slicedItems.filter((item) => {
    const itemId = item.id.toString().toLowerCase();
    const itemName = item.title.toLowerCase();
    const searchValue = searchQuery.toLowerCase();
    return itemId.includes(searchValue) || itemName.includes(searchValue);
  });

  return (
    <div>
      <h1 className='text-center py-4'>Show Data</h1>
      <div className='container'>
        <div className="row">
          <div className="col-md-5 col-sm-11 mx-auto">
            <div className='mb-3'>
              <label htmlFor='itemsCountSelect' className='form-label'>
                Show:
              </label>
              <select
                id='itemsCountSelect'
                className='form-select'
                value={selectedItemsCount}
                onChange={handleSelectChange}
              >
                <option value={10}>10 items</option>
                <option value={20}>20 items</option>
                <option value={30}>30 items</option>
                <option value={50}>50 items</option>
              </select>
            </div>
          </div>
          <div className="col-md-5 col-sm-11 mx-auto">
            {/* Search input for ID or Name */}
            <div className='mb-3'>
              <label htmlFor='searchQuery' className='form-label'>
                Search by ID or Name:
              </label>
              <input
                type='text'
                id='searchQuery'
                className='form-control'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          {filteredItems.map((item) => (
            <div className='col-md-4' key={item.id}>
              <div className='card mb-4'>
                <img src={item.thumbnailUrl} className='card-img-top' alt={item.title} />
                <div className='card-body'>
                  <h5 className='card-title'>{item.title}</h5>
                  <p className='card-text'>Album ID: {item.id}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className='btn btn-success mx-2'
                  >
                    {cartItems.some((cartItem) => cartItem.id === item.id)
                      ? 'In Cart'
                      : 'Add to Cart'}
                  </button>
                  <Link to={`/details/${item.id}`} className='btn btn-primary '>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowData;
