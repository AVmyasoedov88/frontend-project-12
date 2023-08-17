/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const loginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const username = window.localStorage.getItem("username");
  const [user, setUser] = useState({ token, username });
  const login = (res) => {
    window.localStorage.setItem("token", res.token);
    window.localStorage.setItem("username", res.token);
    setUser(res);
  };
  return (
    <loginContext.Provider value={{ user, login }}>
      {children}
    </loginContext.Provider>
  );
};

export default loginContext;