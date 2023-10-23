/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

const loginContext = createContext({});

export function LoginProvider({ children }) {
  const token = window.localStorage.getItem('token');
  const username = window.localStorage.getItem('username');
  const [auth, setAuth] = useState({ token, username });
  const logIn = (res) => {
    window.localStorage.setItem('token', res.token);
    window.localStorage.setItem('username', res.username);
    setAuth(res);
  };

  const logOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
  };

  return (
    <loginContext.Provider value={{ auth, logIn, logOut }}>
      {children}
    </loginContext.Provider>
  );
}

export default loginContext;
