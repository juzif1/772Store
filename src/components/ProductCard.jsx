/* === M2: Code Documentation === One product card UI + add-to-cart + heart === */

// src/components/ProductCard.jsx and WishlistContext.jsx
import { useState, useMemo } from 'react'
import { useCart } from '../state/CartContext.jsx'
import { useWishlist } from '../state/WishlistContext.jsx'

function toProxy(url) {
  try { 
    if (!url) return ''; 
    const clean = url.replace(/^https?:\/\//,''); 
    return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}` } 
    catch { 
      return '' 
    }
}

// UI: one product card with image, title, price and add-to-cart
export default function ProductCard({ product }) { // component start
  const { dispatch } = useCart() // Get cart dispatch function from context
  const { items: wishItems, toggle } = useWishlist() // Get wishlist items and toggle function from context

  // Check if the image URL is external (starts with http:// or https://)
  const isExternal = /^https?:\/\//i.test(product?.image || '')
  const [useProxy, setUseProxy] = useState(() => isExternal) // Start using proxy if external
  const [fallback, setFallback] = useState(false) // Fallback to placeholder on error
  const [added, setAdded] = useState(false) // Added to cart feedback
  const [hover, setHover] = useState(false) // Hover state for button

  const inWishlist = !!wishItems.find(p => p.id === product.id) // Check if in wishlist

  const imgSrc = useMemo(() => {
    if (fallback) return '/images/placeholder.png' // Fallback placeholder image if error occurred 
    const src = product?.image || ''
    return useProxy ? toProxy(src) : src
  }, [product?.image, useProxy, fallback])

  function add() { 
    // add current product to the cart
    dispatch({ type: 'add', item: product }) 
    setAdded(true); setTimeout(() => setAdded(false), 900) // Reset added state after 900ms
  }

  return (
    <article className="card" style={{ position:'relative' }}>
      {/* Wishlist toggle button with heart icon and shadow if in wishlist */}
      <button
        aria-label="toggle wishlist"
        onClick={() => toggle(product)}
        style={{
          position:'absolute', top:8, right:8,
          border:'none', background:'transparent',
          fontSize:20, cursor:'pointer', lineHeight:1,
          filter: inWishlist ? 'drop-shadow(0 0 6px rgba(255,0,0,.6))' : 'none'
        }}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {inWishlist ? '♥' : '♡'}
      </button>

      <img // Product image with lazy loading and error handling
        src={imgSrc}
        alt={product.title}
        loading="lazy"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => { if (!useProxy && /^https?:\/\//.test(product?.image||'')) setUseProxy(true); else setFallback(true); }}
        style={{ background:'#0f0f0f', borderRadius:8, display:'block' }}
      />
      <h3 /* Product title */> {product.title}</h3>
      <p /* Product Price */> €{Number(product.price).toFixed(2)}</p>

     {/* Add to cart button with hover and added state */}
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={add}
        disabled={added}
      >
        {added ? 'Added ✓' : hover ? 'Add 🛒' : 'Add to Cart'}
      </button>
    </article>
  )
}