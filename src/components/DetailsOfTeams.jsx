import { useCallback, useState } from "react";
import { getTeamById } from "../api/Team.api";
import useAxios from "../hooks/useAxios";
import BsButton from "./ReusableFormComponents/BsButton";
import Loading from "./ReusableDetailLoadingComponents/Loading";
import Error from "./ReusableDetailLoadingComponents/ErrorComponent";
import AddNewMemberModal from "./modals/AddNewMemberModal";
const DetailsOfTeams = ({ id }) => {
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);

  const apiFun = useCallback(() => getTeamById(id), [id]);
  const { data, loading, error } = useAxios(apiFun);

  if (loading) return <Loading message="Loading Team Details" />;
  if (error) return <Error message={"Error while loading teamdetails"} />;
  if (!data?.data)
    return (
      <div className="text-center py-5 text-muted">No team details found.</div>
    );

  const { name, members, description } = data.data;

  return (
    <div
      className="card shadow-lg border-0 mx-auto mb-4"
      style={{ maxWidth: "700px" }}
    >
      {/*  Header */}
      <div className="card-header bg-secondary text-white text-center py-5">
        <h1 className="display-6 fw-bold mb-2 lh-sm">Team Details</h1>
        <h2 className="h3 fw-normal mb-0 fst-italic">"{name}"</h2>
      </div>

      <div className="card-body p-4">
        {/* Description */}
        <div className="mb-4 pb-3 border-bottom">
          <h5 className="fw-bold text-dark mb-2">
            <i className="bi bi-card-text me-2"></i>Description
          </h5>
          <p className="lead text-muted fs-6">{description}</p>
        </div>

        {/* Team  Members */}
        <h5 className="fw-bold text-dark mb-4">
          <i className="bi bi-people-fill me-2 text-primary"></i>
          Team Members
        </h5>
        <div className="row g-3">
          {members?.map((m) => (
            <div key={m._id} className="col-lg-6 col-12">
              <div className="list-group-item px-4 py-3 border-0 rounded-3 shadow-sm hover-bg h-100">
                <div className="d-flex align-items-center">
                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3 border border-primary border-opacity-20"
                    style={{ width: 44, height: 44 }}
                  >
                    <i className="bi bi-person"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-semibold">{m.name}</h6>
                    <small className="text-muted">Team Member</small>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-12">
              <div className="list-group-item text-muted p-5 text-center rounded-3">
                <i className="bi bi-people display-4 opacity-25 mb-3 d-block"></i>
                No members yet
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer bg-gradient bg-secondary bg-opacity-90 py-3">
        <div className="d-flex justify-content-end gap-2">
          <BsButton
            type="button"
            className="btn-outline-light btn-lg px-4"
            onClick={() => setShowNewMemberModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>Add Member
          </BsButton>
          <BsButton
            type="button"
            color="danger"
            className="btn-lg px-4"
            onClick={() => {}}
          >
            <i className="bi bi-trash3 me-2"></i>Delete Team
          </BsButton>
        </div>
      </div>
      {showNewMemberModal && (
        <AddNewMemberModal
          onClose={() => setShowNewMemberModal(false)}
          teamId={id}
          existUsers={members}
          name={name}
        />
      )}
    </div>
  );
};

export default DetailsOfTeams;
