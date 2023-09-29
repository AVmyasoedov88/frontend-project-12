//import { useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import ChatForm from "./ChatForm.js";
import { useEffect } from "react";

const ChatOrLogin = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const { auth } = useAuth();
  const { token } = auth;
  const { username } = auth;

  const { from } = location.state || { from: { pathname: "/login" } };

  return !token ? navigate(from) : <ChatForm />;
};

export default ChatOrLogin;
