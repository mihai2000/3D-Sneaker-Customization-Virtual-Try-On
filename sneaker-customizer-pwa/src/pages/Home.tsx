import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Design Your Dream Sneakers 👟
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
        Customize colors, textures, and even try them on in AR! Build your own unique style and bring your sneakers to life.
      </p>
      <Link
        to="/customizer"
        className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition"
      >
        Start Customizing
      </Link>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">🖌️ Fully Customizable</h2>
          <p className="text-gray-600">
            Pick your favorite sneaker, change colors, and apply unique textures to make it your own.
          </p>
        </div>
        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">🛒 Easy Checkout</h2>
          <p className="text-gray-600">
            Add your designs to the cart and complete your purchase smoothly with Stripe.
          </p>
        </div>
        <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">📱 AR Try-On</h2>
          <p className="text-gray-600">
            Experience your customized sneaker in augmented reality right from your mobile device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
