import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

const WishlistContext = createContext();

// ============================================================
// BOUTIQUE / WISHLIST FEATURE - DISABLED (commented out)
// To re-enable: uncomment the storage key below and the
// localStorage initialization + persistence useEffect.
// ============================================================
// const WISHLIST_STORAGE_KEY = 'e-commerce-wishlist';

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // ============================================================
  // BOUTIQUE / WISHLIST FEATURE - DISABLED (commented out)
  // To re-enable: uncomment the localStorage initialization below
  // ============================================================
  // const [wishlistItems, setWishlistItems] = useState(() => {
  //   try {
  //     const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
  //     return stored ? JSON.parse(stored) : [];
  //   } catch (error) {
  //     return [];
  //   }
  // });

  // Wishlist state is in-memory only (no localStorage persistence)
  const [wishlistItems, setWishlistItems] = useState([]);

  // ============================================================
  // BOUTIQUE / WISHLIST FEATURE - DISABLED (commented out)
  // To re-enable: uncomment this useEffect to persist wishlist to localStorage
  // ============================================================
  // useEffect(() => {
  //   localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  // }, [wishlistItems]);

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