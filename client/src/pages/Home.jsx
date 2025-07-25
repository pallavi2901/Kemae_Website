import { useState } from 'react';
import UserAuth from './UserLogin';
import BusinessQuestions from './BusinessQuestions';
import './Home.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="full-page">
      <div className="center-content">
        <h1>Welcome to <span className="brand">KEMAÉ</span></h1>

        <div className="button-group">
          <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
          <button className="btn-outline" onClick={() => setShowLogin(false)}>Signup</button>
        </div>

        <div className="auth-container">
          {showLogin ? <Login /> : <Signup />}
        </div>

        <BusinessQuestions />
      </div>
    </div>
  );
};

export default Home;
