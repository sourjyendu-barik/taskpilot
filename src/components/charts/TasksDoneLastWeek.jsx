const TasksDoneLastWeek = ({ data }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <h1 className="fw-bold display-4 mb-0 text-primary">{data ?? 0}</h1>
      <small className="text-muted">Tasks completed</small>
    </div>
  );
};

export default TasksDoneLastWeek;
