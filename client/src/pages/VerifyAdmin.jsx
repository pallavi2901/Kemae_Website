import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VerifyAdmin.css";

const VerifyAdmin = ({ onVerify }) => {
  const [adminId, setAdminId] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOTP = async () => {
    if (!adminId || !email) {
      alert("Please enter Admin ID and Email");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/otp/send", {
        adminId,
        email
      });

      if (response.data.success) {
        alert("✅ OTP sent to your email");
        setStep(2);
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("❌ Admin not found or email mismatch");
    }
  };

  const verifyOTP = async () => {
    if (!password || !otp) {
      alert("Please enter Password and OTP");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/otp/verify", {
        adminId,
        otp,
        password
      });

      if (response.data.success) {
        localStorage.setItem("adminVerified", "true");
        onVerify?.();
        alert("✅ Admin Verified");
        navigate("/admin/add-product");
      }
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("❌ Invalid OTP or password");
    }
  };

  return (
    <div className="verify-admin-form">
      <h2>🔐 Admin Verification</h2>

      {step === 1 && (
        <div className="step-form">
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </div>
      )}

      {step === 2 && (
        <div className="step-form">
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify</button>
        </div>
      )}
    </div>
  );
};

export default VerifyAdmin;
