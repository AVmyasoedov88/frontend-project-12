/* eslint-disable react/function-component-definition */
import { Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import { useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import useApiSocet from '../hooks/useApi';

const FormMessage = () => {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const { username } = auth;
  const channelId = useSelector((state) => state.channel.currentChannelId);

  const { addNewMessage } = useApiSocet();
  /* const messageInput = useRef(null);
  useEffect(() => {
    messageInput.current.focus();
  }, [channelId]); */

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{
          newMessage: '',
        }}
        onSubmit={async (values, actions) => {
          const newValues = {
            body: values.newMessage,
            channelId,
            username,
          };

          await addNewMessage(newValues);
          actions.resetForm({
            values: {
              newMessage: '',
            },
          });
        }}
      >
        <Form className="py-1 border rounded-2">
          <div className="flex input-group has-validation">
            <Field
              id="newMessage"
              name="newMessage"
              className="border-0 p-0 ps-2 form-control"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
             // innerRef={messageInput}
            />

            <Button
              type="submit"
              variant="none"
              className="btn btn-group-vertical"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
              <span className="visually-hidden">{t('send')}</span>
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default FormMessage;
