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

const apiContext = createContext({});
const socket = io("/");

socket.on("connect", () => {
  socket.sendBuffer = [];
});

export const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();

  const addChannelSocet = (channelName, cb) => {
    socket.emit("newChannel", { name: `${channelName}` }, (response) => {
      if (response.status === "ok") {
        cb();
      }
    });
  };

  const deleteChannelSocet = (id, cb) => () => {
    socket.emit("removeChannel", { id: `${id}` }, (response) => {
      if (response.status === "ok") {
        cb();
      }
    });
  };

  const renameChannelSocet = ({ id, channelName }, cb) => {
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
