import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <div className="alert alert-danger mx-auto" style={{ maxWidth: "700px" }}>
      {message}
    </div>
  );
};

export default ErrorComponent;
