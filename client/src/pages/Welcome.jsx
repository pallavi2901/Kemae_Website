import { useState } from 'react';
import "../styles/Welcome.css";
import UserLogin from './UserLogin'; // ✅ Corrected import
import ProductExplorer from './ProductExplorer';

const Welcome = () => {
  const [view, setView] = useState(''); // '', 'user', 'explore'

  if (view === 'user') return <UserLogin />; // ✅ Replaced UserForm with UserLogin
  if (view === 'explore') return <ProductExplorer />;

  return (
    <div className="container">
      <h1>Welcome to <span className="brand">KEMAÉ</span></h1>
      <div className="roleOptions">
        <button onClick={() => setView('user')}>Login / Signup</button>
        <button onClick={() => setView('explore')}>🛍️ Explore Products</button>
      </div>
    </div>
  );
};

export default Welcome;
