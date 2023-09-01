/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  addChannel,
  makeActiveChannel,
  addMessages,
  deleteChannel
} from "../slices/channelMessageSlice";

const apiContext = createContext({});
const socket = io("/");

export const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();

  const addChannelSocet = (channelName) => {
    socket.emit("newChannel", { name: `${channelName}` });
    socket.on("newChannel", (payload) => {
      dispatch(addChannel(payload));
      console.log(payload);
      //обработать ошибки
    });
  };

  const deleteChannelSocet = (id) => () => {
  
    socket.emit("removeChannel", { id: `${id}` });
    socket.on("removeChannel", (payload) => {
      console.log(payload); // { id: 6 };
      dispatch(deleteChannel(payload));
    });
  };

  const renameChannelSocet = (id) => () => {
    //socket.emit('renameChannel', { id: 7, name: "new name channel" });
  // work renamemodal
  }

  return (
    <apiContext.Provider value={{ addChannelSocet, deleteChannelSocet }}>
      {children}
    </apiContext.Provider>
  );
};

export default apiContext;
