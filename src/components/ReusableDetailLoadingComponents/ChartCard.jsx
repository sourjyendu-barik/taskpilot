import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";
import Empty from "./Empty";
const ChartCard = ({
  title,
  children,
  emptyText = "No data available",
  height = 280,
  loading = false,
  error = null,
  empty = false,
}) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header bg-white border-bottom">
        <h6 className="mb-0">{title}</h6>
      </div>

      <div className="card-body">
        <div style={{ height }}>
          {loading && <Loading message={`Loading ${title}`} />}

          {!loading && error && <ErrorComponent message={error} />}

          {!loading && !error && empty && <Empty message={emptyText} />}

          {!loading && !error && !empty && children}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
