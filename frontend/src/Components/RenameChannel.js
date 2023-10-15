import { Field, Form, Formik, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import React, { useRef, useEffect } from "react";
import useApiSocet from "../hooks/useApi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { newChannelSchema } from "../Validation/validationSchema";
import { forwardRef } from "react";

const RenameChannel = forwardRef((props, ref) => {
  const { renameChannelSocket } = useApiSocet();
  const { t } = useTranslation();
  const notify = () => toast(t("channelRename"));
  const channels = useSelector((state) => state.channel.channels);
  const channelsArray = Object.entries(channels).map(
    ([id, { name, removable }]) => name
  );

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{t("renameChannel")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: "",
            id: props.id,
          }}
          validationSchema={newChannelSchema(channelsArray)}
          onSubmit={async (values) => {
            console.log(values);
            try {
              await renameChannelSocket(values, notify);
              props.onHide();
            } catch (error) {
              toast.error(error);
            }
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Field
                id="channelName"
                name="channelName"
                value={values.channelName}
                className={`mb-2 form-control ${
                  touched.channelName && errors.channelName ? "is-invalid" : ""
                }`}
                innerRef={ref}
              />
              <label className="visually-hidden" htmlFor="channelName">
                Имя канала
              </label>
              <ErrorMessage
                component="div"
                name="channelName"
                className="invalid-feedback"
              />

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={props.onHide}
                >
                  {t("cancel")}
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    touched.channelName && errors.channelName ? true : false
                  }
                  //onClick={props.onHide}
                >
                  {t("send")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
});

export default RenameChannel;
