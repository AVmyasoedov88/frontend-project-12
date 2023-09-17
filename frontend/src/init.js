import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { LoginProvider } from "./Context/loginContext";
import { ApiProvider } from "./Context/ApiContext";
import { Provider } from "react-redux";
import store from "./store/index.js";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales/index.js";
import LanguageDetector from "i18next-browser-languagedetector";

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
  });

  return (
    <React.StrictMode>
      <LoginProvider>
        <Provider store={store}>
          <ApiProvider>
            <App />
          </ApiProvider>
        </Provider>
      </LoginProvider>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

export default init;
