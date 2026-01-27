import React from "react";
import ModalWrapper from "./ModalWrapper";
import InputGroup from "../ReusableFormComponents/InputGroup";
import TogglePassword from "../ReusableFormComponents/TogglePassword";
import BsButton from "../ReusableFormComponents/BsButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../api/AxiosInstance";
import { useAuthContxt } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
const LoginModal = ({ onClose, onGoingToSignUp }) => {
  const { login } = useAuthContxt();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login_data, setLogin_data] = useState({
    email: "",
    password: "",
  });

  const onChangeLogin = (e) => {
    const { value, name } = e.target;
    setLogin_data((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post("/auth/login", login_data);
      const { token } = response.data;
      login(token);
      toast.success("Login Successfully");
      setLogin_data({
        email: "",
        password: "",
      });
      onClose();
      navigate("/");
    } catch (e) {
      toast.error(e.response?.data?.message || "something went wrong");
    }
  };
  return (
    <ModalWrapper onClose={onClose}>
      <div className="text-center my-3">
        <h4 style={{ color: "purple" }} className="fw-bold">
          TaskPilot
        </h4>
        <h2>Login to TaskPilot</h2>
        <p>Please enter your details</p>
      </div>
      <form onSubmit={handleLogin}>
        <InputGroup
          label="Email: "
          name="email"
          type="email"
          value={login_data.email}
          onChange={onChangeLogin}
          placeholder="Enter your email"
          required
          autoComplete="username"
        />
        <InputGroup
          label="Password: "
          name="password"
          type={showPassword ? "text" : "password"}
          value={login_data.password}
          onChange={onChangeLogin}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
        />
        <TogglePassword
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <BsButton type="submit" width="100">
          Log In
        </BsButton>
      </form>
      <p className="mt-3 mb-0 text-center text-muted w-100">
        Not logged in?
        <button
          type="button"
          className="btn btn-link p-0 align-baseline"
          onClick={onGoingToSignUp}
        >
          SignUp
        </button>
      </p>
    </ModalWrapper>
  );
};

export default LoginModal;
