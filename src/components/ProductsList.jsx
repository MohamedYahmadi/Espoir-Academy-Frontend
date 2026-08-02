import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Loader2, Filter, X, Search, Heart, Eye, Trophy, Activity, Dumbbell, Zap, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useToast } from '@/components/ui/use-toast';
import { MOCK_PRODUCTS } from '@/data/mockData';
import QuickViewModal from '@/components/store/QuickViewModal';

const CATEGORIES = [
  { id: 'all', label: 'Tout', icon: <Zap size={18} />, color: 'bg-gray-900' },
  { id: 'football', label: 'Football', icon: <Trophy size={18} />, color: 'bg-green-600', keywords: ['football'] },
  { id: 'basketball', label: 'Basketball', icon: <Activity size={18} />, color: 'bg-orange-600', keywords: ['basketball'] },
  { id: 'tennis', label: 'Tennis', icon: <Dumbbell size={18} />, color: 'bg-yellow-500', keywords: ['tennis'] }
];

// Helper to extract unique brands
const getBrands = (products) => {
  const brands = new Set(products.map(p => p.brand).filter(Boolean));
  return Array.from(brands).sort();
};

const ProductCard = ({ product, index, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isFavorite = isInWishlist(product.id);
  const displayVariant = product.variants[0];
  const hasSale = displayVariant.sale_price_in_cents !== null;
  const price = hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted;
  const oldPrice = hasSale ? displayVariant.price_formatted : null;
  const stock = product.variants.reduce((acc, v) => acc + v.inventory_quantity, 0);
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants.length > 1) {
      navigate(`/product/${product.id}`);
      return;
    }
    try {
      await addToCart(product, displayVariant, 1, displayVariant.inventory_quantity);
      toast({ title: "Ajouté au panier ! 🛒", description: `${product.title} a été ajouté.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110" 
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.ribbon_text && <Badge className="bg-black text-white">{product.ribbon_text}</Badge>}
          {hasSale && <Badge variant="destructive">PROMO</Badge>}
          {stock === 0 && <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-300">ÉPUISÉ</Badge>}
        </div>

        {/* Actions Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className={`p-2 rounded-full bg-white shadow-md hover:scale-110 transition ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
            <Heart size={18} className={isFavorite ? "fill-current" : ""} />
          </button>
          <button onClick={(e) => { e.preventDefault(); onQuickView(product); }} className="p-2 rounded-full bg-white shadow-md hover:scale-110 transition text-gray-600 hover:text-blue-600">
            <Eye size={18} />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <div className="flex justify-between items-start">
             <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
             <div className="flex items-center text-yellow-400 text-xs gap-1">
               <Star size={12} className="fill-current"/> {product.rating}
             </div>
          </div>
          <Link to={`/product/${product.id}`} className="font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-1">
            {product.title}
          </Link>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
           <div className="flex flex-col">
             <span className="font-bold text-lg text-red-600">{price}</span>
             {hasSale && <span className="text-xs text-gray-400 line-through">{oldPrice}</span>}
           </div>
           <Button 
             size="sm" 
             disabled={stock === 0}
             onClick={handleAddToCart} 
             className="rounded-full w-10 h-10 p-0 bg-black hover:bg-red-600 transition-colors disabled:bg-gray-200"
           >
             <ShoppingCart size={16} />
           </Button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  
  // Filter States
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]); // 0 to 500 DT
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { addToCart } = useCart();
  const { toast } = useToast();

  // Derived Data
  const allBrands = useMemo(() => getBrands(MOCK_PRODUCTS), []);

  // Initial Load
  useEffect(() => {
    setLoading(false);
    setProducts(MOCK_PRODUCTS);
  }, []);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category
    if (activeCategory !== 'all') {
      const cat = CATEGORIES.find(c => c.id === activeCategory);
      if (cat) {
        result = result.filter(p => p.subtitle.toLowerCase().includes(cat.keywords[0]));
      }
    }

    // 2. Search
    if (searchQuery) {
      result = result.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // 3. Price Range (Convert cents to units for comparison approx)
    result = result.filter(p => {
      const price = (p.variants[0].sale_price_in_cents || p.variants[0].price_in_cents) / 100;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // 4. Brands
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // 5. Rating
    if (minRating > 0) {
      result = result.filter(p => (p.rating || 0) >= minRating);
    }

    // 6. Stock
    if (inStockOnly) {
      result = result.filter(p => {
        const totalStock = p.variants.reduce((acc, v) => acc + v.inventory_quantity, 0);
        return totalStock > 0;
      });
    }

    // 7. Sort
    switch(sortOption) {
      case 'price-asc':
        result.sort((a, b) => (a.variants[0].sale_price_in_cents || a.variants[0].price_in_cents) - (b.variants[0].sale_price_in_cents || b.variants[0].price_in_cents));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.variants[0].sale_price_in_cents || b.variants[0].price_in_cents) - (a.variants[0].sale_price_in_cents || a.variants[0].price_in_cents));
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id)); 
        break;
      default: 
        break;
    }

    return result;
  }, [products, activeCategory, searchQuery, sortOption, priceRange, selectedBrands, minRating, inStockOnly]);

  const handleQuickAdd = async () => {
    if (!quickViewProduct) return;
    try {
      const variant = quickViewProduct.variants[0];
      await addToCart(quickViewProduct, variant, 1, variant.inventory_quantity);
      toast({ title: "Ajouté au panier ! 🛒", description: `${quickViewProduct.title} ajouté.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-red-600" /></div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative">
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button onClick={() => setIsFilterOpen(!isFilterOpen)} variant="outline" className="w-full flex justify-between">
          <span className="flex items-center gap-2"><Filter size={16}/> Filtres</span>
          <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">{filteredProducts.length}</span>
        </Button>
      </div>

      {/* Sidebar Filters */}
      <div className={`
        lg:w-64 flex-shrink-0 space-y-8
        ${isFilterOpen ? 'block' : 'hidden lg:block'}
      `}>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-lg">Filtres</h3>
             <button onClick={() => {
               setPriceRange([0, 500]);
               setSelectedBrands([]);
               setMinRating(0);
               setInStockOnly(false);
             }} className="text-xs text-red-600 hover:underline">Réinitialiser</button>
          </div>

          {/* Price Slider */}
          <div className="space-y-4">
            <Label>Prix ({priceRange[0]}DT - {priceRange[1]}DT)</Label>
            <Slider 
              value={priceRange} 
              min={0} 
              max={500} 
              step={10} 
              onValueChange={setPriceRange} 
            />
          </div>

          {/* Stock Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="stock" 
              checked={inStockOnly} 
              onCheckedChange={setInStockOnly} 
            />
            <Label htmlFor="stock">En stock uniquement</Label>
          </div>

          {/* Brands */}
          <div className="space-y-3">
            <Label>Marques</Label>
            <div className="space-y-2">
              {allBrands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`} 
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="font-normal cursor-pointer">{brand}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <Label>Note Minimum</Label>
            <div className="space-y-2">
               {[4, 3, 2, 1].map(star => (
                 <div key={star} className="flex items-center space-x-2">
                   <Checkbox 
                      id={`star-${star}`} 
                      checked={minRating === star}
                      onCheckedChange={(checked) => setMinRating(checked ? star : 0)}
                   />
                   <Label htmlFor={`star-${star}`} className="flex items-center cursor-pointer">
                     {star}+ <Star size={12} className="fill-yellow-400 text-yellow-400 ml-1" />
                   </Label>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-8">
        {/* Controls Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id 
                    ? `${cat.color} text-white shadow-md` 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
             {/* Search */}
             <div className="relative flex-grow md:flex-grow-0 md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
               <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-100 outline-none"
               />
             </div>

             {/* Sort */}
             <Select value={sortOption} onValueChange={setSortOption}>
               <SelectTrigger className="w-[160px]">
                 <SelectValue placeholder="Trier par" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="featured">Populaire</SelectItem>
                 <SelectItem value="newest">Nouveautés</SelectItem>
                 <SelectItem value="price-asc">Prix: Bas - Haut</SelectItem>
                 <SelectItem value="price-desc">Prix: Haut - Bas</SelectItem>
               </SelectContent>
             </Select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={idx} 
                onQuickView={setQuickViewProduct} 
              />
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
           <div className="text-center py-20 text-gray-500">
             <p className="text-lg">Aucun produit ne correspond à votre sélection.</p>
             <Button variant="link" onClick={() => { setActiveCategory('all'); setSearchQuery(''); setPriceRange([0, 500]); }} className="text-red-600">
                Réinitialiser les filtres
             </Button>
           </div>
        )}
      </div>

      <QuickViewModal 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleQuickAdd}
      />
    </div>
  );
};

export default ProductsList;