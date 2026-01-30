import React, { useState } from "react";
import Layout from "../components/Layout";
import { useTeamContext } from "../context/TeamContextProvider";
import Loading from "../components/ReusableDetailLoadingComponents/Loading";
import Error from "../components/ReusableDetailLoadingComponents/ErrorComponent";
import TeamsCard from "../components/TeamsCard";
import { useNavigate } from "react-router-dom";
import AddNewTeamModal from "../components/modals/AddNewTeamModal";
import BsButton from "../components/ReusableFormComponents/BsButton";

const Teams = () => {
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const { allTeams, teamsDataLoading, teamsDataError, refetch } =
    useTeamContext();
  const navigate = useNavigate();

  // if (teamsDataLoading) {
  //   return;
  // }

  // if (teamsDataError) {
  //   return;
  // }

  // if (!teamsDataLoading && !teamsDataError && allTeams.length === 0) {
  //   return (
  //     <Layout>
  //       <p className="text-muted text-center py-5">
  //         Currently there are no teams.
  //       </p>
  //       <div className="text-center">
  //         <button
  //           className="btn btn-primary"
  //           onClick={() => setShowAddTeamModal(true)}
  //         >
  //           Add New Team
  //         </button>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      {teamsDataLoading && <Loading message="Teams data is loading" />}
      {teamsDataError && <Error message="Error while loading teams" />}
      {!teamsDataError && !teamsDataLoading && allTeams.length === 0 && (
        <p className="text-muted text-center py-5">
          Currently there are no teams.
        </p>
      )}
      {allTeams.length > 0 && (
        <>
          <h1>Teams</h1>
          <div className="row g-3">
            {allTeams.map((t) => {
              const { name, members, _id: id } = t;
              return (
                <div className="col-md-4 mb-3" key={id}>
                  <TeamsCard
                    name={name}
                    members={members}
                    onClick={() => navigate(`/teamdetails/${id}`)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="d-flex justify-content-end">
        <BsButton onClick={() => setShowAddTeamModal(true)}>
          Add New Team
        </BsButton>
      </div>

      {showAddTeamModal && (
        <AddNewTeamModal
          onClose={() => setShowAddTeamModal(false)}
          refetch={refetch}
        />
      )}
    </Layout>
  );
};

export default Teams;
