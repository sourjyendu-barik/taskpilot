import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import InputGroup from "../ReusableFormComponents/InputGroup";
import TextArea from "../ReusableFormComponents/TextArea";
import SelectUsers from "../ReusableFormComponents/SelectUsers";
import BsButton from "../ReusableFormComponents/BsButton";
import { AxiosInstance } from "../../api/AxiosInstance";
import { toast } from "react-toastify";
const AddNewTeamModal = ({ onClose, refetch }) => {
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
    members: [],
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({ ...prev, [name]: value }));
  };
  const handleTeamform = async (e) => {
    e.preventDefault();
    const payload = {
      ...teamData,
      members: teamData.members.map((m) => m.value),
    };
    await AxiosInstance.post(`/teams`, payload)
      .then((res) => {
        setTeamData((prev) => ({ name: "", description: "", members: [] }));
        onClose();
        refetch();
        toast.success(`${res.data.data.name} Team created successfully`);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  return (
    <ModalWrapper onClose={onClose}>
      <h4>Create a new team</h4>
      <form onSubmit={handleTeamform}>
        <InputGroup
          label="Team Name: "
          name="name"
          value={teamData.name}
          onChange={onChange}
          placeholder="Add team name"
          required
        />
        <TextArea
          name={"description"}
          onChange={onChange}
          value={teamData.description}
          placeholder={"Add description about team"}
          label={"Description"}
          required
        />
        <SelectUsers
          value={teamData.members}
          onChange={(selectedMembers) =>
            setTeamData((prev) => ({ ...prev, members: selectedMembers }))
          }
          placeholder="add new member"
          label="Add New Member"
        />
        <BsButton type="submit">Add new Team</BsButton>
      </form>
    </ModalWrapper>
  );
};

export default AddNewTeamModal;
