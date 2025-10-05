/* M2: Code Documentation === This code snippet is a test suite for the `ProductCard` component using React Testing Library. */

// tests/ProductCard.test.jsx
import React from 'react' 
import { render, screen, fireEvent } from '@testing-library/react'

// Context Providers
import { CartProvider } from '../src/state/CartContext.jsx'
import { WishlistProvider } from '../src/state/WishlistContext.jsx'
import ProductCard from '../src/components/ProductCard.jsx'

function renderWithProviders(ui) {
  return render(
    <CartProvider>
      <WishlistProvider>{ui}</WishlistProvider>
    </CartProvider>
  )
}

describe('ProductCard', () => {
  it('renders title & price and reacts to clicks', () => {
    const product = { id: 1, title: 'Test Product', price: 9.99, image: '' }

    renderWithProviders(<ProductCard product={product} />)

    // renders title and price
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('€9.99')).toBeInTheDocument()

    // buttons respond to clicks
    const addBtn = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(addBtn)
    expect(addBtn).toHaveTextContent(/added ✓/i)

    const heartBtn = screen.getByLabelText(/toggle wishlist/i) // heart button
    fireEvent.click(heartBtn)
    expect(heartBtn.textContent === '♥' || heartBtn.textContent === '♡').toBe(true)
  })
})