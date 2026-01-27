import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import BsButton from "../ReusableFormComponents/BsButton";
import { AxiosInstance } from "../../api/AxiosInstance";
import { toast } from "react-toastify";
import TextArea from "../ReusableFormComponents/TextArea";
import InputGroup from "../ReusableFormComponents/InputGroup";
const ProjectUpdateModal = ({ onClose, defaultData }) => {
  const [inputdata, setInputdata] = useState(defaultData);
  const onchange = (e) => {
    const { name, value } = e.target;
    setInputdata((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    AxiosInstance.post(`/project/${inputdata._id}`, inputdata)
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
      <h4>Update Project</h4>
      <form onSubmit={handleUpdate}>
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
          label="Add description"
          placeholder={"add description about project"}
        />
        <div className="d-flex gap-2 justify-content-end">
          <BsButton type="submit">Upadte</BsButton>
          <BsButton color="secondary" onClick={onClose}>
            Close
          </BsButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default ProjectUpdateModal;
