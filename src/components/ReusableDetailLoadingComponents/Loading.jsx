import React from "react";

const Loading = ({ message }) => {
  return (
    <div className="text-center py-5">
      <div className="spinner-border" role="status" />
      <p className="mt-2 text-muted">{`${message}....`}</p>
    </div>
  );
};

export default Loading;
