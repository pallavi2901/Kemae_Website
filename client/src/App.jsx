import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import AddProductForm from './pages/AddProductForm';
import VerifyAdmin from './pages/VerifyAdmin';
import AdminDashboard from './pages/AdminDashboard';

import './pages/AddProductForm.css';

function App() {
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("adminVerified") === "true";
    setIsAdminVerified(verified);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        
        {/* ✅ Admin verification form */}
        <Route
          path="/verify-admin"
          element={
            <VerifyAdmin onVerify={() => {
              localStorage.setItem("adminVerified", "true");
              setIsAdminVerified(true);
            }} />
          }
        />

        {/* ✅ Secure product add route */}
        <Route
          path="/admin/add-product"
          element={
            isAdminVerified
              ? <AddProductForm />
              : <Navigate to="/verify-admin" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
