import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, Tag, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    formatPrice,
    applyCoupon,
    removeCoupon,
    appliedCoupon
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  const { subtotal, discountAmount, total, cartCount } = getCartTotal();

  const handleApplyCoupon = () => {
    if (!promoInput.trim()) return;
    const result = applyCoupon(promoInput);
    setPromoMessage({ type: result.success ? 'success' : 'error', text: result.message });
    if (result.success) setPromoInput('');
    
    // Clear message after 3 seconds
    setTimeout(() => setPromoMessage(null), 3000);
  };

  return (
    <>
      {/* Toggle Button (Floating) - visible only when closed if desired, or part of header. 
          Assuming Header handles opening, but here is a safe guard if header fails or for mobile FAB */}
      <AnimatePresence>
        {!isCartOpen && cartCount > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
             <ShoppingBag size={24} />
             <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
               {cartCount}
             </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay & Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b flex items-center justify-between bg-white">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="text-red-600" /> Mon Panier ({cartCount})
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-grow overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                    <ShoppingBag size={64} className="opacity-20" />
                    <p className="text-lg font-medium">Votre panier est vide</p>
                    <Button onClick={() => setIsCartOpen(false)} variant="outline">Continuer mes achats</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <motion.div 
                        layout
                        key={`${item.product.id}-${item.variant.id}`}
                        className="flex gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100"
                      >
                        <div className="h-24 w-24 flex-shrink-0 bg-white rounded-lg p-2 border border-gray-200">
                          <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain" />
                        </div>
                        
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-sm line-clamp-1">{item.product.title}</h4>
                              <button 
                                onClick={() => removeFromCart(item.product.id, item.variant.id)}
                                className="text-gray-400 hover:text-red-600 transition"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500">{item.product.subtitle} | {item.variant.title}</p>
                          </div>
                          
                          <div className="flex justify-between items-end">
                            <div className="flex items-center bg-white border border-gray-200 rounded-lg h-8">
                               <button onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)} className="px-2 hover:bg-gray-100 h-full rounded-l-lg"><Minus size={12}/></button>
                               <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)} className="px-2 hover:bg-gray-100 h-full rounded-r-lg"><Plus size={12}/></button>
                            </div>
                            <div className="text-right">
                               <span className="font-bold text-red-600 text-sm">
                                 {formatPrice((item.variant.sale_price_in_cents || item.variant.price_in_cents) * item.quantity)}
                               </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer / Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-gray-50 border-t">
                   {/* Promo Code */}
                   <div className="mb-4">
                      {!appliedCoupon ? (
                        <div className="flex gap-2">
                          <div className="relative flex-grow">
                             <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
                             <Input 
                               placeholder="Code Promo" 
                               className="pl-9 bg-white"
                               value={promoInput}
                               onChange={(e) => setPromoInput(e.target.value)}
                             />
                          </div>
                          <Button variant="secondary" onClick={handleApplyCoupon}>Appliquer</Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm border border-green-200">
                           <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} />
                             <span>Code <strong>{appliedCoupon.code}</strong> appliqué</span>
                           </div>
                           <button onClick={removeCoupon} className="text-xs underline hover:text-green-900">Retirer</button>
                        </div>
                      )}
                      {promoMessage && (
                        <p className={`text-xs mt-1 ml-1 ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                          {promoMessage.text}
                        </p>
                      )}
                   </div>

                   {/* Totals */}
                   <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Sous-total</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600 font-medium">
                          <span>Réduction ({appliedCoupon.description})</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                   </div>

                   <Button className="w-full bg-black hover:bg-red-600 text-white h-12 text-lg shadow-lg transition-all transform hover:-translate-y-1">
                     Passer la commande
                   </Button>
                   
                   <div className="text-center mt-2">
                      <Link to="/store" onClick={() => setIsCartOpen(false)} className="text-xs text-gray-500 hover:underline">
                        Continuer mes achats
                      </Link>
                   </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShoppingCart;