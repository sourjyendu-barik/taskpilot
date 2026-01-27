import React, { useCallback, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import DetailsOfTeams from "../components/DetailsOfTeams";
const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  // const apifun = useCallback(() => getTeamById(id), [id]);
  // const { data, loading, error } = useAxios(apifun);
  // if (loading) {
  //   return <p>The team Details are loading.</p>;
  // }
  // if (error) {
  //   return <p>Error While team details are loading.</p>;
  // }
  // if (!loading && !error) {
  //   return <p>No team details found.</p>;
  // }
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
      {/*  {loading && <p>Team details are loading</p>}
        {error && <p>Error while loading team details</p>}

        {team_details && (
          <div className="card">
            <div className="card-body">
              <h3>{team_details?.name}</h3>
              <ul>
                {team_details?.members?.map((m) => (
                  <li key={m._id}>{m.name}</li>
                ))}
              </ul>
              <p>
                <strong>Description: </strong>
                {team_details?.description}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setShowNewMemberModal(true)}
              >
                Add new member
              </button>
            </div>
          </div>
        )}
      </div> */}
    </Layout>
  );
};

export default TeamDetails;
