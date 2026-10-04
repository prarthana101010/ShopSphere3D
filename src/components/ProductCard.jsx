import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const cardRef = useRef(null);
  
  // 3D Hover state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const inWishlist = isInWishlist(product.id);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10 to 10 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full glass-dark rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group flex flex-col relative"
      >
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md" style={{ transform: "translateZ(30px)" }}>
            {product.discount}% OFF
          </div>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors"
          style={{ transform: "translateZ(30px)" }}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-white/5">
          <motion.img 
            src={product.image} 
            alt={product.name}
            style={{ transform: "translateZ(40px)" }}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col" style={{ transform: "translateZ(20px)" }}>
          <p className="text-primary text-xs font-semibold mb-1 uppercase tracking-wider">{product.category}</p>
          <h3 className="text-white font-medium text-lg leading-tight mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-sm font-medium">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviews})</span>
          </div>
          
          <div className="mt-auto flex items-end justify-between">
            <div>
              <p className="text-white font-bold text-xl">${product.price.toFixed(2)}</p>
              {product.originalPrice > product.price && (
                <p className="text-gray-400 text-sm line-through">${product.originalPrice.toFixed(2)}</p>
              )}
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="bg-primary/20 hover:bg-primary text-primary hover:text-white rounded-lg p-2 transition-all duration-300"
              style={{ transform: "translateZ(30px)" }}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
