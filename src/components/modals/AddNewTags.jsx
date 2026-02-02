import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import InputGroup from "../ReusableFormComponents/InputGroup";
import BsButton from "../ReusableFormComponents/BsButton";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../api/AxiosInstance";
import { useTagContext } from "../../context/TagProviedr";

const AddNewTags = ({ onClose }) => {
  const [tagData, setTagData] = useState({ name: "" });
  const { refetchTags } = useTagContext();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTagData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddTag = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post("/tags", tagData);
      toast.success("Added new tag succssfully");
      refetchTags();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <ModalWrapper onClose={onClose}>
      <h2>Add New Tag</h2>
      <form onSubmit={handleAddTag}>
        <InputGroup
          label="Tag Name"
          name="name"
          type="text"
          value={tagData.name}
          onChange={onChangeHandler}
          placeholder="Enter the tag name"
          required
        />
        <BsButton type="submit">Add New tag</BsButton>
      </form>
    </ModalWrapper>
  );
};

export default AddNewTags;
