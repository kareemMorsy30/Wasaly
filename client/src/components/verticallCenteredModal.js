import { Modal, Button } from 'react-bootstrap';
import React from 'react'
import "../styles/modal.scss";
import ModalTitle from 'react-bootstrap/ModalTitle'

function VerticallyCenteredModal(props) {
  return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.handleClose}
        className="modal-product-layout"
      >
        <div onClick={e => e.stopPropagation()}>
        <Modal.Header closeButton={true}>
          <Modal.Title id="contained-modal-title-vcenter" closeButton={true}>
            {props.title}
          </Modal.Title>
        </Modal.Header>
        {props.body &&

          <Modal.Body>
            <h4>{props.body}</h4>

          </Modal.Body>
        }
        <Modal.Footer>
          {props.children}
        </Modal.Footer>
    </div>
      </Modal>
  );
}

export default VerticallyCenteredModal