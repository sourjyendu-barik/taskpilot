import React from "react";

const TeamsCard = ({ name, members, onClick }) => {
  return (
    <div
      className="card cursor-pointer"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <div className="d-flex gap-1">
          {members?.map((m) => (
            <span key={m._id} className="badge bg-secondary">
              {m.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsCard;
