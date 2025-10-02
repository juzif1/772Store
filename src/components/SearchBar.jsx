/* === M2: Code Documentation === Search input component === */

// UI: input that updates search query
export default function SearchBar({ value, onChange }) { 
  return (
    <div style={{ margin: '1rem 0' }}> 
      <input
        type="search" 
        placeholder="Search by title or category…" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        style={{ width: '100%', padding: '.6rem .8rem', borderRadius: 10, border: '1px solid #ddd' }}
      />
    </div>
  )
}
