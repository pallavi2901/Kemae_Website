import { useState } from 'react';
import axios from 'axios';
import "../styles/Welcome.css";

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [aestheticType, setAestheticType] = useState('');
  const [interests, setInterests] = useState([]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/save-user', { email });
      setIsCreated(true);
      setShowProfile(true);
      localStorage.setItem("userEmail", email);
    } catch (err) {
      alert("Error saving user");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("userEmail");
    setShowProfile(false);
    window.location.reload();
  };

  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    if (!email) return alert("Email missing");

    await axios.post('http://localhost:5000/api/save-user', {
      email,
      aestheticType,
      interests
    });

    alert("Preferences saved. Redirecting...");
    window.location.href = "/home";
  };

  return (
    <div className="container">
      <div className="header">
        <div className="themeToggle">🌓</div>
        {showProfile && (
          <div className="profileBox">
            {email} | <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>

      {!isCreated ? (
        <form onSubmit={handleEmailSubmit} className="form">
          <h1>Welcome to <span className="brand">KEMAÉ</span></h1>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Create Account</button>
        </form>
      ) : (
        <>
          <p className={styles.success}>🎉 You have successfully created your account</p>
          <form onSubmit={handlePreferencesSubmit} className={styles.form}>
            <label>Select your aesthetic type:</label>
            <div className={styles.optionRow}>
              <button
                type="button"
                className={aestheticType === 'Anime' ? styles.selected : ''}
                onClick={() => setAestheticType('Anime')}
              >
                Anime
              </button>
              <button
                type="button"
                className={aestheticType === 'Nature' ? styles.selected : ''}
                onClick={() => setAestheticType('Nature')}
              >
                Nature
              </button>
                <button
                type="button"
                className={aestheticType === 'Both' ? styles.selected : ''}
                onClick={() => setAestheticType('Both')}
              >
                Both
              </button>
            </div>

            <label>Choose your interests:</label>
            <div className={styles.optionGrid}>
              {['Stationery', 'Posters', 'Miniatures', 'Room Decor', 'DIY Kits'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={interests.includes(item) ? styles.selected : ''}
                  onClick={() => setInterests(prev =>
                    prev.includes(item)
                      ? prev.filter(i => i !== item)
                      : [...prev, item]
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            <button type="submit">Continue</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Welcome;
