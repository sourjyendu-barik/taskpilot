import React from "react";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <SideBar />
      <main className="content-wrapper flex-grow-1 p-3">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
