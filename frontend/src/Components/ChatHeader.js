import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function ChatHeader() {
  const { t } = useTranslation();
  const currentChannelId = useSelector(
    (state) => state.channel.currentChannelId,
  );

  const channels = useSelector((state) => state.channel.channels);
  const countMessages = useSelector(
    (state) => Object.entries(state.message.messages).filter(
      ([{ channelId }]) => channelId === currentChannelId,
    ).length,
  );
  const activeChannelName = Object.keys(channels).length > 0 ? channels[currentChannelId].name : '';

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {activeChannelName}
        </b>
      </p>
      <span className="text-muted">
        {' '}
        {t('key', { count: countMessages })}
      </span>
    </div>
  );
}

export default ChatHeader;
