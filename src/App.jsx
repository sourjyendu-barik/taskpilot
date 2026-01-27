import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import Searchbar from "./components/Searchbar";
import Layout from "./components/Layout";
import AppProjectSection from "./components/appComponents/AppProjectSection";
import AppTaskSection from "./components/appComponents/AppTaskSection";

function App() {
  return (
    <>
      <Layout>
        <Searchbar />
        <AppProjectSection />
        <AppTaskSection />
      </Layout>
    </>
  );
}

export default App;
