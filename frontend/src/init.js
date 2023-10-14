import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import App from "./App";
import "./index.css";
import { LoginProvider } from "./Context/loginContext";
import ApiProvider from "./Context/ApiContext";
import { Provider } from "react-redux";
import store from "./store/index.js";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales/index.js";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  addChannel,
  makeActiveChannel,
  deleteChannel,
  renameChannel,
} from "./slices/channelSlice";
import { addMessages, addMessage } from "./slices/messageSlice";
import filter from "leo-profanity";


const init = async () => {
  
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
  });
  const socket = io("/");
  
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: "testenv",
  };

  await filter.add(filter.getDictionary("ru"));

  socket.on("connect", () => {
    socket.sendBuffer = [];
  });
  

  const addChannelSocket = (channelName, cb) => {
    socket.emit("newChannel", { name: `${channelName}` }, (response) => {
      if (response.status === "ok") {
        cb();
      }
    });
  };

  const deleteChannelSocket = (id, cb) => () => {
    socket.emit("removeChannel", { id: `${id}` }, (response) => {
      if (response.status === "ok") {
        cb();
      }
    });
  };

  const renameChannelSocket = ({ id, channelName }, cb) => {
    socket.emit(
      "renameChannel",
      {
        id: `${id}`,
        name: `${channelName}`,
      },
      (response) => {
        if (response.status === "ok") {
          cb();
        }
      }
    );
  };

  const addMessageSocket = ({ body, channelId, username }) => {
    socket.emitWithAck("newMessage", {
      body: `${body}`,
      channelId: channelId,
      username: `${username}`,
    });
  };

  socket.on("newChannel", (payload) => {
    const { id } = payload;
    store.dispatch(addChannel(payload));
    store.dispatch(makeActiveChannel(id));
  });

  socket.on("removeChannel", (payload) => {
    store.dispatch(deleteChannel(payload));
  });

  socket.on("renameChannel", (payload) => {
    store.dispatch(renameChannel(payload));
  });

  socket.on("newMessage", (payload) => {
    console.log(payload);
    store.dispatch(addMessage(payload));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <React.StrictMode>
          <LoginProvider>
            <Provider store={store}>
              <ApiProvider.Provider
                value={{
                  addChannelSocket,
                  deleteChannelSocket,
                  renameChannelSocket,
                  addMessageSocket,
                }}
              >
                <App />
              </ApiProvider.Provider>
            </Provider>
          </LoginProvider>
        </React.StrictMode>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
export default init;
