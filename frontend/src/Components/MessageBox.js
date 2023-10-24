/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import React from 'react';

const MessageBox = () => {
  const currentChannelId = useSelector(
    (state) => state.channel.currentChannelId,
  );

  const messages = useSelector((state) => state.message.messages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {Object.entries(messages)
        .filter(([id, { body, channelId }]) => channelId === currentChannelId)
        .map(([id, { body, username }]) => (
          <div className="text-break mb-2" key={id}>
            <b>{username}: </b>
            <span>{filter.clean(body)}</span>
          </div>
        ))}
    </div>
  );
};
export default MessageBox;
