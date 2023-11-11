/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable-next-line react/display-name  */
/* eslint-disable react/display-name */
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import useApiSocet from '../hooks/useApi';
import { newChannelSchema } from '../Validation/validationSchema';
import { hideModal } from '../slices/modalSlice';

const RenameChannel = () => {
  const { renameNewChannel } = useApiSocet();
  const ref = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notify = () => toast(t('channelRename'));
  const channels = useSelector((state) => state.channel.channels);
  const channelsArray = Object.values(channels).map(({ name }) => name);
  const id = useSelector((state) => state.modals.renameChannel);
  const onHide = () => {
    dispatch(hideModal('renameChannel'));
  };
  useEffect(() => {
    ref.current.focus();
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
            id,
          }}
          validationSchema={newChannelSchema(channelsArray)}
          onSubmit={async (values) => {
            try {
              await renameNewChannel(values, notify);
              onHide();
            } catch (error) {
              toast.error(error);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                innerRef={ref}
                 // required
                id="channelName"
                name="channelName"
                className={`mb-2 form-control ${
                  touched.channelName && errors.channelName ? 'is-invalid' : ''
                }`}
               // innerRef={ref}
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

export default RenameChannel;
