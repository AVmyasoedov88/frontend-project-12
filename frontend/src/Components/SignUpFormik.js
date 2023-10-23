import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { requireAuth } from '../routes';
import useAuth from '../hooks/useAuth';
import { signUpSchema } from '../Validation/validationSchema';

function SignUpLogin() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [errorSignUp, setErrorSignUp] = useState(false);
  const erroLSignUpMessage = t('signUp.errorSignUp');

  return (
    <div>
      <h1 className="text-center mb-4">{t('registration')}</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { username, password } = values;
          try {
            const res = await axios.post(requireAuth.signUpPath(), {
              username,
              password,
            });

            logIn(res.data);
            setSubmitting(false);
            const { from } = location.state || {
              from: { pathname: '/' },
            };
            navigate(from);
          } catch (err) {
            if (err.isAxiosError && err.response.status === 401) {
              setErrorSignUp(true);
            }
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="form-floating mb-3">
              <Field
                name="username"
                id="username"
                placeholder={t('signUp.username')}
                className={`form-control ${
                  touched.username && errors.username ? 'is-invalid' : ''
                }`}
                required
                autoComplete="given-name"
                type="text"
              />
              <label className="form-label" htmlFor="username">
                {t('signUp.username')}
              </label>
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
                id="password"
                required
                placeholder={t('password')}
                className={`form-control ${
                  touched.password && errors.password ? 'is-invalid' : ''
                }`}
                autoComplete="current-password"
                wfd-id="id1"
              />
              <label className="form-label" htmlFor="password">
                {t('password')}
              </label>
              <ErrorMessage
                component="div"
                name="password"
                className="invalid-tooltip"
              />
            </div>
            <div className="form-floating mb-4">
              <Field
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                required
                placeholder={t('confirmPassword')}
                className={`form-control ${
                  touched.confirmPassword && errors.confirmPassword
                    ? 'is-invalid'
                    : ''
                }`}
                autoComplete="current-password"
                wfd-id="id1"
              />
              <label className="form-label" htmlFor="confirmPassword">
                {t('confirmPassword')}
              </label>
              <ErrorMessage
                component="div"
                name="confirmPassword"
                className="invalid-tooltip"
              />
              {errorSignUp ? (
                <div className="invalid-tooltip">{erroLSignUpMessage}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
              disabled={isSubmitting}
              // onClick={handleReset}
            >
              {t('makeRegistration')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpLogin;
