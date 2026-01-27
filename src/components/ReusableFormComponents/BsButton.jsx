const BsButton = ({
  children,
  type = "button",
  width,
  color = "primary",
  onClick = () => {},
  ...rest
}) => {
  return (
    <button
      className={`btn btn-${color} ${!width ? "" : `w-${width}`}`}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BsButton;
