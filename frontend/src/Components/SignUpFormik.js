/* eslint-disable no-unused-vars */
import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth.js";
import routes from "../hooks/routes.js";
import axios from "axios";
import { errorLogin } from "../slices/errorSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Минимум 3 буквы")
    .max(20, "Максимум 20 букв")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле"),
  confirmPassword: Yup.string()
  .required("Обязательное поле")
  .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
  
});

const SignUpLogin = () => {
  const { auth, login } = useAuth();
  //const [error, setError] = useState(false);
  const error = useSelector((state) => state.errors.errorLogin);
  console.log(error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h1 className="text-center mb-4">Регистрация</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const {username, password} = values
          try {
            const res = await axios.post(routes.signUpPath(), {username, password}); //переделать
            login(res.data);
            setSubmitting(false);
            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
            dispatch(errorLogin(null));
          } catch (err) {
            console.log(err)
            dispatch(errorLogin(err.code));
          }
        }}
      >
        {({ errors, touched, isSubmitting, handleReset, handleSubmit }) => (
          <Form>
            <div className="form-floating mb-3">
              <Field
                name="username"
                placeholder="Ваш ник"
                className={`form-control ${
                  touched.username && errors.username ? "is-invalid" : ""
                }`}
                required
              />
              <ErrorMessage
                component="div"
                name="username"
                className="invalid-tooltip"
              />
            </div>

            <div className="form-floating mb-4">
              <Field
                name="password"
                type="password"
                required
                placeholder="Пароль"
                className={`form-control ${
                  touched.password && errors.password ? "is-invalid" : ""
                }`}
                autoComplete="current-password"
                wfd-id="id1"
              />
              <ErrorMessage
                component="div"
                name="password"
                className="invalid-tooltip"
              />
            </div>
            <div className="form-floating mb-4">
              <Field
                name="confirmPassword"
                type="password"
                required
                placeholder="Пароль"
                className={`form-control ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                autoComplete="current-password"
                wfd-id="id1"
              />
              <ErrorMessage
                component="div"
                name="confirmPassword"
                className="invalid-tooltip"
              />
            </div>
            {error ? <div >Такой пользователь уже существует</div> : null}
            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
              disabled={isSubmitting}
              //onClick={handleReset}
            >
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpLogin;
