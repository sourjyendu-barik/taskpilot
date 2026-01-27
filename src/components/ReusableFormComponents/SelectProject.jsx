import React from "react";
import ReactSelect from "./ReactSelect";
import { useProjectContext } from "../../context/ProjectContextProvider";
const SelectProject = ({ value, onChange }) => {
  const { projectData, projectDataError, projectDataloading } =
    useProjectContext();
  if (projectDataloading) {
    return <p>Projec data loading......</p>;
  }
  if (projectDataError) {
    return <p>Error while loading project data</p>;
  }
  if (!projectDataError && !projectDataError && projectData?.length === 0) {
    return <p>Currently no project data available.</p>;
  }
  const options = projectData.map((p) => ({ value: p._id, label: p.name }));
  return (
    <>
      <ReactSelect
        label="Select a Project: "
        name="project"
        isMulti={false}
        value={value}
        onChange={onChange}
        options={options}
        placeholder="select project"
      />
    </>
  );
};

export default SelectProject;
