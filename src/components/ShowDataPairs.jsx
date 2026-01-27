const ShowDataPairs = ({ label, value }) => {
  return (
    <div className="row mb-1 align-items-center">
      <div className="col-sm-4">
        <label className="col-form-label fw-bold text-muted">{`${label} :`}</label>
      </div>
      <div className="col-sm-8">{value}</div>
    </div>
  );
};

export default ShowDataPairs;
