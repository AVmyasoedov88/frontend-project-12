/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable-next-line react/display-name  */
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import useApiSocet from '../hooks/useApi';
import { newChannelSchema } from '../Validation/validationSchema';

const RenameChannel = forwardRef((props, ref) => {
  const { renameChannelSocket } = useApiSocet();
  const { t } = useTranslation();
  const notify = () => toast(t('channelRename'));
  const channels = useSelector((state) => state.channel.channels);
  const channelsArray = Object.entries(channels).map(([{ name }]) => name);

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            channelName: '',
            id: props.id,
          }}
          validationSchema={newChannelSchema(channelsArray)}
          onSubmit={async (values) => {
            try {
              await renameChannelSocket(values, notify);
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
                <Button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={props.onHide}
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
});

export default RenameChannel;
