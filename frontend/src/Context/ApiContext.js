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

//const util = require('node:util');

const apiContext = createContext({});
const socket = io("/");

export const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();

  const addChannelSocet = async (channelName) => {
    try {
      await socket.emitWithAck("newChannel", { name: `${channelName}` });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteChannelSocet = (id) => async () => {
    try {
      await socket.emitWithAck("removeChannel", { id: `${id}` });
    } catch (err) {
      console.log(err);
    }
  };

  const renameChannelSocet = async ({ id, channelName }) => {
    try {
      await socket.emitWithAck("renameChannel", {
        id: `${id}`,
        name: `${channelName}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addMessageSocet = async ({ body, channelId, username }) => {
    try {
      await socket.emitWithAck("newMessage", {
        body: `${body}`,
        channelId: channelId,
        username: `${username}`,
      });
    } catch {
      console.log("ERROR");
    }
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
