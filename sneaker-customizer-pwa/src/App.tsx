import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SneakerCustomizer from './components/SneakerCustomizer';
// import Cart from './components/Cart';

import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AppNavbar from './components/AppNavbar';

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customizer" element={<SneakerCustomizer />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
