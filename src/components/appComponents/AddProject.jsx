import React, { useState } from "react";
import ModalWrapper from "../modals/ModalWrapper";
import InputGroup from "../ReusableFormComponents/InputGroup";
import BsButton from "../ReusableFormComponents/BsButton";
import { AxiosInstance } from "../../api/AxiosInstance";
import { toast } from "react-toastify";
import TextArea from "../ReusableFormComponents/TextArea";
const AddProject = ({ onClose }) => {
  const [inputdata, setInputData] = useState({
    name: "",
    description: "",
  });
  onchange = (e) => {
    const { name, value } = e.target;
    setInputData((Prev) => ({ ...Prev, [name]: value }));
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    AxiosInstance.post("projects", inputdata)
      .then(() => {
        toast.success("New project added successfully");
        onClose();
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  return (
    <ModalWrapper onClose={onClose}>
      <h3>Add New Project</h3>
      <form onSubmit={handleFormData}>
        <InputGroup
          label="Project Name: "
          name="name"
          value={inputdata.name}
          onChange={onchange}
          placeholder="enter the project name"
          required
        />
        <TextArea
          name={"description"}
          onChange={onchange}
          value={inputdata.description}
          label={"Add description"}
          placeholder={"Add description about project"}
        />
        <BsButton type="submit">Add new project</BsButton>
      </form>
    </ModalWrapper>
  );
};

export default AddProject;
