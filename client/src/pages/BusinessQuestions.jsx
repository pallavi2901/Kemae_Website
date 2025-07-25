const BusinessQuestions = () => {
  const questions = [
    "What type of products will you sell?",
    "Do you have a target audience in mind?",
    "How often will new items be added?",
    "What payment methods will you support?",
    "Do you need logistics support?",
    "Do you plan to offer discounts or bundles?",
    "Would you like AI to recommend bestsellers?",
  ];

  return (
    <div className="questions-section">
      <h2>📌 Let's understand your business</h2>
      <ul>
        {questions.map((q, idx) => (
          <li key={idx}>❓ {q}</li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessQuestions;
