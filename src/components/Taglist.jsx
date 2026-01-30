import React, { useState } from "react";
import { useTagContext } from "../context/TagProviedr";
import Loading from "./ReusableDetailLoadingComponents/Loading";
import ErrorComponent from "./ReusableDetailLoadingComponents/ErrorComponent";
import BsButton from "./ReusableFormComponents/BsButton";
import { deleteTagsById } from "../api/Tag.api";
import { toast } from "react-toastify";
import AddNewTags from "./modals/AddNewTags";
const Taglist = () => {
  const { tags, loading, error, refetchTags } = useTagContext();
  const [show, setShow] = useState(false);
  if (loading) {
    return <Loading message="Tags data are loading" />;
  }
  if (error) {
    return <ErrorComponent message="Error while loading tag data" />;
  }
  if (!loading && !error && tags.length === 0) {
    return <p>No tags data available.</p>;
  }
  const handleDeleteTag = async (id) => {
    try {
      await deleteTagsById(id);
      refetchTags();
      toast.success("Tags deleted sccessfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="row">
        {tags.map((t) => {
          const { _id, name } = t;
          return (
            <div className="col-md-2" key={_id}>
              <div className="card">
                <div className="card-body">
                  <p>
                    <strong>{name}</strong>
                  </p>
                  <BsButton color="danger" onClick={() => handleDeleteTag(_id)}>
                    Delete Tag
                  </BsButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-end">
        <BsButton onClick={() => setShow(true)}>Add New Tag</BsButton>
      </div>
      {show && <AddNewTags onClose={() => setShow(false)} />}
    </>
  );
};

export default Taglist;
