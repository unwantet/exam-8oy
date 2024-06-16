// src/components/CartItems.js

import React from "react";

const CartItems = ({ cartItems }) => {
  if (cartItems.length === 0) {
    return (
      <div className='card-body'>
        <p>Your cart is empty</p>
      </div>
    );
  } else {
    return (
      <div className="card bg-white shadow-lg p-4 max-w-sm mx-auto">
        <div className="card-body">
          <h2 className="card-title text-xl pb-4 border-b">Cart</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 mb-4">
              <img src={item.img[0]} alt="Product Image" className="w-16 h-16 object-cover rounded-xl" />
              <div>
                <h3 className="text-lg">{item.name}</h3>
                <p>${item.price} x {item.quantity} <span className="font-bold">${item.price * item.quantity}</span></p>
              </div>
            </div>
          ))}
          <button className="btn btn-warning w-full">Checkout</button>
        </div>
      </div>
    );
  }
};

export default CartItems;
