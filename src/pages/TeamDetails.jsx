import React, { useCallback, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import DetailsOfTeams from "../components/DetailsOfTeams";
const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Layout>
      <p className="text-muted mb-3">
        <strong>
          <button
            className="btn btn-link p-0 align-baseline text-decoration-none"
            onClick={() => navigate("/teams")}
          >
            ← Return to Teams
          </button>
        </strong>
      </p>
      <DetailsOfTeams id={id} />
    </Layout>
  );
};

export default TeamDetails;
