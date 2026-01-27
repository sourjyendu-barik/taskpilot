import React from "react";
import ModalWrapper from "./ModalWrapper";
import InputGroup from "../ReusableFormComponents/InputGroup";
import TogglePassword from "../ReusableFormComponents/TogglePassword";
import BsButton from "../ReusableFormComponents/BsButton";
import { useState } from "react";
import { AxiosInstance } from "../../api/AxiosInstance";
import { toast } from "react-toastify";
const SignInModal = ({ onClose, onGoingToLogin }) => {
  const [signup_data, setSignup_data] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const onchangeSignIn = (e) => {
    const { name, value } = e.target;
    setSignup_data((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post("/auth/signup", signup_data);
      toast.success("Sign up successfully");
      setSignup_data({
        name: "",
        email: "",
        password: "",
      });
      onClose();
    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  };
  return (
    <ModalWrapper onClose={onClose}>
      <div className="text-center my-3">
        <h4 style={{ color: "purple" }} className="fw-bold">
          TaskPilot
        </h4>
        <h2>Sign up to TaskPilot</h2>
        <p>Please enter your details</p>
      </div>
      <form onSubmit={handleSignup}>
        <InputGroup
          label="Name: "
          name="name"
          value={signup_data.name}
          onChange={onchangeSignIn}
          placeholder="Enter your name"
          required
          autoComplete="name"
        />
        <InputGroup
          label="Email: "
          name="email"
          type="email"
          value={signup_data.email}
          onChange={onchangeSignIn}
          placeholder="Enter your email"
          required
          autoComplete="username"
        />
        <InputGroup
          label="Password: "
          name="password"
          type={showPassword ? "text" : "password"}
          value={signup_data.password}
          onChange={onchangeSignIn}
          placeholder="Enter your password"
          required
          autoComplete="new-password"
        />
        <TogglePassword
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <BsButton type="submit" width="100">
          Sign Up
        </BsButton>
      </form>
      <p className="mt-3 mb-0 text-center text-muted w-100">
        Already signed in?
        <button
          type="button"
          className="btn btn-link p-0 align-baseline"
          onClick={onGoingToLogin}
        >
          Login
        </button>
      </p>
    </ModalWrapper>
  );
};

export default SignInModal;
