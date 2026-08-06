// ============================================================
// BOUTIQUE FEATURE - DISABLED (commented out)
// This file is preserved for future re-enabling.
// To re-enable: uncomment the StorePage import + route in App.jsx
// and the "Boutique" nav links in Header.jsx.
// ============================================================
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product, onAddToCart, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all group"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
        <div className="absolute top-4 right-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-red-600">{product.price} DT</span>
          <span className="text-sm text-gray-600">Stock: {product.stock}</span>
        </div>

        <Button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="w-full bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock > 0 ? 'Ajouter au Panier' : 'Rupture de Stock'}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;