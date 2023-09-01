import { useSelector, useDispatch } from "react-redux";
import {
  addChannel,
  makeActiveChannel,
  addMessages,
} from "../slices/channelMessageSlice";
import { isEmpty } from "lodash";

const ChatHeader = () => {
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
  const activeChannelName = !isEmpty(channels)
    ? channels[currentChannelId].name
    : null;
  //console.log(activeChannel)
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {activeChannelName}</b>
      </p>
      <span className="text-muted"> {countMessages} сообщение</span>
    </div>
  );
};

export default ChatHeader;
