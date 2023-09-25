/* eslint-disable react/prop-types */
import { createContext } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  addChannel,
  makeActiveChannel,
  addMessage,
  deleteChannel,
  renameChannel,
} from "../slices/channelMessageSlice";

//const {promisify} = require("es6-promisify");

const apiContext = createContext({});
const socket = io("/");

export const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();

  const addChannelSocet = (channelName) => {
    socket.emit("newChannel", { name: `${channelName}` }, (response) => {
      if (response.status === "ok") {
        console.log(response);
      }
    });
  };

  const deleteChannelSocet = (id) => () => {
    socket.emitWithAck("removeChannel", { id: `${id}` });
  };

  const renameChannelSocet = ({ id, channelName }) => {
    socket.emitWithAck("renameChannel", {
      id: `${id}`,
      name: `${channelName}`,
    });
  };

  const addMessageSocet = ({ body, channelId, username }) => {
    socket.emitWithAck("newMessage", {
      body: `${body}`,
      channelId: channelId,
      username: `${username}`,
    });
  };

  socket.on("newChannel", (payload) => {
    const { id } = payload;
    dispatch(addChannel(payload));
    dispatch(makeActiveChannel(id));
  });

  socket.on("removeChannel", (payload) => {
    dispatch(deleteChannel(payload));
  });

  socket.on("renameChannel", (payload) => {
    dispatch(renameChannel(payload));
  });

  socket.on("newMessage", (payload) => {
    console.log(payload);
    dispatch(addMessage(payload));
  });

  return (
    <apiContext.Provider
      value={{
        addChannelSocet,
        deleteChannelSocet,
        renameChannelSocet,
        addMessageSocet,
      }}
    >
      {children}
    </apiContext.Provider>
  );
};

export default apiContext;
