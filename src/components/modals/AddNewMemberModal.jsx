import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import SelectUsers from "../ReusableFormComponents/SelectUsers";
import BsButton from "../ReusableFormComponents/BsButton";
import { AxiosInstance } from "../../api/AxiosInstance";
import { toast } from "react-toastify";
const AddNewMemberModal = ({ onClose, teamId, existUsers, name, refetch }) => {
  const existUserReactSelectFormat = existUsers.map((u) => ({
    label: u.name,
    value: u._id,
  }));
  const [members, setmembers] = useState(existUserReactSelectFormat);

  const handleAddMember = async (e) => {
    e.preventDefault();
    const payLoad = members.map((m) => m.value);
    AxiosInstance.post(`teams/member/${teamId}`, {
      newMembers: payLoad,
    })
      .then(() => {
        onClose();
        refetch();
        toast.success("New members added successfully");
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  return (
    <ModalWrapper onClose={onClose}>
      <h4>Add New Team Member for {name}</h4>
      <form onSubmit={handleAddMember}>
        <SelectUsers
          value={members}
          onChange={setmembers}
          placeholder="add new member"
          label="Add New Member"
        />
        <BsButton type="submit">Add new Member</BsButton>
      </form>
    </ModalWrapper>
  );
};

export default AddNewMemberModal;
