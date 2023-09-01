import { Field, Form, Formik, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { getStatusView } from "../slices/modalViewSlice";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import {
  addChannel,
  makeActiveChannel,
  addMessages,
} from "../slices/channelMessageSlice";
import useApiSocet from "../hooks/useApi";

//const socket = io("/");
const ModalAddChannel = (props) => {
  const { addChannelSocet } = useApiSocet();

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: "",
          }}
          onSubmit={(values) => {
            addChannelSocet(values.channelName);
          }}
        >
          <Form>
            <Field
              id="channelName"
              name="channelName"
              className="mb-2 form-control"
            />

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={props.onHide}
              >
                Отменить
              </button>
              <button type="submit" className="btn btn-primary">
                Отправить
              </button>
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
