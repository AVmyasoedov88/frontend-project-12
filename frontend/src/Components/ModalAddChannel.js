/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/display-name */
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import useApiSocet from '../hooks/useApi';
import { newChannelSchema } from '../Validation/validationSchema';
import 'react-toastify/dist/ReactToastify.css';
import { hideModal } from '../slices/modalSlice';

const ModalAddChannel = () => {
  const { createNewChannel } = useApiSocet();
  const ref = useRef();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channel.channels);
  const channelsArray = Object.values(channels).map(({ name }) => name);

  const notify = () => toast.success(t('addChannel'));

  const onHide = () => {
    dispatch(hideModal('newChannel'));
  };

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t('addNewChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
          }}
          validationSchema={newChannelSchema(channelsArray)}
          onSubmit={(values) => {
            createNewChannel(values.channelName, notify, onHide);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                innerRef={ref}
                id="channelName"
                required
                name="channelName"
                type="text"
                className={`mb-2 form-control ${
                  touched.channelName && errors.channelName ? 'is-invalid' : ''
                }`}

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
                <Button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={onHide}
                >
                  {t('cancel')}
                </Button>
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!!(touched.channelName && errors.channelName)}
                >
                  {t('send')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
