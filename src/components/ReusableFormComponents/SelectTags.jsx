import React from "react";
import ReactSelect from "./ReactSelect";
import { useTagContext } from "../../context/TagProviedr";
const SelectTags = ({ value, onChange }) => {
  const { tags, loading, error } = useTagContext();
  if (loading) {
    return <p>Tags data are loading</p>;
  }
  if (error) {
    return <p>Error while loading tags data.</p>;
  }
  let tagsOptions = [];
  if (!loading && !error && tags.length === 0) {
    tagsOptions = [
      { value: "Bug", label: "Bug" },
      { value: "Urgent", label: "Urgent" },
      { value: "In Progress", label: "In Progress" },
      { value: "Follow Up", label: "Follow Up" },
    ];
  } else {
    tagsOptions = tags.map((t) => ({ value: t.name, label: t.name }));
  }
  return (
    <>
      <ReactSelect
        label={"Select Tags"}
        name="tags"
        isMulti={true}
        value={value}
        onChange={onChange}
        options={tagsOptions}
        placeholder={"select tags"}
        isCreatable={true}
      />
    </>
  );
};

export default SelectTags;
