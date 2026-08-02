import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // Wishlist state is in-memory only (no localStorage persistence)
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = useCallback((product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const toggleWishlist = useCallback((product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      return false; // Removed
    } else {
      addToWishlist(product);
      return true; // Added
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  const value = useMemo(() => ({
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  }), [wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};