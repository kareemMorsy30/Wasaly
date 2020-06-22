import React, { useState, useEffect } from 'react';
import Card from './Products';
import { Link } from 'react-router-dom';
// import Checkout from './Checkout';
const getCart = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart'));
      }
    }
    return [];
  };
const Cart = () => {
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [render]);

  const showItems = items => {
    return (
      <div>
      {console.log("ITEMS :: ",items)}
        <div className="row">
          {
              items.map(item => (
            <div className="col-4" key={item._id}>
              <Card
                item={item}
                showAddToCartButton={false}
                showRemoveProductButton={true}
                // cartUpdate={true}
                setRender={setRender}
                render={render}
              />
            </div>
          ))}{' '}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <div>
      <h2>Your cart is currently empty.</h2>
      <Link to="/shop">Continue shopping</Link>
    </div>
  );

  return (
    <div className="text-center m-3">
      <div className="">
        <h1 className="title p-2">Your cart</h1>
        {/* <Checkout products={items} setRender={setRender} render={render} /> */}
      </div>

      <div className="mt-4">
        {items.length > 0 ? showItems(items) : noItemsMessage()}
      </div>
    </div>
  );
};

export default Cart;
