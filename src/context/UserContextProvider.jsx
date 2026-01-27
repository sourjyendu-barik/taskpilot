import React from "react";
import { createContext, useContext } from "react";
import { getUsers } from "../api/Users.api";
import useAxios from "../hooks/useAxios";
const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);
const UserContextProvider = ({ children }) => {
  const {
    data: apiResponse,
    loading: userDataLoading,
    error: userDataError,
  } = useAxios(getUsers);

  const users = apiResponse?.data || [];
  const value = { users, userDataLoading, userDataError };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
