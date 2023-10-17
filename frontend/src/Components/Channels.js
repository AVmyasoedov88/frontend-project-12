import { Button, ButtonGroup, Dropdown, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { makeActiveChannel } from '../slices/channelSlice';
import React, { useState, useRef } from 'react';
import RenameChannel from './RenameChannel';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import DeleteChannel from './DeleteChannel';
const Channels = () => {
  const dispatch = useDispatch();
  const [renameModalShow, setRenameModalShow] = useState(false);
  const [showDeleteChannel, setDeleteChannel] = useState(false);

  const { t } = useTranslation();

  const channels = useSelector((state) => state.channel.channels);

  const currentChannelId = useSelector(
    (state) => state.channel.currentChannelId
  );

  const handleClick = (id) => () => {
    dispatch(makeActiveChannel(id));
  };

  const inputEl = useRef(null);

  async function click() {
    await setRenameModalShow(true);

    if (!renameModalShow) {
      inputEl.current.focus();
    }
  }

  return (
    <Nav variant="pills" as="ul">
      {Object.entries(channels).map(([id, { name, removable }]) => (
        <Nav.Item key={id} className="nav-item w-100">
          <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
            <Button
              variant={id === currentChannelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start text-truncate btn"
              onClick={handleClick(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>

            {removable ? (
              <>
                <Dropdown.Toggle
                  id="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
                  variant="light"
                >
                  <label className="visually-hidden">Управление каналом</label>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="1"
                    className="btn btn-danger"
                    onClick={() => setDeleteChannel(true)}
                  >
                    {t('delete')}
                  </Dropdown.Item>
                  <DeleteChannel
                    show={showDeleteChannel}
                    id={id}
                    onHide={() => setDeleteChannel(false)}
                  />

                  <Dropdown.Item eventKey="2" onClick={() => click()}>
                    {t('rename')}
                  </Dropdown.Item>
                  <RenameChannel
                    show={renameModalShow}
                    onHide={() => setRenameModalShow(false)}
                    id={id}
                    ref={inputEl}
                  />
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
