import { useSelector, useDispatch } from "react-redux";
import {
  addChannel,
  makeActiveChannel,
  addMessages,
} from "../slices/channelMessageSlice";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ChatHeader = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(
    (state) => state.channelMessage.currentChannelId
  );

  const channels = useSelector((state) => state.channelMessage.channels);

  const countMessages = useSelector(
    (state) =>
      Object.entries(state.channelMessage.messages).filter(
        ([id, { channelId }]) => channelId === currentChannelId
      ).length
  );

  const activeChannelName =
    Object.keys(channels).length > 0 ? channels[currentChannelId].name : "";

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {activeChannelName}</b>
      </p>
      <span className="text-muted"> {t("key", { count: countMessages })}</span>
    </div>
  );
};

export default ChatHeader;
