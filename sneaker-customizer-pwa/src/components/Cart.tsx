import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeItem, clearCart } = useCart();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.items.map((item, index) => (
            <div
              key={index}
              className="p-4 mb-2 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm">
                  Colors:blue
                  {/* {JSON.stringify(item.colors)} */}
                </p>
                <p className="text-sm">
                  Textures: camo
                  {/* {JSON.stringify(item.textures)} */}
                </p>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear Cart
          </button>
          <div className="mt-4">
            <Link to="/checkout">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
