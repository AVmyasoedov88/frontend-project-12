import { useSelector, useDispatch } from "react-redux";
import {
  addChannel,
  makeActiveChannel,
  addMessages,
} from "../slices/channelMessageSlice";

const MessageBox = () => {
  const currentChannelId = useSelector(
    (state) => state.channelMessage.currentChannelId
  );

  const messages = useSelector((state) => state.channelMessage.messages);

  //console.log(Object.entries(messages));

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {Object.entries(messages)
        .filter(
          ([id, { body, channelId }]) =>
            channelId === currentChannelId
        )
        .map(([id, { body, username }]) => (
          <div className="text-break mb-2" key={id}>
            
            <b>{username}: </b>
            <span>{body}</span>
            
            
          </div>
        ))}
    </div>
  );
};
export default MessageBox;
