import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import App from "./App";
import "./index.css";
import { LoginProvider } from "./Context/loginContext";
import { ApiProvider } from "./Context/ApiContext";
import { Provider } from "react-redux";
import store from "./store/index.js";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales/index.js";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: "testenv",
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <React.StrictMode>
          <LoginProvider>
            <Provider store={store}>
              <ApiProvider>
                <App />
              </ApiProvider>
            </Provider>
          </LoginProvider>
        </React.StrictMode>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
