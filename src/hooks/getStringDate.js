import React from "react";

const getStringDate = (date) => {
  const strDate = new Date(date).toLocaleDateString();
  return strDate;
};

export default getStringDate;
