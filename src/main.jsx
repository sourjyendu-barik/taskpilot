import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./ChartSetup";
import AuthProvider, { useAuthContxt } from "./context/AuthProvider";

import UserContextProvider from "./context/UserContextProvider";
import TeamContextProvider from "./context/TeamContextProvider";
import ProjectContextProvider from "./context/ProjectContextProvider";
import TaskContextProvider from "./context/TaskContextProvider";
import UserDataProvider from "./context/UserDataProvider";
import ReportContextProvider from "./context/ReportContextProviedr";
import TagProviedr from "./context/TagProviedr";

import RequireAuth from "./pages/RequireAuth";
import Auth from "./pages/Auth";
import App from "./App";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import Project from "./pages/Project";
import TaskDetails from "./pages/TaskDetails";
import ProjetDetails from "./pages/ProjetDetails";
import Settings from "./pages/Settings";
import ReportPage from "./pages/ReportPage/ReportPage";
import Tags from "./pages/Tags";

import Loading from "./components/ReusableDetailLoadingComponents/Loading";

/* ---------------- ROUTES (same as your original) ---------------- */

const router = createBrowserRouter([
  { path: "/auth", element: <Auth /> },
  {
    element: <RequireAuth />,
    children: [
      { path: "/", element: <App /> },
      { path: "/teams", element: <Teams /> },
      { path: "/teamDetails/:id", element: <TeamDetails /> },
      { path: "/projects", element: <Project /> },
      { path: "/taskDetails/:id", element: <TaskDetails /> },
      { path: "/projectDetails/:id", element: <ProjetDetails /> },
      { path: "/settings", element: <Settings /> },
      { path: "/report", element: <ReportPage /> },
      { path: "/tags", element: <Tags /> },
    ],
  },
]);

/* -------- WAIT FOR AUTH, THEN MOUNT OTHER PROVIDERS -------- */

const AppProviders = () => {
  const { isAuthChecking } = useAuthContxt();

  if (isAuthChecking) {
    return <Loading message="Checking authentication..." />;
  }

  return (
    <UserContextProvider>
      <ProjectContextProvider>
        <TeamContextProvider>
          <TaskContextProvider>
            <UserDataProvider>
              <ReportContextProvider>
                <TagProviedr>
                  <RouterProvider router={router} />
                  <ToastContainer position="top-center" autoClose={3000} />
                </TagProviedr>
              </ReportContextProvider>
            </UserDataProvider>
          </TaskContextProvider>
        </TeamContextProvider>
      </ProjectContextProvider>
    </UserContextProvider>
  );
};

/* ---------------- ROOT RENDER ---------------- */

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppProviders />
  </AuthProvider>,
);
