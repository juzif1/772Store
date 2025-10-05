/* === M2: Code Documentation === Simple welcome page (start of the store) === */

import { Link } from 'react-router-dom'

// Page: simple welcome / landing page
export default function Home() {
  return (
    <section className="container">
      <h1>Welcome to 772 Store 🎮</h1>
      <p>Find gaming monitors, PCs, headsets, and some Laptops and Smartsphones in one place.</p>
      <p><Link to="/products">Browse products →</Link></p>
    </section>
  )
}
