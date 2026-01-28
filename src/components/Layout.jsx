import React from "react";
import SideBar from "./SideBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="app-layout d-flex min-vh-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main column */}
      <div className="d-flex flex-column flex-grow-1">
        {/* Scrollable content */}
        <main className="content-wrapper flex-grow-1 p-3">
          <div className="container-fluid">{children}</div>
        </main>

        {/* Footer stays at bottom */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
