import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProductForm.css';

const AddProductForm = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", form);
      alert("✅ Product added!");
      setForm({ name: '', category: '', price: '', description: '', image: '' });
      fetchProducts();
    } catch (err) {
      alert("❌ Failed to add product");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("🗑️ Product deleted!");
      fetchProducts();
    } catch (err) {
      alert("❌ Failed to delete product");
    }
  };

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit}>
        <h2>📦 Add New Product</h2>

        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="image" placeholder="Paste Image URL" value={form.image} onChange={handleChange} required />

        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "12px", marginBottom: "1rem" }}
          />
        )}

        <button type="submit">➕ Add Product</button>
      </form>

      <h3 style={{ marginTop: '3rem' }}>📋 Existing Products</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #eee", padding: "10px", marginBottom: "10px", borderRadius: "10px" }}>
            <p><strong>{product.name}</strong> - ₹{product.price}</p>
            <button onClick={() => handleDelete(product._id)} style={{ backgroundColor: "#e53935", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProductForm;
