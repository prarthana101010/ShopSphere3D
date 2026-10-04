import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Orders from './pages/Orders';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-dark text-light">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
