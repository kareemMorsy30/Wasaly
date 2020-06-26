import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import ImageUploader from 'react-images-upload';
import Danger from '../../../alerts/danger';
import { handleSuccess, handleError } from '../../../../errors/handleAlerts';

const ModalForm = ({ setModal, modal, unmountOnClose, data, setData, allData, setAllData, addEndpoint, editEndpoint, title, button }) => {
    const toggle = () => setModal(!modal);
    const [alert, setAlert] = useState({
        message: '',
        type: null
    });

    const handleSubmit = event => {
        event.preventDefault();
        console.log(data);
        if(!data.name || !data.image){
            handleError(setAlert, "Check required inputs!", 3000);
            return;
        }

        if(data._id == null){
            addEndpoint(data)
            .then(category => {
                setAllData([category, ...allData]);
            });
        }else if(data._id !== null){
            editEndpoint(data)
            .then(category => {
                setAllData(allData.map(updatedData => {
                    if(updatedData._id.toString() === category._id.toString()){
                        updatedData.name = category.name;
                        updatedData.image = category.image;
                    }

                    return updatedData;
                }))
            });
            setData({
                _id: null,
                name: '',
                image: ''
            });
        }

        toggle();
    }

    const onDrop = (picture) => {
        setData({...data, image: picture});
    }
  
    return (
        <div>
            <Form inline onSubmit={handleSubmit}>
            </Form>
            <Modal className="modal-layout" isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader toggle={toggle}>{title}</ModalHeader>
                    <ModalBody>
                        {alert.type === "error" && <Danger msg="Check required inputs!"/>}
                        <input type="text" placeholder="Category name" value={data.name} onChange={e => setData({...data,name: e.target.value})} style={{border: alert.type === 'error' && '1px red solid'}}/>
                        {data.image && (data.image[0] === 'h'
                        ?
                        <img style={{height: '100%', width: '100%'}} src={data.image} />
                        :
                        <img style={{height: '100%', width: '100%'}} src={`${process.env.REACT_APP_BACKEND_DOMAIN}${data.image}`} />)}
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            style={{border: alert.type === 'error' && '1px red solid'}}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" style={{borderRadius: '15px', padding: '0 5% 0 5%'}} color="success">{button}</Button>{' '}
                        <Button style={{borderRadius: '15px', padding: '0 5% 0 5%'}} color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default ModalForm;