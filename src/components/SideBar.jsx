import React from "react";
import { NavLink } from "react-router";

const SideBar = () => {
  return (
    <div>
      {/* Mobile top navbar */}
      {/* The mobile navbar is visible only on small screens. It contains a hamburger menu button that opensthe sidebar.*/}
      <nav className="navbar navbar-light bg-white shadow-sm d-md-none  px-3">
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
        >
          ☰
        </button>
      </nav>
      {/* Class Explanation:
      1: navbar: Creates a Bootstrap navigation bar. 
      2: navbar-light: Applies light color styling.
      3: bg-white: Sets the background color to white.
      4: shadow-sm: Adds a small shadow for depth.
      5: d-md-none: Hides navbar on medium and larger screens.
      6: px-3: Adds horizontal padding.
      7: btn: Base button styling.
      8: btn-outline-primary: Primary colored outline button.
      9. data-bs-toggle specifies what kind of Bootstrap component this element should trigger when clicked.
​     10. The value "offcanvas" means: “when this element is interacted with (click), open/close an Offcanvas component
         (a hidden side panel).”
     11. data-bs-target tells Bootstrap which element on the page is the offcanvas to open.
     12. The value "#sidebar" is a CSS selector, so Bootstrap will find the element with id="sidebar"
      (your <div class="offcanvas ...">) and slide that in/out when the button is clicked.    
      */}

      <div
        className="offcanvas-md offcanvas-start bg-light sidebar"
        // className="offcanvas offcanvas-start d-md-block d-none bg-light sidebar"
        tabIndex={-1}
        id="sidebar"
        data-bs-backdrop="false"
      >
        {/* 1: offcanvas-md : By this in mobile it will behave as offcanvas and in loaptop and mobile it will beghave as sidecreen 
            2: offcanvas-start: Pop up from left.
            3: sidebar: Custom class where we can specify our styles
            4: tabIndex: After click the toggolw button focous will be on result(sidebar)
        */}

        <div className="offcanvas-body d-flex flex-column p-0">
          <div className="offcanvas-header justify-content-end p-3">
            {/* <div className="offcanvas-header justify-content-end p-3 d-md-none"> */}
            <button
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebar"
              className="btn-close"
              type="button"
              aria-label="Close"
            ></button>
          </div>

          {/* by flex box we can make button in top rihgt
          1: data-bs-dismiss: It will close the offcanvas.
          */}
          <NavLink to={"/"} className="nav-link">
            <h2>Task Pilot</h2>
          </NavLink>

          <ul className="nav d-flex flex-column mt-3 gap-1">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link">
                <i className="bi bi-grid me-2"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/projects" className="nav-link">
                <i className="bi bi-folder me-2"></i> Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/teams" className="nav-link">
                <i className="bi bi-people me-2"></i> Team
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/report"} className="nav-link">
                <i className="bi bi-bar-chart me-2"></i> Reports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/settings"} className="nav-link">
                <i className="bi bi-gear me-2"></i> Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
