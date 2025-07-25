import { useState } from "react";
import axios from "axios";
import "./UserLogin.css";

const UserAuth = () => {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        mode === "login"
          ? "http://localhost:5000/api/user/login"
          : "http://localhost:5000/api/user/signup";

      const res = await axios.post(url, form);

      if (mode === "signup") {
        await axios.post("http://localhost:5000/api/save-user", {
          email: form.email,
        });
      }

      alert(`✅ ${mode === "login" ? "Logged in" : "Signed up"} successfully!`);

      // ✅ Save in correct format for session persistence
      localStorage.setItem("kemae_user", JSON.stringify({ email: form.email }));

      window.location.href = "/user/dashboard";
    } catch (err) {
      alert(`❌ ${mode === "login" ? "Login" : "Signup"} failed. Check credentials or try again.`);
      console.error(err);
    }
  };

  return (
    <div className="user-login-container">
      <form onSubmit={handleSubmit} className="user-login-form">
        <h2>{mode === "login" ? "User Login" : "User Signup"}</h2>

        {mode === "signup" && (
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{mode === "login" ? "Login" : "Sign Up"}</button>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          <span
            style={{ color: "#007bff", cursor: "pointer", marginLeft: "5px" }}
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default UserAuth;
