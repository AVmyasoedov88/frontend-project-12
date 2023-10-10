import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Nav,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { makeActiveChannel } from "../slices/channelSlice";
import useApiSocet from "../hooks/useApi";
import React, { useState } from "react";
import RenameChannel from "./RenameChannel";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Channels = () => {
  const dispatch = useDispatch();
  const [renameModalShow, setRenameModalShow] = useState(false);
  const { deleteChannelSocket } = useApiSocet();
  const { t } = useTranslation();
  const notify = () => toast.success(t("deleteChannel"));

  const channels = useSelector((state) => state.channel.channels);
  const currentChannelId = useSelector(
    (state) => state.channel.currentChannelId
  );

  const handleClick = (id) => () => {
    dispatch(makeActiveChannel(id));
  };

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
                <Dropdown.Item
                  eventKey="1"
                  onClick={deleteChannelSocket(id, notify)}
                >
                  {t("delete")}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => setRenameModalShow(true)}
                >
                  {t("rename")}
                </Dropdown.Item>
                <RenameChannel
                  show={renameModalShow}
                  onHide={() => setRenameModalShow(false)}
                  id={id}
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
