import { useState, useMemo, useEffect } from "react";
import getStringDate from "../hooks/getStringDate";
import Loading from "./ReusableDetailLoadingComponents/Loading";
import Error from "./ReusableDetailLoadingComponents/ErrorComponent";
import useAxios from "../hooks/useAxios";
import { AxiosInstance } from "../api/AxiosInstance";
import ReactSelect from "./ReusableFormComponents/ReactSelect";
import { useNavigate } from "react-router";

const RelatedTask = ({ id, refreshKey }) => {
  const navigate = useNavigate();
  const {
    data: taskResponse,
    loading,
    error,
    refetch,
  } = useAxios(() =>
    AxiosInstance.get("/task", {
      params: { project: id },
    }),
  );
  useEffect(() => {
    if (refreshKey) {
      refetch();
    }
  }, [refreshKey, refetch]);

  const taskData = taskResponse?.data ?? [];

  // State for filters and sorting
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [sortBy, setSortBy] = useState("dueDateAsc");

  // Extract unique status and owners for dropdown options
  const statusOptions = useMemo(() => {
    const statuses = Array.from(new Set(taskData.map((task) => task.status)));
    return statuses.map((status) => ({ value: status, label: status }));
  }, [taskData]);

  const ownerOptions = useMemo(() => {
    const owners = taskData.flatMap((task) =>
      task.owners.map((owner) => ({ value: owner._id, label: owner.name })),
    );
    return Array.from(new Map(owners.map((o) => [o.value, o])).values());
  }, [taskData]);

  // Due date sort options only
  const sortOptions = [
    { value: "dueDateAsc", label: "Due Date (Low to High)" },
    { value: "dueDateDesc", label: "Due Date (High to Low)" },
  ];

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...taskData];

    // Filter by status
    if (selectedStatus.length > 0) {
      filtered = filtered.filter((task) =>
        selectedStatus.some((status) => task.status === status.value),
      );
    }

    // Filter by owners
    if (selectedOwners.length > 0) {
      filtered = filtered.filter((task) =>
        selectedOwners.some((ownerId) =>
          task.owners.some((owner) => owner._id === ownerId.value),
        ),
      );
    }

    // Sort by due date
    filtered.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);

      if (sortBy === "dueDateAsc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return filtered;
  }, [taskData, selectedStatus, selectedOwners, sortBy]);

  if (loading) {
    return <Loading message="Task data is loading" />;
  }

  if (error) {
    return <Error message="Error while loading task data" />;
  }

  if (!loading && !error && filteredAndSortedTasks.length === 0) {
    return <p>No task data present matching the selected filters.</p>;
  }

  return (
    <div>
      <h3>Filter & Sort Tasks</h3>

      {/* Filters Row - Status + Owners + Sort */}
      <div className="row mb-4">
        <div className="col-md-4">
          <ReactSelect
            label="Filter by Status"
            name="status"
            isMulti
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={statusOptions}
            placeholder="Select status..."
          />
        </div>
        <div className="col-md-4">
          <ReactSelect
            label="Filter by Owners"
            name="owners"
            isMulti
            value={selectedOwners}
            onChange={setSelectedOwners}
            options={ownerOptions}
            placeholder="Select owners..."
          />
        </div>
        <div className="col-md-4">
          <ReactSelect
            label="Sort By Due Date"
            name="sort"
            value={sortOptions.find((opt) => opt.value === sortBy)}
            onChange={(option) => setSortBy(option.value)}
            options={sortOptions}
            placeholder="Choose sort order..."
          />
        </div>
      </div>

      {/* Results Table */}
      <div>
        <p className="text-muted mb-2">
          Showing {filteredAndSortedTasks.length} of {taskData.length} tasks
        </p>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr className="table-primary">
                <th>TASKS</th>
                <th>DUE ON</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTasks.map((t) => {
                const { name, dueDate, _id } = t;
                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>{getStringDate(dueDate)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate(`/taskDetails/${_id}`)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RelatedTask;
