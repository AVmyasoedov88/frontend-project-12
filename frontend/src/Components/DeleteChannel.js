import { Modal, Form, FormGroup, Button } from "react-bootstrap";
import React, { useRef, useEffect } from "react";
import useApiSocet from "../hooks/useApi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { newChannelSchema } from "../Validation/validationSchema";
import { forwardRef } from "react";
import { deleteChannel } from "../slices/channelSlice";

const DeleteChannel = (props) => {
  const { deleteChannelSocket } = useApiSocet();
  
 
  const currentChannelId = useSelector(
    (state) => state.channel.currentChannelId
  );

  const { t } = useTranslation();
  const notify = () => toast.success(t("deleteChannel"));
  const deleteChannel = async () => {
    try {
      await deleteChannelSocket(props.id, notify); 
      props.onHide();
    } catch (error) {
      toast.error(error);
    }
  };
  //ПЕРЕДЕЛАТЬ
  return (
    <>
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
    </>
  );
};

export default DeleteChannel;
