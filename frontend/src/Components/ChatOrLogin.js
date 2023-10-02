//import { useContext } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import ChatForm from "./ChatForm.js";


const ChatOrLogin = () => {
  //const navigate = useNavigate();
  
  const location = useLocation();
  const { auth } = useAuth();
  const { token } = auth;
  

  //const { from } = location.state || { from: { pathname: "/login" } };

  return (

    token
    ? <ChatForm />
    : <Navigate to="/login" state={{ from: location }} replace />
  )
  //!token ? navigate(from) : <ChatForm />;
};

export default ChatOrLogin;
