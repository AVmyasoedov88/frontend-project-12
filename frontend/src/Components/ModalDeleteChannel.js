/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import useApiSocet from '../hooks/useApi';
import 'react-toastify/dist/ReactToastify.css';
import { hideModal } from '../slices/modalSlice';

const DeleteChannel = () => {
  const dispatch = useDispatch();
  const { deleteNewChannel } = useApiSocet();
  const { t } = useTranslation();
  const notify = () => toast.success(t('deleteChannel'));
  const id = useSelector((state) => state.modals.deleteChannel);
  const onHide = () => {
    dispatch(hideModal('deleteChannel'));
  };

  const deleteChannel = async () => {
    try {
      await deleteNewChannel(id, notify);
      onHide();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Modal centered show>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t('channelDelete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('areYouSure')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('cancel')}
        </Button>
        <Button type="submit" variant="danger" onClick={deleteChannel}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannel;
