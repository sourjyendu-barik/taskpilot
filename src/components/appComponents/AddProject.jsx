import React, { useState } from "react";
import ModalWrapper from "../modals/ModalWrapper";
import InputGroup from "../ReusableFormComponents/InputGroup";
import BsButton from "../ReusableFormComponents/BsButton";
import { AxiosInstance } from "../../api/AxiosInstance";
import { toast } from "react-toastify";
import TextArea from "../ReusableFormComponents/TextArea";
import { useProjectContext } from "../../context/ProjectContextProvider";
const AddProject = ({ onClose }) => {
  const { refetchProjectData } = useProjectContext();
  const [inputdata, setInputData] = useState({
    name: "",
    description: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputData((Prev) => ({ ...Prev, [name]: value }));
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    AxiosInstance.post("projects", inputdata);
    try {
      await AxiosInstance.post("projects", inputdata);
      toast.success("New project added successfully");
      refetchProjectData();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add project");
    }
  };
  return (
    <ModalWrapper onClose={onClose}>
      <h3>Add New Project</h3>
      <form onSubmit={handleFormData}>
        <InputGroup
          label="Project Name: "
          name="name"
          value={inputdata.name}
          onChange={onChange}
          placeholder="enter the project name"
          required
        />
        <TextArea
          name={"description"}
          onChange={onChange}
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
