const Empty = ({ message = "No data available" }) => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center text-muted text-center">
      <div>
        <p className="mb-1">📊</p>
        <small>{message}</small>
      </div>
    </div>
  );
};

export default Empty;
