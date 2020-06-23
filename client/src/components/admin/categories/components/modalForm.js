import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import ImageUploader from 'react-images-upload';

const ModalForm = ({ setModal, modal, unmountOnClose }) => {
    const toggle = () => setModal(!modal);

    const handleSubmit = event => {
        event.preventDefault();
    }

    // style={{border: alert.type === 'error' && !item && '1px red solid'}}

    const onDrop = (picture) => {

    }
  
    return (
        <div>
            <Form inline onSubmit={handleSubmit}>
            </Form>
            <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>Add Category</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Category name" value="" />
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button style={{borderRadius: '15px', padding: '0 5% 0 5%'}} color="success" onClick={toggle}>Submit</Button>{' '}
                    <Button style={{borderRadius: '15px', padding: '0 5% 0 5%'}} color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalForm;