//import { useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import ChatForm from "./ChatForm.js";

const ChatOrLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { token } = auth;
  const { username } = auth;

  const { from } = location.state || { from: { pathname: "/login" } };

  return !token ? navigate(from) : <ChatForm />;
};

export default ChatOrLogin;
