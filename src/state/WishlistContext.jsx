/* === M2: Code Documentation === WishlistContext: global wishlist with toggle + localStorage === */

import { createContext, useContext, useEffect, useMemo, useState } from "react"; 

const WishlistContext = createContext(null); 

export function WishlistProvider({ children }) {
  // keep wishlist in localStorage
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(items));
    } catch {}
  }, [items]);

  function add(item) {
    // avoid duplicates by id
    if (!items.find((p) => p.id === item.id)) {
      setItems((prev) => [...prev, item]);
    }
  }
  function remove(id) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }
  function toggle(item) {
    if (items.find((p) => p.id === item.id)) remove(item.id);
    else add(item);
  }

  const value = useMemo(() => ({
    items, add, remove, toggle,
  }), [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() { // custom hook to use the wishlist context
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}