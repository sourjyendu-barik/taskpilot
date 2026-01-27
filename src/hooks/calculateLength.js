import React from "react";

const calculateStringLength = (array) => {
  if (array.length > 1) {
    return "s";
  } else {
    return "";
  }
};

export default calculateStringLength;
