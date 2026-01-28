import React from "react";
import Layout from "../components/Layout";
import { useAuthContxt } from "../context/AuthProvider";
import BsButton from "../components/ReusableFormComponents/BsButton";

const Settings = () => {
  const { currentUser, logout } = useAuthContxt();
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
          <div className="d-flex align-item-center justify-content-end">
            <BsButton onClick={() => logout()}>LogOut</BsButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
