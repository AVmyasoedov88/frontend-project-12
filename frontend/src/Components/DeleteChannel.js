/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useApiSocet from '../hooks/useApi';
import 'react-toastify/dist/ReactToastify.css';

function DeleteChannel(props) {
  const { deleteChannelSocket } = useApiSocet();
  const { t } = useTranslation();
  const notify = () => toast.success(t('deleteChannel'));
  const deleteChannel = async () => {
    try {
      await deleteChannelSocket(props.id, notify);
      props.onHide();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channelDelete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('areYouSure')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          {t('cancel')}
        </Button>
        <Button type="submit" variant="danger" onClick={deleteChannel}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteChannel;
