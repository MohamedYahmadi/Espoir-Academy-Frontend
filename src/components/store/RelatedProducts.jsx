import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const RelatedProducts = ({ currentProductId, category }) => {
  // Filter logic: Same category, exclude current product
  const related = MOCK_PRODUCTS
    .filter(p => p.subtitle.includes(category) && p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-100">
      <h2 className="text-2xl font-bold mb-8">Produits Similaires</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group block">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative h-48 bg-gray-50 p-4">
                <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                {product.ribbon_text && (
                    <Badge className="absolute top-2 left-2 text-[10px] h-5 px-1.5 bg-black">{product.ribbon_text}</Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 truncate group-hover:text-red-600 transition-colors">{product.title}</h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.subtitle}</p>
                <p className="font-bold text-red-600">{product.variants[0].price_formatted}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;