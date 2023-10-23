/* eslint-disable import/no-unresolved */
import React, { StrictMode } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Error404 from './Components/Error404';
import useAuth from './hooks/useAuth';
import { paths } from './routes';
import ChatForm from './Components/ChatForm';

function PrivateRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);

  return auth ? children : <Navigate to="/login" state={{ from: location }} />;
}

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path={paths.login()} element={<Login />} />
          <Route path={paths.signup()} element={<SignUp />} />
          <Route path="*" element={<Error404 />} />
          <Route
            path={paths.privatePage()}
            element={(
              <PrivateRoute>
                <ChatForm />
              </PrivateRoute>
          )}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
