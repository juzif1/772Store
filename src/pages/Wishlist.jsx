/* === M2: Code Documentation === Wishlist page: saved items, move/remove === */

import { useWishlist } from "../state/WishlistContext.jsx"
import { useCart } from "../state/CartContext.jsx"

export default function Wishlist() {
  const { items, remove } = useWishlist()
  const { dispatch } = useCart()

  if (!items.length) return <p>Your wishlist is empty.</p>

  return (
    <section className="grid">
      {items.map(p => (
        <article key={p.id} className="card">
          <img src={p.image} alt={p.title} />
          <h3>{p.title}</h3>
          <p>€{Number(p.price).toFixed(2)}</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem' }}>
            <button onClick={() => dispatch({ type:'add', item:p })}>Add to Cart</button>
            <button onClick={() => remove(p.id)}>Remove ♥</button>
          </div>
        </article>
      ))}
    </section>
  )
}
