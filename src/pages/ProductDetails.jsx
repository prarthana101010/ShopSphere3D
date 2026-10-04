import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

// 3D Placeholder for product
const Product3DViewer = ({ color }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshPhysicalMaterial 
          color={color || "#3b82f6"} 
          metalness={0.6}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>
    </Float>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState('image'); // 'image' or '3d'
  
  // Image Zoom State
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setQuantity(1);
      setViewMode('image');
      window.scrollTo(0, 0);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleZoomMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const getColorBasedOnCategory = () => {
    const colors = {
      'Electronics': '#3b82f6',
      'Fashion': '#ec4899',
      'Home & Kitchen': '#10b981',
      'Gaming': '#8b5cf6',
      'Books': '#eab308',
      'Beauty': '#ef4444',
      'Accessories': '#f97316',
      'Sports': '#14b8a6'
    };
    return colors[product.category] || '#3b82f6';
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        
        {/* Left: Product Image / 3D Viewer */}
        <div className="flex flex-col gap-4">
          <div className="relative h-[400px] md:h-[500px] glass-dark rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
            
            {/* View Mode Toggle */}
            <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 p-1 flex gap-1">
              <button 
                onClick={() => setViewMode('image')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'image' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
              >
                2D Image
              </button>
              <button 
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === '3d' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
              >
                3D View
              </button>
            </div>

            {viewMode === 'image' ? (
              <div 
                className="w-full h-full cursor-zoom-in relative"
                onMouseMove={handleZoomMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}
                />
                {isZooming && (
                  <div 
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundPosition,
                      backgroundSize: '200%',
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="w-full h-full cursor-move">
                <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <PresentationControls 
                    global 
                    config={{ mass: 2, tension: 500 }} 
                    snap={{ mass: 4, tension: 1500 }}
                  >
                    <Product3DViewer color={getColorBasedOnCategory()} />
                  </PresentationControls>
                  <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} />
                  <Environment preset="city" />
                </Canvas>
                <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
                  <p className="text-white/50 text-sm flex items-center justify-center gap-2">
                    <span className="animate-pulse">👆</span> Drag to rotate
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-primary font-semibold tracking-wider uppercase text-sm">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-400 text-sm hover:text-primary cursor-pointer transition-colors">{product.reviews} Reviews</span>
            <span className="text-gray-600">|</span>
            <span className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">In Stock ({product.stock})</span>
          </div>

          <div className="mb-8">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-4xl font-bold text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-sm font-bold text-red-500 mb-1">({product.discount}% OFF)</span>
                </>
              )}
            </div>
            <p className="text-gray-400 text-sm">Inclusive of all taxes</p>
          </div>

          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="text-white font-medium mb-4">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-white font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`sm:w-16 h-16 flex items-center justify-center rounded-xl border transition-all hover:-translate-y-1 ${inWishlist ? 'bg-red-500/20 border-red-500 text-red-500' : 'glass-dark border-white/10 text-white hover:bg-white/5'}`}
            >
              <Heart className={`w-6 h-6 ${inWishlist ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Free Delivery</p>
                <p className="text-gray-400 text-xs">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">1 Year Warranty</p>
                <p className="text-gray-400 text-xs">100% Original</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-6">Specifications</h2>
        <div className="glass-dark rounded-2xl p-6 md:p-8 border border-white/10">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-300 pb-4 border-b border-white/5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
