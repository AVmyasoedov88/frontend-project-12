import { Field, Form, Formik } from "formik";
import { Modal } from "react-bootstrap";
import React, {  } from "react";
import useApiSocet from "../hooks/useApi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RenameChannel = (props) => {
  const { renameChannelSocet } = useApiSocet();
  const { t } = useTranslation();
  const notify = () => toast(t("channelRename"));

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
          onSubmit={async (values) => {
            try {
              await renameChannelSocet(values, notify);
              props.onHide();
            } catch (error) {
              toast.error(error);
            }
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
                {t("cancel")}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={props.onHide}
              >
                {t("send")}
              </button>
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
