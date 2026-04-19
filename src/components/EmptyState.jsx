function EmptyState({ icon, title, message }) {
  return (
    <div className="no-links">
      {icon}
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
