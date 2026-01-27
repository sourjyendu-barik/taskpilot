import React from "react";
import ReportContextProvider from "../../context/ReportContextProviedr";
import DashBoardCharts from "./DashBoardCharts";
import Layout from "../../components/Layout";

const ReportPage = () => {
  return (
    <ReportContextProvider>
      <Layout>
        <h1>Reports</h1>
        <DashBoardCharts />
      </Layout>
    </ReportContextProvider>
  );
};

export default ReportPage;
