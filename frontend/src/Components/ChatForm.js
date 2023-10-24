/* eslint-disable react/jsx-no-bind */
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useRef } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import Channels from './Channels';
import ChatHeader from './ChatHeader';
import FormMessage from './FormMessage';
import Header from './Header';
import MessageBox from './MessageBox';
import { addChannels, makeActiveChannel } from '../slices/channelSlice';
import { addMessages } from '../slices/messageSlice';
import ModalAddChannel from './ModalAddChannel';
import { requireAuth } from '../routes';
import 'react-toastify/dist/ReactToastify.css';

const ChatForm = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requireAuth.dataPath(), {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        dispatch(makeActiveChannel(response.data.currentChannelId));
        dispatch(addChannels(response.data.channels));
        dispatch(addMessages(response.data.messages));
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('unknownErr'));
        }
        toast.error(t('errBadRequest'));
      }
    }

    fetchData();
  }, [dispatch, auth, t]);

  const inputEl = useRef(null);

  async function handleClick() {
    await setModalShow(true);
    if (!modalShow) {
      inputEl.current.focus();
    }
  }

  return (
    <Container className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="row h-100 bg-white flex-md-row">
          <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels')}</b>
              <Button
                onClick={handleClick}
                variant="light"
                className="p-0 text-primary btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="visually-hidden">+</span>
              </Button>
            </div>

            <ModalAddChannel
              show={modalShow}
              onHide={() => setModalShow(false)}
              ref={inputEl}
            />

            <Channels />
          </Col>

          <Col className="col p-0 h-100">
            <Container className="d-flex flex-column h-100">
              <ChatHeader />
              <MessageBox />
              <FormMessage />
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ChatForm;
