import {Modal, Button} from 'react-bootstrap';
import React from 'react'

function VerticallyCenteredModal(props) {
    console.log(props)
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Delete Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are You Sure?</h4>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.deleteProduct}>Delete</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default VerticallyCenteredModal