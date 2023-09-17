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
//const stat = promisify(fs.stat);

//const promisifySocket =     promisify(socket.emit(arg));

export const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();

  const addChannelSocet = (channelName) => {
    socket.emit("newChannel", { name: `${channelName}` }, (response) => {
      console.log(response); // ok
    });
  };

  socket.on("newChannel", (payload) => {
    const { id } = payload;
    console.log("newChannel", id);
    dispatch(addChannel(payload));
    dispatch(makeActiveChannel(id));
    
  });

  const deleteChannelSocet = (id) => () => {
    socket.emit("removeChannel", { id: `${id}` });

    socket.on("removeChannel", (payload) => {
      dispatch(deleteChannel(payload));
    });
  };

  const renameChannelSocet = ({ id, channelName }) => {
    socket.emit("renameChannel", { id: `${id}`, name: `${channelName}` });
    socket.on("renameChannel", (payload) => {
      dispatch(renameChannel(payload));
    });
  };

  const addMessageSocet = ({ body, channelId, username }) => {
    try {
      socket.emit("newMessage", {
        body: `${body}`,
        channelId: channelId,
        username: `${username}`,
      });
      socket.on("newMessage", (payload) => {
        console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        dispatch(addMessage(payload));
      });
    } catch {
      console.log("ERROR");
      socket.io.on("error", (error) => {
        console.log(error);
      });
    }
  };

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
