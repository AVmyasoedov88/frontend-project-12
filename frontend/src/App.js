/* eslint-disable import/no-unresolved */
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Container } from "react-bootstrap";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ChatOrLogin from "./Components/ChatOrLogin";
import Error404 from "./Components/Error404";

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<ChatOrLogin />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

export default App;
