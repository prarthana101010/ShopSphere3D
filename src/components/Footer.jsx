import { Link } from 'react-router-dom';
import { Box, Globe, MessageCircle, Camera, Video, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-darker border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <Box className="text-primary w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                ShopSphere <span className="text-primary">3D</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Experience the future of e-commerce. Discover premium products in a new dimension with our interactive 3D shopping platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-colors">
                <Video className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-gray-400 hover:text-primary transition-colors text-sm">All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="text-gray-400 hover:text-primary transition-colors text-sm">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="text-gray-400 hover:text-primary transition-colors text-sm">Fashion</Link></li>
              <li><Link to="/products?category=Home" className="text-gray-400 hover:text-primary transition-colors text-sm">Home & Kitchen</Link></li>
              <li><Link to="/products?category=Gaming" className="text-gray-400 hover:text-primary transition-colors text-sm">Gaming</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Careers</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest products and exclusive offers.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full text-sm text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-colors flex items-center justify-center"
              >
                <Mail className="w-4 h-4" />
              </button>
            </form>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Innovation Drive, Tech City</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ShopSphere 3D. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Mock payment icons */}
            <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-400">VISA</div>
            <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-400">MC</div>
            <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-400">AMEX</div>
            <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-gray-400">PP</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
