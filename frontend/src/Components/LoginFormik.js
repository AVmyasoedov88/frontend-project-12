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
    .min(2, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле"),
});

const FormLogin = () => {
  const inputEl = useRef(null);
  const { user, login } = useAuth();
  //const [error, setError] = useState(false);
  const error = useSelector((state) => state.errors.errorLogin);
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h1 className="text-center mb-4">Войти</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await axios.get(
              "https://jsonplaceholder.typicode.com/todos/1"
            ); //переделать
            console.log(res.status);
            setSubmitting(false);
            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
            dispatch(errorLogin(null));
          } catch (err) {
            dispatch(errorLogin(err.code));
            //console.log(error)
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
                className="invalid-feedback"
              />
            </div>

            <div className="form-floating mb-4">
              <Field
                name="password"
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
                className="invalid-feedback"
              />
            </div>
            {error ? <div>{error}</div> : null}
            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
              disabled={isSubmitting}
              //onClick={handleReset}
            >
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormLogin;
