import { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = ({ productId }) => {
  const [comment, setComment] = useState('');

  const submitFeedback = () => {
    fetch(`/api/products/${productId}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment })
    })
      .then(() => {
        alert("Thanks for your feedback!");
        setComment('');
      });
  };

  return (
    <div className="feedback-section">
      <h3>💬 Share your experience</h3>
      <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a review..." />
      <button onClick={submitFeedback}>Submit</button>
    </div>
  );
};

export default FeedbackForm;
