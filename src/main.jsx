import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./ChartSetup.js";

import UserContextProvider from "./context/UserContextProvider";
import TeamContextProvider from "./context/TeamContextProvider";
import App from "./App.jsx";
import Teams from "./pages/Teams.jsx";
import Project from "./pages/Project.jsx";
import { ToastContainer } from "react-toastify";
import TeamDetails from "./pages/TeamDetails.jsx";
import ProjectContextProvider from "./context/ProjectContextProvider.jsx";
import TaskContextProvider from "./context/TaskContextProvider.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import ProjetDetails from "./pages/ProjetDetails.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import Auth from "./pages/Auth.jsx";
import RequireAuth from "./pages/RequireAuth.jsx";
import Settings from "./pages/Settings.jsx";
import UserDataProvider from "./context/UserDataProvider.jsx";
import ReportContextProvider from "./context/ReportContextProviedr.jsx";
import ReportPage from "./pages/ReportPage/ReportPage.jsx";
import TagProviedr from "./context/TagProviedr.jsx";
import Tags from "./pages/Tags.jsx";
const router = createBrowserRouter([
  { path: "/auth", element: <Auth /> },
  {
    element: <RequireAuth />,
    children: [
      { path: "/", element: <App /> },
      { path: "/teams", element: <Teams /> },
      { path: "/teamDetails/:id", element: <TeamDetails /> },
      { path: "/projects", element: <Project /> },
      { path: "taskDetails/:id", element: <TaskDetails /> },
      { path: "projectDetails/:id", element: <ProjetDetails /> },
      { path: "/settings", element: <Settings /> },
      { path: "/report", element: <ReportPage /> },
      { path: "/tags", element: <Tags /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserContextProvider>
        <ProjectContextProvider>
          <TeamContextProvider>
            <TaskContextProvider>
              <UserDataProvider>
                <ReportContextProvider>
                  <TagProviedr>
                    <RouterProvider router={router} />
                    <ToastContainer
                      position="top-center"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                  </TagProviedr>
                </ReportContextProvider>
              </UserDataProvider>
            </TaskContextProvider>
          </TeamContextProvider>
        </ProjectContextProvider>
      </UserContextProvider>
    </AuthProvider>
  </StrictMode>,
);
