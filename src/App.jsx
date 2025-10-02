/* === M2: Code Documentation === Main app routes and layout (Navbar, pages, Footer) === */

// Router imports: used to define page routes
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'
import NotFound from './pages/NotFound.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Wishlist from './pages/Wishlist.jsx'

// Root component that wires the navbar, footer and page routes
export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        {/* Routes: map URL paths to page components */}
<Routes>
<Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
