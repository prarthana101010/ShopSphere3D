import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const deliveryCharge = cartTotal > 0 && cartTotal < 50 ? 10 : 0;
  const finalTotal = cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link 
          to="/products"
          className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="glass-dark rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5 hidden sm:flex text-gray-400 text-sm font-medium">
              <div className="flex-1">Product</div>
              <div className="w-32 text-center">Quantity</div>
              <div className="w-24 text-right">Total</div>
            </div>
            
            <ul className="divide-y divide-white/5">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 flex flex-col sm:flex-row items-center gap-6"
                  >
                    <Link to={`/product/${item.id}`} className="w-full sm:w-24 h-24 flex-shrink-0 bg-white/5 rounded-xl overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    
                    <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex-1 text-center sm:text-left">
                        <Link to={`/product/${item.id}`} className="text-white font-medium hover:text-primary transition-colors line-clamp-1 mb-1">
                          {item.name}
                        </Link>
                        <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-white font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="w-24 text-center sm:text-right hidden sm:block">
                          <span className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="glass-dark rounded-2xl border border-white/10 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({cart.length} items)</span>
                <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery Charge</span>
                {deliveryCharge === 0 ? (
                  <span className="text-green-400 font-medium">Free</span>
                ) : (
                  <span className="text-white font-medium">${deliveryCharge.toFixed(2)}</span>
                )}
              </div>
              {deliveryCharge > 0 && (
                <p className="text-xs text-primary bg-primary/10 p-2 rounded">
                  Add ${(50 - cartTotal).toFixed(2)} more for free delivery!
                </p>
              )}
            </div>
            
            <div className="border-t border-white/10 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="mt-6 flex justify-center gap-4 grayscale opacity-50">
              <div className="h-6 w-10 bg-white/20 rounded"></div>
              <div className="h-6 w-10 bg-white/20 rounded"></div>
              <div className="h-6 w-10 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
