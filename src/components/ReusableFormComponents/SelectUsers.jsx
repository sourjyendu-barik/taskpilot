import React, { useState } from "react";
import ReactSelect from "./ReactSelect";
import { useUserContext } from "../../context/UserContextProvider";
const SelectUsers = ({ value, onChange, placeholder, label }) => {
  const { users, userDataLoading, userDataError } = useUserContext();
  if (userDataLoading) {
    return <p>Users data are loading.....</p>;
  }
  if (userDataError) {
    return <p>Error while loading users data.</p>;
  }
  if (!userDataLoading && !userDataError && users?.length === 0) {
    return <p>No users available</p>;
  }
  const options = users.map((u) => ({ label: u.name, value: u._id }));
  return (
    <>
      <ReactSelect
        label={label}
        name="team"
        isMulti={true}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
      />
    </>
  );
};

export default SelectUsers;
