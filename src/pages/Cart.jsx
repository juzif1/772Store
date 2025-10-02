/* === M2: Code Documentation === Cart page: list items, qty update, remove, total price === */

import { useCart } from '../state/CartContext.jsx' // custom hook

// Page: shows cart items and total; allows qty changes and remove
export default function Cart() { 
  const { state, dispatch, total } = useCart() // custom hook from context
  if (!state.items.length) return <p>Your cart is empty.</p>
  return (
    <section>
      {state.items.map(i => (
        <div key={i.id} className="row">
          <span>{i.title}</span>
          <input type="number" min="1" value={i.qty}
           onChange={(e)=>// update quantity
dispatch({type:'qty', id:i.id, qty:Number(e.target.value)})}/>
          <button onClick={()=>// remove item from the cart
dispatch({type:'remove', id:i.id})}>Remove</button>
          <span>€{(i.price*i.qty).toFixed(2)}</span>
        </div>
      ))}
      <hr/>
      <strong>Total: €{total.toFixed(2)}</strong>
    </section>
  )
}
