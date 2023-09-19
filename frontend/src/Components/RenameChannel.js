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
import { useTranslation } from "react-i18next";


const RenameChannel = (props) => {
  const { renameChannelSocet } = useApiSocet();
  const { t } = useTranslation();

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: "",
            id: props.id
          }}
          onSubmit={(values) => {
           //console.log(values)
            renameChannelSocet(values);
            // alert(JSON.stringify(values, null, 2));
            //alert(props.id)
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
                {t('cancel')}
              </button>
              <button 
              type="submit" 
              className="btn btn-primary"
              onClick={props.onHide}
              >
                {t('send')}
              </button>
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
