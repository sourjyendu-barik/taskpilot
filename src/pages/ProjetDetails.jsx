import { useParams } from "react-router";

import Layout from "../components/Layout";
import DetailsOfProject from "../components/DetailsOfProject";
import RelatedTask from "../components/RelatedTask";

const ProjetDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Layout>
        <DetailsOfProject id={id} />
        <RelatedTask id={id} />
      </Layout>
    </>
  );
};

export default ProjetDetails;
