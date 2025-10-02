/* === M2: Code Documentation === Products page: load from API/local, search, sort, grid === */

import { useEffect, useState, useMemo } from 'react' 
import axios from 'axios' 
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { gamerProducts } from '../data/gamerProducts.js'

// Page: shows products list with search/sort and data source (both/api/local)
export default function Products() {
  // State: data source (both/api/local)
const [source, setSource] = useState('both')
  // State current list of products shown in the page
const [products, setProducts] = useState([])
  // State loading indicator while fetching data
const [loading, setLoading] = useState(true)
  // State keeps error message if the API fails
const [error, setError] = useState('')
  // State search text typed by the user
const [query, setQuery] = useState('')
  // State selected sorting option
const [sort, setSort] = useState('relevance') // price-asc / price-desc / name-asc

// Effect run when component mounts or dependencies change
useEffect(() => {
  let mounted = true
  setLoading(true)   // if source === 'api' → fetch from DummyJSON
                     // if source === 'local' → use GamerProducts
                     // if source === 'both' → merge both arrays
  setError('')

  const load = async () => {
    try {
      if (source === 'local') {
        if (mounted) setProducts(gamerProducts) 
      } else if (source === 'api') { 
    // fetch from DummyJSON API and map to our format id, title, price, image, category
        const urls = [
          'https://dummyjson.com/products/category/laptops', 
          'https://dummyjson.com/products/category/smartphones' 
        ] 
        const results = await Promise.all(urls.map(u => fetch(u).then(r => r.json()))) 
        const apiItems = results.flatMap(r => 
          (r.products || []).map(p => ({ 
            id: `d-${p.id}`,
            title: p.title, 
            price: p.price,
            image: p.thumbnail || (p.images && p.images[0]) || '',
            category: p.category || 'tech'
          }))
        )
        if (mounted) setProducts(apiItems) 
      } else if (source === 'both') {
        const urls = [
          'https://dummyjson.com/products/category/laptops',
          'https://dummyjson.com/products/category/smartphones'
        ]
        const results = await Promise.all(urls.map(u => fetch(u).then(r => r.json())))
        const apiItems = results.flatMap(r =>
          (r.products || []).map(p => ({
            id: `d-${p.id}`,
            title: p.title,
            price: p.price,
            image: p.thumbnail || (p.images && p.images[0]) || '',
            category: p.category || 'tech'
          }))
        )
        if (mounted) setProducts([...apiItems, ...gamerProducts]) // merge both arrays
      }
    } catch (err) {
      if (mounted) {
        setError('API error: ' + err.message)
        if (source !== 'local') setProducts(gamerProducts) // fallback 
      }
    } finally {
      if (mounted) setLoading(false) 
    }
  }

  load()
  return () => { mounted = false } 
}, [source]) // re-run effect when source changes


  const filtered = // compute filtered/sorted list only when inputs change
/* is used to memoize the result of a computation and recompute it only when the dependencies change. */
useMemo(() => {
    const base = Array.isArray(products) ? products : [] 
    let list = base
      // filter by query
      // sort by price or name
    const q = query.trim().toLowerCase() 
    if (q) {
      list = list.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      )
    }
/* These lines of code are responsible for sorting the list of products based on the selected sorting
option. Here's what each condition does: */
    if (sort === 'price-asc') list = [...list].sort((a,b)=>a.price-b.price) 
    if (sort === 'price-desc') list = [...list].sort((a,b)=>b.price-a.price)
    if (sort === 'name-asc') list = [...list].sort((a,b)=>(a.title||'').localeCompare(b.title||''))
    return list
  }, [products, query, sort])

  if (loading) return <p>Loading…</p>
  if (error) console.warn(error) // print error to console without closing the webpage
  if (!Array.isArray(products) || products.length === 0) return <p>No products found.</p> 


/* This block of code is the return statement of the `Products` component in a React. It is
responsible for rendering the UI of the products page. */
  return (
    <>
      <div style={{display:'grid', gap:'.75rem', margin:'1rem 0'}}>
        <SearchBar value={query} onChange={setQuery} />
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem', maxWidth: 520}}>
          <select value={source} onChange={e=>setSource(e.target.value)}>
            <option value="both">Source: Both</option>
            <option value="api">Source: API (electronics)</option>
            <option value="local">Source: Local (gamer)</option>
          </select>
          <select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
          </select>
        </div>
      </div>

      <div className="grid">
        {filtered.map(p => <ProductCard key={`${p.id}-${p.title}`} product={p} />)}
      </div>
    </>
  )
}
