const getColorFromStatus = (status) => {
  switch (status) {
    case "To Do":
      return "secondary";
    case "In Progress":
      return "warning";
    case "Completed":
      return "success";
    case "Blocked":
      return "danger";
    default:
      return "secondary";
  }
};

export default getColorFromStatus;
