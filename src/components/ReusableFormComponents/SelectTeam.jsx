import React from "react";
import ReactSelect from "./ReactSelect";
import { useTeamContext } from "../../context/TeamContextProvider";
const SelectTeam = ({ onChange, value }) => {
  const { allTeams, teamsDataLoading, teamsDataError } = useTeamContext();
  if (teamsDataLoading) {
    return <p>Teams data are loading</p>;
  }
  if (teamsDataError) {
    return <p>Error while loading teams data.</p>;
  }
  if (!teamsDataError && !teamsDataError && allTeams?.length === 0) {
    return <p>No teams data present</p>;
  }
  const options = allTeams.map((t) => ({ label: t.name, value: t._id }));
  return (
    <>
      <ReactSelect
        label="Select a Team: "
        name="team"
        isMulti={false}
        value={value}
        onChange={onChange}
        options={options}
        placeholder="select team"
      />
    </>
  );
};

export default SelectTeam;
