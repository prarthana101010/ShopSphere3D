import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Shirt, Home as HomeIcon, Gamepad, BookOpen, Diamond, Watch, Coffee } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const categories = [
  { name: 'Electronics', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Fashion', icon: Shirt, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { name: 'Home & Kitchen', icon: HomeIcon, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Gaming', icon: Gamepad, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'Books', icon: BookOpen, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'Beauty', icon: Diamond, color: 'text-red-500', bg: 'bg-red-500/10' },
  { name: 'Accessories', icon: Watch, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Sports', icon: Coffee, color: 'text-teal-500', bg: 'bg-teal-500/10' },
];

const Home = () => {
  const trendingProducts = products.filter(p => p.rating >= 4.8).slice(0, 8);
  const flashDeals = products.filter(p => p.discount >= 25).slice(0, 4);

  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Categories Section */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Shop by Category</h2>
            <p className="text-gray-400">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group perspective"
              >
                <motion.div 
                  whileHover={{ rotateX: 10, rotateY: -10, z: 20 }}
                  className="h-full glass-dark rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-white/5 hover:border-primary/30 transition-colors"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${cat.bg} group-hover:scale-110 transition-transform`} style={{ transform: "translateZ(30px)" }}>
                    <cat.icon className={`w-8 h-8 ${cat.color}`} />
                  </div>
                  <h3 className="text-white font-medium group-hover:text-primary transition-colors" style={{ transform: "translateZ(20px)" }}>{cat.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trending Now</h2>
              <p className="text-gray-400">Discover our most popular products</p>
            </div>
            <Link to="/products" className="hidden md:block text-primary hover:text-white transition-colors">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/products" className="text-primary hover:text-white transition-colors">View All Products &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-20 bg-darker border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-red-500/5 blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-3">
                <span className="text-red-500">⚡</span> Flash Deals
              </h2>
              <p className="text-gray-400">Grab them before they're gone</p>
            </div>
            
            {/* Timer */}
            <div className="flex items-center gap-3">
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center min-w-[70px]">
                <p className="text-2xl font-bold text-red-500">{String(timeLeft.hours).padStart(2, '0')}</p>
                <p className="text-[10px] text-red-400 uppercase font-bold tracking-wider">Hours</p>
              </div>
              <span className="text-red-500 font-bold text-xl">:</span>
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center min-w-[70px]">
                <p className="text-2xl font-bold text-red-500">{String(timeLeft.minutes).padStart(2, '0')}</p>
                <p className="text-[10px] text-red-400 uppercase font-bold tracking-wider">Mins</p>
              </div>
              <span className="text-red-500 font-bold text-xl">:</span>
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-center min-w-[70px]">
                <p className="text-2xl font-bold text-red-500">{String(timeLeft.seconds).padStart(2, '0')}</p>
                <p className="text-[10px] text-red-400 uppercase font-bold tracking-wider">Secs</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
