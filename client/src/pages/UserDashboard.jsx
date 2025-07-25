import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModal from './ProductModal';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [modalIndex, setModalIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("❌ Error fetching products", err));

    const savedUser = JSON.parse(localStorage.getItem("kemae_user"));
    setEmail(savedUser?.email || "");
  }, []);

  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleProfileMenu = () => setShowProfileMenu(prev => !prev);
 const logout = () => {
  localStorage.removeItem("kemae_user");
  window.location.href = "/";
};


  const openModal = (index) => setModalIndex(index);
  const closeModal = () => setModalIndex(null);
  const goToNext = () => setModalIndex((prev) => (prev + 1) % products.length);
  const goToPrev = () => setModalIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h2>Welcome to KEMAÉ</h2>

        <div className="dashboard-controls">
          <label className="theme-switch">
            <input type="checkbox" onChange={toggleTheme} checked={darkMode} />
            <span className="slider"></span>
          </label>

          <div className="profile-container">
            <button className="profile-button" onClick={toggleProfileMenu}>
              👤 Profile
            </button>
            {showProfileMenu && (
              <ul className="profile-menu">
                <li>About</li>
                <li>Profile Details</li>
                <li>Order Details</li>
                <li>Favourites</li>
                <li>Settings</li>
                <li onClick={logout}>Logout</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product, index) => (
          <div key={product._id} className="product-card" onClick={() => openModal(index)}>
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price}</p>
          </div>
        ))}
      </div>

      {modalIndex !== null && (
        <ProductModal
          product={products[modalIndex]}
          onClose={closeModal}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </div>
  );
};

export default UserDashboard;
