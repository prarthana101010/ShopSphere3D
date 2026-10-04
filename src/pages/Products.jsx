import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products as allProducts } from '../data/products';

const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Gaming', 'Books', 'Beauty', 'Accessories', 'Sports'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(1000);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState('recommended');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update URL when category or search changes
  useEffect(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (category !== 'All') params.category = category;
    setSearchParams(params);
  }, [searchQuery, category, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Price filter
    result = result.filter(p => p.price <= priceRange);

    // Rating filter
    if (rating > 0) {
      result = result.filter(p => p.rating >= rating);
    }

    // Sort
    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Mock newest (using ID string comparison roughly)
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'recommended':
      default:
        // Mock recommended (just randomize a bit based on length or keep original)
        break;
    }

    return result;
  }, [searchQuery, category, priceRange, rating, sort]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : category !== 'All' ? category : 'All Products'}
        </h1>
        <p className="text-gray-400">Showing {filteredProducts.length} results</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none appearance-none"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

        {/* Sidebar Filters */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-darker border-r border-white/10 p-6 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-1/4 lg:bg-transparent lg:border-none lg:p-0 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="glass-dark rounded-2xl p-6 border border-white/5 space-y-8 h-full lg:h-auto overflow-y-auto lg:overflow-visible">
            
            {/* Search within filter */}
            <div>
              <h3 className="text-white font-semibold mb-4">Search</h3>
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setCategory(cat)}
                      className={`text-sm w-full text-left transition-colors ${category === cat ? 'text-primary font-medium' : 'text-gray-400 hover:text-white'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex justify-between">
                <span>Max Price</span>
                <span className="text-primary">${priceRange}</span>
              </h3>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-white font-semibold mb-4">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(r => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="rating" 
                      checked={rating === r}
                      onChange={() => setRating(r)}
                      className="accent-primary"
                    />
                    <span className="text-sm text-gray-300">{r} Stars & Up</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="rating" 
                    checked={rating === 0}
                    onChange={() => setRating(0)}
                    className="accent-primary"
                  />
                  <span className="text-sm text-gray-300">Any Rating</span>
                </label>
              </div>
            </div>

            {/* Clear Filters */}
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategory('All');
                setPriceRange(1000);
                setRating(0);
              }}
              className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-2 rounded-lg transition-colors border border-white/10"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Desktop Sort */}
          <div className="hidden lg:flex justify-between items-center mb-8 bg-white/5 border border-white/10 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Showing {filteredProducts.length} products</p>
            
            <div className="flex items-center gap-3 relative">
              <span className="text-sm text-gray-400">Sort by:</span>
              <div className="relative">
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-dark border border-white/10 rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setCategory('All');
                }}
                className="mt-4 text-primary hover:text-white transition-colors"
              >
                Clear search and filters
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Products;
