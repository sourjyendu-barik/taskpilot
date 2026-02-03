import { useParams } from "react-router";

import Layout from "../components/Layout";
import DetailsOfProject from "../components/DetailsOfProject";
import RelatedTask from "../components/RelatedTask";
import { useState } from "react";

const ProjetDetails = () => {
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);
  const refreshTaskLoad = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <>
      <Layout>
        <DetailsOfProject id={id} handleTaskChange={refreshTaskLoad} />
        <RelatedTask id={id} refreshKey={refresh} />
      </Layout>
    </>
  );
};

export default ProjetDetails;
