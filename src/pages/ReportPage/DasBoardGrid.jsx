import React from "react";
// The component renders a Bootstrap row container with g-3 gutter spacing.
//  React.Children.map(children, (child) => ...) iterates over the received child
//   elements safely, even if children is not a standard array—it handles null, undefined,
//   fragments, or single elements. Each child gets wrapped in <div className="col-md-6 col-lg-3">
//    for responsive sizing.

const DashBoardGrid = ({ children }) => {
  return (
    <div className="row g-3" style={{ display: "flex" }}>
      {React.Children.map(children, (child) => (
        <div className="col-md-6 col-lg-3">{child}</div>
      ))}
    </div>
  );
};

export default DashBoardGrid;
