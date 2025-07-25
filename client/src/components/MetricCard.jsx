import "../styles/Dashboard.css";
const MetricCard = ({ title, value }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);
export default MetricCard;
