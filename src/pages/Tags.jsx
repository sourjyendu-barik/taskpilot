import { useState } from "react";
import Layout from "../components/Layout";
import Taglist from "../components/Taglist";
import AddNewTags from "../components/modals/AddNewTags";
import BsButton from "../components/ReusableFormComponents/BsButton";
const Tags = () => {
  const [show, setShow] = useState(false);

  return (
    <Layout>
      <h1>All tags</h1>
      <Taglist />
      <div className="d-flex justify-content-end">
        <BsButton onClick={() => setShow(true)}>Add New Tag</BsButton>
      </div>
      {show && <AddNewTags onClose={() => setShow(false)} />}
    </Layout>
  );
};

export default Tags;
