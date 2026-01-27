import React, { useState } from "react";
import Layout from "../components/Layout";
import { useTeamContext } from "../context/TeamContextProvider";
import Loading from "../components/ReusableDetailLoadingComponents/Loading";
import Error from "../components/ReusableDetailLoadingComponents/ErrorComponent";
import TeamsCard from "../components/TeamsCard";
import { useNavigate } from "react-router-dom";
import AddNewTeamModal from "../components/modals/AddNewTeamModal";
const Teams = () => {
  const [showAddTeamModal, setShowAddteamModal] = useState(false);
  const { allTeams, teamsDataLoading, teamsDataError } = useTeamContext();
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Teams</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddteamModal(true)}
          >
            Add New Team
          </button>
        </div>
        {teamsDataLoading && <Loading message={" Teams data is loading"} />}
        {teamsDataError && <Error message={"Error while loading team"} />}
        {!teamsDataLoading && !teamsDataError && allTeams.length === 0 && (
          <p>Currently there are no teams.</p>
        )}

        <div className="row mt-3">
          {allTeams.length > 0 &&
            allTeams.map((t) => {
              const { name, members, _id: id } = t;
              return (
                <div className="col-md-4 mb-2" key={id}>
                  <TeamsCard
                    name={name}
                    members={members}
                    onClick={() => navigate(`/teamdetails/${id}`)}
                  />
                </div>
              );
            })}
        </div>
        {showAddTeamModal && (
          <AddNewTeamModal onClose={() => setShowAddteamModal(false)} />
        )}
      </Layout>
    </>
  );
};

export default Teams;
