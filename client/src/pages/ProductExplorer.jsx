import { useState, useEffect } from 'react';
import './ProductExplorer.css';
import { FaCartPlus, FaHeart, FaBolt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductModal from './ProductModal';

const ProductExplorer = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

// Fetch only best seller items
useEffect(() => {
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    const all = res.data;
    const bestSellers = all.slice(0, 4); // Simulate best sellers
    setProducts(bestSellers);
  };
  fetchProducts();
}, []);


  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="explorer-container">
      <h2>🛍️ Discover Unique Picks from KEMAÉ</h2>
      <select className="category-filter" value={filter} onChange={e => setFilter(e.target.value)}>
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>

      <div className="product-grid">
        {filtered.map((p, index) => (
          <div className="cylinder-card" key={p._id} onClick={() => setSelectedProductIndex(index)}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
            <div className="actions">
              <FaCartPlus title="Add to Cart" />
              <FaBolt title="Buy Now" />
              <FaHeart title="Favorite" />
            </div>
          </div>
        ))}
      </div>

      {selectedProductIndex !== null && (
        <ProductModal
          product={filtered[selectedProductIndex]}
          onClose={() => setSelectedProductIndex(null)}
          onNext={() => setSelectedProductIndex((prev) => (prev + 1) % filtered.length)}
          onPrev={() => setSelectedProductIndex((prev) => (prev - 1 + filtered.length) % filtered.length)}
        />
      )}
    </div>
  );
};

export default ProductExplorer;
