/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeActiveChannel } from '../slices/channelSlice';
import 'react-toastify/dist/ReactToastify.css';
import { showRenameChannel, showDeleteChannel } from '../slices/modalSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector((state) => state.channel.channels);

  const currentChannelId = useSelector(
    (state) => state.channel.currentChannelId,
  );

  const handleClick = (id) => () => {
    dispatch(makeActiveChannel(id));
  };

  const onRenameChannel = (id) => () => {
    dispatch(showRenameChannel(id));
  };

  const onDeleteChannel = (id) => () => {
    dispatch(showDeleteChannel(id));
  };

  return (
    <Nav variant="pills" as="ul" align="start" className="overflow-auto">
      {Object.entries(channels).map(([id, { name, removable }]) => (
        <Nav.Item key={id} as="li" className="w-100">
          <Dropdown as={ButtonGroup} className="d-flex" align="start">
            <Button
              variant={+id === +currentChannelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start text-truncate"
              onClick={handleClick(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>

            {removable ? (
              <>
                <Dropdown.Toggle
                  variant={+id === +currentChannelId ? 'secondary' : 'light'}
                  split

                >
                  <label className="visually-hidden" htmlFor="channel">
                    Управление каналом
                  </label>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1" className="btn btn-danger" onClick={onDeleteChannel(id)}>
                    {t('delete')}
                  </Dropdown.Item>

                  <Dropdown.Item eventKey="2" onClick={onRenameChannel(id)}>
                    {t('rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </>
            ) : null}
          </Dropdown>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Channels;
