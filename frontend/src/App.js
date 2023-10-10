/* eslint-disable import/no-unresolved */
import React, { StrictMode } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Container } from "react-bootstrap";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

import Error404 from "./Components/Error404";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
//import useAuth from "../hooks/useAuth";
import useAuth from "./hooks/useAuth";
import { paths } from "./routes";
import ChatForm from "./Components/ChatForm";

const PrivateRoute = ({ children }) => {
  const { auth, logIn, logOut } = useAuth();
  const location = useLocation();
  console.log(auth);

  return auth ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={paths.login()} element={<Login />} />
        <Route path={paths.signup()} element={<SignUp />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path={paths.privatePage()}
          element={
            <PrivateRoute>
              <ChatForm />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);

export default App;
