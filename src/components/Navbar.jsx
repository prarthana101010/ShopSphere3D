import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, Box } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/products' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-dark py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/40 transition-colors">
              <Box className="text-primary w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ShopSphere <span className="text-primary">3D</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 pl-10 text-sm text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </form>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full glass-dark rounded-xl overflow-hidden border border-white/10 shadow-2xl z-50">
                {searchResults.map(result => (
                  <Link 
                    key={result.id} 
                    to={`/product/${result.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <img src={result.image} alt={result.name} className="w-10 h-10 object-cover rounded-md" />
                    <div>
                      <p className="text-sm font-medium text-white truncate">{result.name}</p>
                      <p className="text-xs text-primary">${result.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav Icons */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Explore</Link>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <Link to="/account" className="text-gray-300 hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </Link>
              
              <Link to="/wishlist" className="relative text-gray-300 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              
              <Link to="/cart" className="relative text-gray-300 hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-6 absolute top-full left-0 w-full glass-dark border-t border-white/10 shadow-2xl">
            <form onSubmit={handleSearch} className="px-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 pl-10 text-sm text-white focus:outline-none focus:border-primary"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </form>
            
            <div className="flex flex-col gap-4 px-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10 my-2" />
              <div className="flex justify-around">
                <Link to="/account" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-1 text-gray-300 hover:text-white">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Account</span>
                </Link>
                <Link to="/wishlist" onClick={() => setIsOpen(false)} className="relative flex flex-col items-center gap-1 text-gray-300 hover:text-white">
                  <Heart className="w-5 h-5" />
                  <span className="text-xs">Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link to="/cart" onClick={() => setIsOpen(false)} className="relative flex flex-col items-center gap-1 text-gray-300 hover:text-white">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-xs">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
