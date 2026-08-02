import React from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, CheckCircle, ArrowRight } from 'lucide-react';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!product) return null;

  const displayVariant = product.variants[0];
  const hasSale = displayVariant.sale_price_in_cents !== null;
  const price = hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted;
  const oldPrice = hasSale ? displayVariant.price_formatted : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[90vw] p-0 overflow-hidden bg-white rounded-xl">
        <div className="grid md:grid-cols-2 h-full">
          {/* Image Side */}
          <div className="bg-gray-50 p-8 flex items-center justify-center relative">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-64 object-contain"
            />
            {product.ribbon_text && (
              <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700">{product.ribbon_text}</Badge>
            )}
          </div>

          {/* Content Side */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left mb-4">
              <DialogTitle className="text-xl font-bold">{product.title}</DialogTitle>
              <p className="text-sm text-gray-500">{product.subtitle}</p>
            </DialogHeader>

            {/* Ratings */}
            <div className="flex items-center gap-1 mb-4">
               {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
               <span className="text-xs text-gray-500 ml-2">(4.8/5)</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-2xl font-bold text-red-600">{price}</span>
              {hasSale && <span className="ml-2 text-sm text-gray-400 line-through">{oldPrice}</span>}
            </div>

            {/* Description Snippet */}
            <div className="text-sm text-gray-600 mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: product.description }} />

            <div className="mt-auto space-y-3">
               <Button onClick={() => { onAddToCart(); onClose(); }} className="w-full bg-black hover:bg-red-600 text-white gap-2">
                 <ShoppingCart size={16} /> Ajouter au Panier
               </Button>
               <Link to={`/product/${product.id}`} className="block w-full">
                 <Button variant="outline" className="w-full gap-2">
                    Voir les détails <ArrowRight size={16} />
                 </Button>
               </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;