/* === M2: Code Documentation === Global cart state using Context + useReducer === */

import { createContext, useContext, useReducer, useMemo } from 'react'

const CartContext = createContext(null)

// Reducer: handles cart actions (add/remove/qty/clear)
function reducer(state, action) {
  switch (action.type) {
    case 'add': { // add item to cart or increase qty if already exists
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        }
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case 'remove': // remove item from cart
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'qty': // set item quantity
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i) }
    case 'clear': // clear all items from cart
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const total = // Memo: compute filtered/sorted list only when inputs change
useMemo(() => state.items.reduce((s, i) => s + Number(i.price) * i.qty, 0), [state.items])
  const value = // Memo: compute filtered/sorted list only when inputs change
useMemo(() => ({ state, dispatch, total }), [state, total])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook to access the global cart context anywhere
export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
