import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ordered': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Packed': return <Package className="w-5 h-5 text-blue-500" />;
      case 'Shipped': return <Truck className="w-5 h-5 text-purple-500" />;
      case 'Delivered': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ordered': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Packed': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'Shipped': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'Delivered': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-500">
          <Package className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">No Orders Yet</h2>
        <p className="text-gray-400 mb-8">You haven't placed any orders yet.</p>
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
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order, idx) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-dark rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Order <span className="text-white font-medium">#{order.id}</span></p>
                <p className="text-gray-500 text-xs">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Total Amount</p>
                  <p className="text-white font-bold">${order.total.toFixed(2)}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <Link to={`/product/${item.id}`} className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="text-white font-medium hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-white font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Simple Tracking Timeline (Visual only) */}
            <div className="bg-white/5 p-4 md:p-6 border-t border-white/10">
              <div className="relative flex justify-between max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-0 w-1/4 h-1 bg-primary -translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white mb-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-white">Ordered</span>
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gray-500 mb-2">
                    <Package className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-gray-500">Packed</span>
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gray-500 mb-2">
                    <Truck className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-gray-500">Shipped</span>
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-gray-500 mb-2">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-gray-500">Delivered</span>
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
