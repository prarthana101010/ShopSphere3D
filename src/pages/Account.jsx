import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock User Data
  const user = {
    name: "Alex Doe",
    email: "alex.doe@example.com",
    phone: "+1 234 567 8900",
    memberSince: "January 2023",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop"
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package, link: '/orders' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, link: '/wishlist' },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="glass-dark rounded-2xl border border-white/10 overflow-hidden sticky top-24">
            
            {/* User Info Header */}
            <div className="p-6 text-center border-b border-white/10">
              <div className="relative inline-block mb-4 group cursor-pointer">
                <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white/10" />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400 text-sm mb-2">{user.email}</p>
              <div className="inline-block bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full border border-primary/20">
                Premium Member
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="p-2">
              <ul className="space-y-1">
                {tabs.map(tab => (
                  <li key={tab.id}>
                    {tab.link ? (
                      <Link 
                        to={tab.link}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-left text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </Link>
                    ) : (
                      <button 
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    )}
                  </li>
                ))}
                <li>
                  <button className="flex items-center gap-3 w-full p-3 rounded-xl text-left text-red-500 hover:bg-red-500/10 transition-colors mt-4">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="lg:w-3/4">
          <div className="glass-dark rounded-2xl border border-white/10 p-6 md:p-8 min-h-[500px]">
            
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                <form className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                      <input type="text" defaultValue="Alex" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input type="email" defaultValue={user.email} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                    <input type="tel" defaultValue={user.phone} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                  
                  <div className="pt-4">
                    <button type="button" className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'addresses' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Saved Addresses</h2>
                  <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                    Add New
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-primary/50 rounded-xl p-4 relative">
                    <div className="absolute top-4 right-4 bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">DEFAULT</div>
                    <h3 className="text-white font-medium mb-1">Home</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      123 Tech Boulevard, Apt 4B<br />
                      Innovation City, CA 90210<br />
                      United States
                    </p>
                    <div className="flex gap-3 text-sm">
                      <button className="text-primary hover:text-white transition-colors">Edit</button>
                      <button className="text-red-500 hover:text-red-400 transition-colors">Delete</button>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h3 className="text-white font-medium mb-1">Office</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      456 Business Park, Suite 100<br />
                      Metropolis, NY 10001<br />
                      United States
                    </p>
                    <div className="flex gap-3 text-sm">
                      <button className="text-primary hover:text-white transition-colors">Edit</button>
                      <button className="text-red-500 hover:text-red-400 transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'payment' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
                  <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                    Add New Card
                  </button>
                </div>
                
                <div className="space-y-4 max-w-xl">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 rounded-xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white italic">VISA</span>
                      </div>
                      <div>
                        <p className="text-white font-medium tracking-widest">•••• •••• •••• 4242</p>
                        <p className="text-gray-400 text-xs">Expires 12/28</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-400 transition-colors text-sm">Remove</button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 rounded-xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">MC</span>
                      </div>
                      <div>
                        <p className="text-white font-medium tracking-widest">•••• •••• •••• 5555</p>
                        <p className="text-gray-400 text-xs">Expires 08/26</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-400 transition-colors text-sm">Remove</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                
                <div className="space-y-6 max-w-2xl">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium mb-1">Email Notifications</h3>
                      <p className="text-gray-400 text-sm">Receive emails about new products and promotions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium mb-1">Order Updates</h3>
                      <p className="text-gray-400 text-sm">Get SMS notifications about your order status</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium mb-1">Dark Mode</h3>
                      <p className="text-gray-400 text-sm">ShopSphere 3D is always in dark mode for the best experience.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-not-allowed opacity-50">
                      <input type="checkbox" className="sr-only peer" defaultChecked disabled />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-red-500 font-medium mb-2">Danger Zone</h3>
                    <p className="text-gray-400 text-sm mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                      Delete Account
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Account;
