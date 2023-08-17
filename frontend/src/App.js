/* eslint-disable import/no-unresolved */
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Chat from "./Components/Chat.js";


const App = () => (
  <React.StrictMode>
    
          <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
  
    </React.StrictMode>
);

export default App;
