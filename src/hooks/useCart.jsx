import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const COUPONS = {
  'WELCOME10': { type: 'percent', value: 0.10, description: '10% de réduction' },
  'SPORTS20': { type: 'percent', value: 0.20, description: '20% de réduction' },
  'BEJA2025': { type: 'percent', value: 0.15, description: '15% de réduction spéciale' },
  'MINUS5': { type: 'fixed', value: 500, description: '5.00 DT offerts' }, // Value in cents
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Cart state is in-memory only (no localStorage persistence)
  const [cartItems, setCartItems] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const addToCart = (product, variant, quantity = 1, maxStock = 100) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.variant.id === variant.id
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        const newQuantity = Math.min(newItems[existingItemIndex].quantity + quantity, maxStock);
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity
        };
        return newItems;
      } else {
        return [...prevItems, { product, variant, quantity: Math.min(quantity, maxStock) }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, variantId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.product.id === productId && item.variant.id === variantId))
    );
  };

  const updateQuantity = (productId, variantId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.product.id === productId && item.variant.id === variantId) {
          const maxStock = item.variant.inventory_quantity || 100;
          return { ...item, quantity: Math.min(newQuantity, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const applyCoupon = (code) => {
    const upperCode = code.toUpperCase();
    if (COUPONS[upperCode]) {
      setAppliedCoupon({ code: upperCode, ...COUPONS[upperCode] });
      setCouponCode(upperCode);
      return { success: true, message: `Code ${upperCode} appliqué !` };
    } else {
      setAppliedCoupon(null);
      return { success: false, message: "Code promo invalide." };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const getCartTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
      return total + (price * item.quantity);
    }, 0);

    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') {
        discountAmount = subtotal * appliedCoupon.value;
      } else if (appliedCoupon.type === 'fixed') {
        discountAmount = appliedCoupon.value;
      }
    }
    
    // Ensure total doesn't go below zero
    const total = Math.max(0, subtotal - discountAmount);

    return {
      subtotal,
      discountAmount,
      total,
      cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0)
    };
  };

  const formatPrice = (cents) => {
    return (cents / 100).toFixed(2) + ' DT';
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      applyCoupon,
      removeCoupon,
      appliedCoupon,
      couponCode,
      getCartTotal,
      formatPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};