/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const loginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const username = window.localStorage.getItem("username");
  const [auth, setAuth] = useState({ token, username });
  const login = (res) => {
    window.localStorage.setItem("token", res.token);
    window.localStorage.setItem("username", res.username);
    setAuth(res);
  };
  return (
    <loginContext.Provider value={{ auth, login }}>
      {children}
    </loginContext.Provider>
  );
};

export default loginContext;