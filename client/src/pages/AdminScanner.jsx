// pages/AdminScanner.jsx
import QRCode from 'qrcode.react';

const AdminScanner = () => {
const secureURL = "https://kemae-website.vercel.app/verify-admin";

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>🔐 Admin Access Required</h2>
      <p>Scan this QR code using your device to verify admin identity</p>
      <QRCode value={secureURL} size={256} />
      <p style={{ marginTop: '1rem', color: 'gray' }}>
        OR visit <a href={secureURL}>{secureURL}</a>
      </p>
    </div>
  );
};

export default AdminScanner;
