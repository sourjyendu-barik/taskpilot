import React, { useCallback, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { getTaskById } from "../api/Task.api";
import calculateStringLength from "../hooks/calculateLength";
import getStringDate from "../hooks/getStringDate";
import ShowDataPairs from "./ShowDataPairs";
import BsButton from "./ReusableFormComponents/BsButton";
import AddTaskModal from "./modals/AddTaskModal";
import Loading from "./ReusableDetailLoadingComponents/Loading";
import ErrorComponent from "./ReusableDetailLoadingComponents/ErrorComponent";
import { AxiosInstance } from "../api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const DetailsOfTask = ({ id }) => {
  const apiFun = useCallback(() => getTaskById(id), [id]);
  const { data, loading, error } = useAxios(apiFun);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  if (loading) {
    return <Loading message={"Task Data loading."} />;
  }
  if (error) {
    return <ErrorComponent message="Error while loading task data." />;
  }
  const detailData = data?.data || {};
  const {
    _id,
    name,
    project,
    team,
    owners = [],
    tags = [],
    status,
    dueDate,
    timeToComplete,
  } = detailData;

  const transformedData = {
    id: detailData._id,
    name: detailData.name || "",
    project: detailData.project
      ? {
          value: detailData.project._id,
          label: detailData.project.name,
        }
      : null,
    team: detailData.team
      ? {
          value: detailData.team._id,
          label: detailData.team.name,
        }
      : null,
    owners:
      detailData.owners?.map((owner) => ({
        value: owner._id,
        label: owner.name,
      })) || [],
    timeToComplete: detailData.timeToComplete || 0,
    dueDate: detailData.dueDate
      ? new Date(detailData.dueDate).toISOString().split("T")[0]
      : "",
    tags: detailData.tags
      ? detailData.tags.map((t) => ({
          label: t,
          value: t,
        }))
      : [],
    status: detailData.status
      ? { value: detailData.status, label: detailData.status }
      : null,
  };
  const deleteTask = (id) => {
    AxiosInstance.delete(`/task/${id}`)
      .then(() => {
        toast.success("task deleted successfully");
        navigate(-1);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message);
      });
  };
  console.log(detailData);
  return (
    <div className="container mt-4">
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <div className="card-header bg-primary text-white text-center py-4">
          <h1>Task Details of</h1>
          <h2>{name}</h2>
        </div>
        <div className="card-body p-2">
          <div className="detail-info bg-light rounded-3 p-2">
            <ShowDataPairs label={"Project"} value={project?.name} />
            <ShowDataPairs label={"Team"} value={team?.name} />
            <ShowDataPairs
              label={`Owner${calculateStringLength(owners)}`}
              value={
                owners?.length
                  ? owners.map((o) => o.name).join(", ")
                  : "No owners"
              }
            />
            <ShowDataPairs
              label={`Tag${calculateStringLength(tags)}`}
              value={tags?.length ? tags.join(", ") : "No tags"}
            />
            <ShowDataPairs label={"Due date"} value={getStringDate(dueDate)} />
            <ShowDataPairs label={"Status"} value={status} />
            <ShowDataPairs label={"Time Remaining"} value={timeToComplete} />
          </div>
        </div>
        <div className="card-footer p-4">
          <div className="d-flex justify-content-end gap-2">
            <BsButton
              type="button"
              onClick={() => {
                setShowEditModal(true);
              }}
            >
              Edit
            </BsButton>
            <BsButton type="" color="danger" onClick={() => deleteTask(_id)}>
              Delete
            </BsButton>
          </div>
        </div>
      </div>
      {showEditModal && (
        <AddTaskModal
          defualtData={transformedData}
          onClose={() => setShowEditModal(false)}
          type={false}
        />
      )}
    </div>
  );
};

export default DetailsOfTask;
