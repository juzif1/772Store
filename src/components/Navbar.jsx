/* === M2: Code Documentation === Top navigation with links and cart counter === */

import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../state/CartContext.jsx'
import { useWishlist } from '../state/WishlistContext.jsx'

// UI: top navigation bar with links and cart counter
export default function Navbar() {
  const { state } = useCart() // Get cart state from context
  const { items: wishItems } = useWishlist() // Get wishlist items from context
  const count = state.items.reduce((s, i) => s + i.qty, 0)

  return (
    <nav>
      <div className="inner">
        <Link to="/" style={{ fontWeight: 700 }}>🎮 Gamer Store</Link>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/wishlist">Wishlist ({wishItems.length})</NavLink>
        <NavLink to="/cart">Cart ({count})</NavLink>
      </div>
    </nav>
  )
}