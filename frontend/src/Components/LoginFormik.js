import { Field, Form, Formik, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth.js";
import { requireAuth } from "../routes.js";
import axios from "axios";
//import { errorLogin } from "../slices/errorSlice.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginSchema } from "../Validation/validationSchema";
import { useState } from "react";

const FormLogin = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const { auth, logIn, logOut } = useAuth();
  const [errorLogin, setErrorLogin] = useState(false);
  const erroLoginMessage = t("login.errorLogin");

  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center mb-4">{t("enter")}</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await axios.post(requireAuth.loginPath(), values);
            logIn(res.data);

            setSubmitting(false);
            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
          } catch (err) {
            if (err.isAxiosError || err.response.status === 401) {
              setErrorLogin(true);
              return false;
            }
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form-floating mb-3">
              <Field
                name="username"
                placeholder={t("login.username")}
                className={`form-control ${
                  (touched.username && errors.username) || errorLogin
                    ? "is-invalid"
                    : ""
                }`}
                required
                autoComplete="given-name"
              />
              <label className="form-label" htmlFor="username">
                {t("login.username")}
              </label>

              <ErrorMessage
                component="div"
                name="username"
                className="invalid-feedback"
              />
            </div>

            <div className="form-floating mb-4">
              <Field
                name="password"
                type="password"
                required
                placeholder={t("password")}
                className={`form-control ${
                  (touched.password && errors.password) || errorLogin
                    ? "is-invalid"
                    : ""
                }`}
                autoComplete="current-password"
                wfd-id="id1"
              />
              <label className="form-label" htmlFor="password">
                {t("password")}
              </label>
              <ErrorMessage
                component="div"
                name="password"
                className="invalid-feedback"
              />
            {errorLogin ? (
              <div className="invalid-tooltip" text="Неверные имя пользователя или пароль">{erroLoginMessage}</div>
            ) : null}
             
            </div>


            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
              disabled={isSubmitting}
            >
              {t("enter")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormLogin;
