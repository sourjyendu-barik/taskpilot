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
      className={`btn btn-sm btn-md btn-${color} ${!width ? "" : `w-${width}`}`}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BsButton;
