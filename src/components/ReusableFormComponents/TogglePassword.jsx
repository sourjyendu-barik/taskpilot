import React from "react";

const TogglePassword = ({ showPassword, setShowPassword }) => {
  return (
    <div className="form-check mb-2">
      <input
        className="form-check-input"
        type="checkbox"
        checked={showPassword}
        onChange={() => setShowPassword((prev) => !prev)}
        id="show_password"
      />
      <label className="form-check-label" htmlFor="show_password">
        {showPassword ? "Hide password" : "Show Password"}
      </label>
    </div>
  );
};

export default TogglePassword;
