/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable-next-line react/display-name  */
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { Modal } from 'react-bootstrap';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useApiSocet from '../hooks/useApi';
import { newChannelSchema } from '../Validation/validationSchema';
import 'react-toastify/dist/ReactToastify.css';

const ModalAddChannel = forwardRef((props, ref) => {
  const { addChannelSocket } = useApiSocet();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channel.channels);
  const channelsArray = Object.entries(channels).map(([{ name }]) => name);
  const notify = () => toast.success(t('addChannel'));

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addNewChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          validationSchema={newChannelSchema(channelsArray)}
          onSubmit={async (values) => {
            try {
              await addChannelSocket(values.channelName, notify);
              props.onHide();
            } catch (error) {
              toast.error(error);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                id="channelName"
                name="channelName"
                type="text"
                className={`mb-2 form-control ${
                  touched.channelName && errors.channelName ? 'is-invalid' : ''
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
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!!(touched.channelName && errors.channelName)}
                >
                  {t('send')}
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
