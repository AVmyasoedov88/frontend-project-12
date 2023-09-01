import {
  Container,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Nav,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addChannel,
  makeActiveChannel,
  addMessages,
  deleteChannel,
} from "../slices/channelMessageSlice";
import { io } from "socket.io-client";
import useApiSocet from "../hooks/useApi";
import React, { useEffect, useState } from "react";
import RenameChannel from "./RenameChannel";

const socket = io("/");

const Channels = () => {
  const dispatch = useDispatch();
  const [renameModalShow, setRenameModalShow] = useState(false);
  const { deleteChannelSocet } = useApiSocet();

  //получить данные из state, через map вставить
  const channels = useSelector((state) => state.channelMessage.channels);
  const currentChannelId = useSelector(
    (state) => state.channelMessage.currentChannelId
  );
  // console.log(currentChannelId)
  // Возвращает метод store.dispatch() текущего хранилища
  const handleClick = (id) => () => {
    //alert(`Check button ${id}`)
    dispatch(makeActiveChannel(id));
  };

  const showRenameChannel = () => {
    //<RenameChannel show={modalShow} onHide={() => setModalShow(false)} />;
    console.log("rename");
  };

  //

  return (
    <Nav variant="pills" as="ul">
      {Object.entries(channels).map(([id, { name, removable }]) => (
        <Nav.Item key={id} className="nav-item w-100">
          <ButtonGroup className="d-flex dropdown btn-group" key={id}>
            <Button
              variant={Number(id) === currentChannelId ? "secondary" : "light"}
              className="w-100 rounded-0 text-start text-truncate btn"
              onClick={handleClick(id)}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
            {removable ? (
              <DropdownButton
                variant="light"
                as={ButtonGroup}
                title=""
                id="bg-vertical-dropdown-1"
                
              >
                <Dropdown.Item eventKey="1" onClick={deleteChannelSocet(id)}>
                  Удалить
                </Dropdown.Item>
                <Dropdown.Item eventKey="2"onClick={() => setRenameModalShow(true)}>Переименовать</Dropdown.Item>
                <RenameChannel
                  show={renameModalShow}
                  onHide={() => setRenameModalShow(false)}
                />
              </DropdownButton>
            ) : null}
          </ButtonGroup>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Channels;
