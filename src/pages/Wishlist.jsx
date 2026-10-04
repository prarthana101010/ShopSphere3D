import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-red-500/50">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Your wishlist is empty</h2>
        <p className="text-gray-400 mb-8">Save items you love here to buy them later.</p>
        <Link 
          to="/products"
          className="glass hover:bg-white/10 text-white px-8 py-3 rounded-xl font-medium transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
        <span className="text-gray-400 text-sm ml-2">({wishlist.length} items)</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishlist.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
              className="glass-dark rounded-2xl overflow-hidden border border-white/10 group flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden bg-white/5 block">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>
              
              <div className="p-5 flex-1 flex flex-col">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-white font-medium text-lg leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                
                <div className="flex items-end justify-between mt-auto pt-4">
                  <div>
                    <p className="text-white font-bold text-xl">${product.price.toFixed(2)}</p>
                    {product.originalPrice > product.price && (
                      <p className="text-gray-400 text-sm line-through">${product.originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                  <button 
                    onClick={() => handleMoveToCart(product)}
                    className="flex-1 bg-primary/20 hover:bg-primary text-primary hover:text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Move to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 bg-white/5 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
