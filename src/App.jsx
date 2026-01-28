import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Searchbar from "./components/Searchbar";
import Layout from "./components/Layout";
import AppProjectSection from "./components/appComponents/AppProjectSection";
import AppTaskSection from "./components/appComponents/AppTaskSection";
import { useUserDataContext } from "./context/UserDataProvider";

function App() {
  const { searchTerm, setSearchTerm } = useUserDataContext();
  return (
    <>
      <Layout>
        <Searchbar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          label={"Enter Task Name"}
          placeholder={"Enter task name"}
        />
        <div className="mb-3">
          <AppProjectSection />
        </div>
        <AppTaskSection />
      </Layout>
    </>
  );
}

export default App;
