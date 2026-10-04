import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const deliveryCharge = cartTotal > 0 && cartTotal < 50 ? 10 : 0;
  const finalTotal = cartTotal + deliveryCharge;

  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [cart.length, isSuccess, navigate]);

  if (cart.length === 0 && !isSuccess) {
    return null;
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    
    // Save to mock orders (localStorage)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      items: [...cart],
      total: finalTotal,
      status: 'Ordered'
    };
    localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));
    
    setOrderId(newOrderId);
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Order Placed Successfully!</h2>
        <p className="text-gray-400 mb-2">Thank you for shopping at ShopSphere 3D.</p>
        <p className="text-white font-medium mb-8 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
          Order ID: <span className="text-primary">{orderId}</span>
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/orders')}
            className="glass hover:bg-white/10 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            View Orders
          </button>
          <button 
            onClick={() => navigate('/products')}
            className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
      
      {/* Steps Indicator */}
      <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
        <div className="flex items-center w-full">
          <div className={`flex flex-col items-center relative z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${step >= 1 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>
              <MapPin className="w-4 h-4" />
            </div>
            <span className={`text-xs font-medium ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Address</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`}></div>
          
          <div className={`flex flex-col items-center relative z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${step >= 2 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className={`text-xs font-medium ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Summary</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-white/10'}`}></div>
          
          <div className={`flex flex-col items-center relative z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${step >= 3 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>
              <CreditCard className="w-4 h-4" />
            </div>
            <span className={`text-xs font-medium ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>Payment</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        <div className="lg:w-2/3">
          <div className="glass-dark rounded-2xl border border-white/10 p-6 md:p-8">
            
            {/* Step 1: Address */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Delivery Address</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                      <input type="text" required defaultValue="John" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                      <input type="text" required defaultValue="Doe" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input type="email" required defaultValue="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Street Address</label>
                    <input type="text" required defaultValue="123 Tech Boulevard" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                      <input type="text" required defaultValue="Innovation City" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">State</label>
                      <input type="text" required defaultValue="CA" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Zip Code</label>
                      <input type="text" required defaultValue="90210" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                      Continue to Summary <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Order Summary */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white transition-colors">
                    Back to Address
                  </button>
                  <button onClick={() => setStep(3)} className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                    Continue to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                <form onSubmit={handlePlaceOrder}>
                  <div className="space-y-4 mb-8">
                    
                    <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="card" defaultChecked className="w-5 h-5 accent-primary" />
                        <div>
                          <p className="text-white font-medium">Credit / Debit Card</p>
                          <p className="text-gray-400 text-xs">Visa, MasterCard, Amex</p>
                        </div>
                      </div>
                      <CreditCard className="w-6 h-6 text-gray-400" />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="upi" className="w-5 h-5 accent-primary" />
                        <div>
                          <p className="text-white font-medium">UPI / Digital Wallet</p>
                          <p className="text-gray-400 text-xs">Google Pay, Apple Pay, etc.</p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="cod" className="w-5 h-5 accent-primary" />
                        <div>
                          <p className="text-white font-medium">Cash on Delivery</p>
                          <p className="text-gray-400 text-xs">Pay when you receive</p>
                        </div>
                      </div>
                    </label>

                  </div>
                  
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8 text-sm text-blue-200">
                    <strong>Demo Note:</strong> No actual payment will be processed. Clicking "Place Order" will generate a mock order.
                  </div>

                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <button type="button" onClick={() => setStep(2)} className="text-gray-400 hover:text-white transition-colors">
                      Back to Summary
                    </button>
                    <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2">
                      Place Order (${finalTotal.toFixed(2)})
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

          </div>
        </div>

        {/* Mini Summary Sidebar */}
        <div className="lg:w-1/3">
          <div className="glass-dark rounded-2xl border border-white/10 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4">Total Amount</h3>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Items ({cart.length})</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery</span>
                <span className="text-white">{deliveryCharge === 0 ? 'Free' : `$${deliveryCharge.toFixed(2)}`}</span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
