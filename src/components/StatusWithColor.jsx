import React from "react";
import getColorFromStatus from "../hooks/getColorFromStatus";

const StatusWithColor = ({ status }) => {
  const color = getColorFromStatus(status);
  return (
    <>
      <span
        className={`badge rounded-pill bg-${color}-subtle text-${color} px-2 py-1 small`}
      >
        {status}
      </span>
    </>
  );
};
export default StatusWithColor;
