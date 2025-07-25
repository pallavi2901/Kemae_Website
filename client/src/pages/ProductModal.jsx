import { useEffect } from 'react';
import './ProductModal.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import FeedbackForm from './FeedbackForm';

const ProductModal = ({ product, onClose, onNext, onPrev }) => {

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onPrev, onNext, onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>

        <div className="modal-header">
          <button className="arrow-btn arrow-left" onClick={onPrev}><FaArrowLeft /></button>
          <img src={product.image} alt={product.name} className="modal-image" />
          <button className="arrow-btn arrow-right" onClick={onNext}><FaArrowRight /></button>
        </div>

        <div className="modal-details">
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p>{product.description || "No description provided."}</p>
        </div>

        <FeedbackForm productId={product._id} />
      </div>
    </div>
  );
};

export default ProductModal;
