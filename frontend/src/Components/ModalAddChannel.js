import { Field, Form, Formik, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

import useApiSocet from "../hooks/useApi";
import { newChannelSchema } from "../Validation/validationSchema";
import { useTranslation } from "react-i18next";

const ModalAddChannel = forwardRef((props, ref) => {
  const { addChannelSocet } = useApiSocet();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelMessage.channels);
  const channelsArray = Object.entries(channels).map(
    ([id, { name, removable }]) => name
  );

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{t("addNewChannel")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: "",
          }}
          validationSchema={newChannelSchema(channelsArray)}
          onSubmit={async (values) => {
            try {
             await addChannelSocet(values.channelName)
            
          
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                id="channelName"
                name="channelName"
                className={`mb-2 form-control ${
                  touched.channelName && errors.channelName ? "is-invalid" : ""
                } `}
                required
              />
              <ErrorMessage
                component="div"
                name="channelName"
                className="invalid-feedback"
              />

              <div className="d-flex justify-content-end">
                <button
                  ref={ref}
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={props.onHide}
                >
                  Отменить
                </button>
                <button
                  onClick={props.onHide}
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    touched.channelName && errors.channelName ? true : false
                  }
                >
                  Отправить
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
});

export default ModalAddChannel;
