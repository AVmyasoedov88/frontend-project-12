import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import Channels from "./Channels";
import ChatHeader from "./ChatHeader.js";
import FormMessage from "./FormMessage";
import Header from "./Header";
import MessageBox from "./MessageBox";
import { useSelector, useDispatch } from "react-redux";
import {
  addChannels,
  makeActiveChannel,
  addMessages,
} from "../slices/channelMessageSlice";
import { getStatusView } from "../slices/modalViewSlice.js";
import ModalAddChannel from "./ModalAddChannel";
import routes from "../hooks/routes";

const ChatForm = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const ref = useRef();


  useEffect(() => {
    async function fetchData() {
      const { token } = auth;
      const response = await axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(makeActiveChannel(response.data.currentChannelId));
      dispatch(addChannels(response.data.channels));
      dispatch(addMessages(response.data.messages));
    }
    fetchData();
  }, [dispatch]);

  return (
    <Container className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="row h-100 bg-white flex-md-row">
          <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <Button
                onClick={() => setModalShow(true)}
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
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
              </Button>
            </div>

            <ModalAddChannel
              ref={ref}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

            <Channels />
          </Col>

          <Col className="col p-0 h-100">
            <ChatHeader />
            <MessageBox />
            <FormMessage />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ChatForm;
