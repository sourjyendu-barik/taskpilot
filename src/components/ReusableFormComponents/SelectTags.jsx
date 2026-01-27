import React from "react";
import ReactSelect from "./ReactSelect";
const SelectTags = ({ value, onChange }) => {
  const tagsOption = [
    { value: "Bug", label: "Bug" },
    { value: "Urgent", label: "Urgent" },
    { value: "In Progress", label: "In Progress" },
    { value: "Follow Up", label: "Follow Up" },
  ];

  return (
    <>
      <ReactSelect
        label={"Select Tags"}
        name="tags"
        isMulti={true}
        value={value}
        onChange={onChange}
        options={tagsOption}
        placeholder={"select tags"}
      />
    </>
  );
};

export default SelectTags;
