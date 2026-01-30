import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuthContxt } from "../context/AuthProvider";
import BsButton from "../components/ReusableFormComponents/BsButton";
import { useNavigate } from "react-router";
import AddNewTags from "../components/modals/AddNewTags";

const Settings = () => {
  const { currentUser, logout } = useAuthContxt();
  const [showAddNewTag, setShowAddNewTag] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="card" style={{ maxWidth: "500px" }}>
        <div className="card-header">
          <h3>User Details</h3>
        </div>
        <div className="card-body">
          <h5>{currentUser?.name}</h5>
          <p>
            <strong>Email: </strong>
            {currentUser?.email}
          </p>
          <div className="d-flex flex-column flex-md-row  align-item-center justify-content-end gap-2">
            <BsButton onClick={() => setShowAddNewTag(true)}>
              Add New Tag
            </BsButton>
            <BsButton color="secondary" onClick={() => navigate("/tags")}>
              See all tags
            </BsButton>
            <BsButton color="danger" onClick={() => logout()}>
              LogOut
            </BsButton>
          </div>
        </div>
      </div>
      {showAddNewTag && <AddNewTags onClose={() => setShowAddNewTag(false)} />}
    </Layout>
  );
};

export default Settings;
