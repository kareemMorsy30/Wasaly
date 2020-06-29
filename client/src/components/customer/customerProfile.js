import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, Input, Button, Modal, Form, ModalHeader, ModalBody, FormGroup, ModalFooter, Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';
import { authHeader } from '../config/config';
import { objectToFormData } from 'object-to-formdata';

const CustomerProfile = (props)=>{
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const API_SERVICEOWNER_URL = `${domain}/users/one`;
    const [user, setUser] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serviceObj, setServiceObj] = useState({name: "", username: "",phones:[],address:[],status:"" ,avatar: null})
        // name: "", username: "",phones:[],address:[] ,avatar: null
    
    const toggle = () => setModal(!modal);
    useEffect(() => {
        axios.get(API_SERVICEOWNER_URL, authHeader)
            .then(response => {
                console.log("success");
                // console.log("user0", response.data);
                // console.log(response.data.address[0]["street"]);
                setUser(response.data);
                setServiceObj(response.data);
       
            })
            .catch(err => {
                if (err.response) {
                    console.log(err);
                    if (err.response.status === 404) {
                        setUser([]);
                    }
                }
            })
    }, [loading]);
    const imageChange = (e) => {
        setServiceObj({ ...serviceObj, avatar: e.target.files[0] });
    }
    const updateCustomer = async (e) => {
        e.preventDefault();
        // e.persist()
        let forum = new FormData()
        forum.append('name', serviceObj.name)
        forum.append('username', serviceObj.username)
        forum.append('status', serviceObj.status)
        forum.append('avatar', serviceObj.avatar)
        try {
            console.log(serviceObj);
            console.log(objectToFormData(serviceObj))
            // console.log(forum.get('image_path'));

            const res = await axios.patch(`${API_SERVICEOWNER_URL}/modify`, forum, authHeader)
            // console.log()
            
            console.log(res.data);
            setServiceObj(res.data);
            setLoading(!loading);
            toggle();
            console.log(serviceObj);
        } catch (error) { console.log(error) }
    }
    // console.log(user.address[0]);
    return(
        <div>
            <Card key={user._id} >
                <CardBody>
                    <CardImg src={`http://localhost:5000/${serviceObj?.avatar}`} alt="user Pic" style={{ width: "100px", height: "100px" }} />
                    <CardTitle>
                        customr Profile
                </CardTitle>
                    <CardText>
                        name:{user.name}
                    </CardText>
                    <CardText>
                        userName:{user.username}
                    </CardText>
                    <CardText>
                        Status:{user.status}
                    </CardText>
                    {user.address &&
                    <CardText>
                        address:{user.address[0].street}, {user.address[0].city}
                    </CardText>
                    }
                    <CardText>
                        phones:{user.phones}
                    </CardText>
                </CardBody>
                <button onClick={toggle} className="btn btn-primary"> Update</button>
                {/* <button onClick={toggle} className="btn btn-success" onClick={statusChange}> Change Status</button> */}
            </Card>
            <Modal isOpen={modal} toggle={toggle}>

<form encType="multipart/form-data" onSubmit={(e) => { updateCustomer(e) }}>
    <ModalHeader className="bg-dark text-white">Update Customer Data</ModalHeader>
    <ModalBody>
        <FormGroup>
            <Input type="text" value={serviceObj.name} onChange={(e) => { setServiceObj({ ...serviceObj, name: e.target.value }) }} placeholder="marketName" /><br />
            <Input type="text" value={serviceObj.username} onChange={(e) => { setServiceObj({ ...serviceObj, username: e.target.value }) }} placeholder="OwnerName" /><br />
            <Input type="text" value={serviceObj.status} onChange={(e) => { setServiceObj({ ...serviceObj, status: e.target.value }) }} placeholder="marketPhone" /><br />
            {/* <Input type="number" value={serviceObj.rating} onChange={(e)=>{setServiceObj({...serviceObj,rating:e.target.value})}} placeholder="Rating"/><br/> */}
            <Input type="file" name="avatar" onChange={imageChange} style={{ display: 'block' }} /><br />
            {/* <Form.File id="exampleFormControlFile1" onChange={imageChange} label="Example file input" />  */}
        </FormGroup>

    </ModalBody>
    <ModalFooter className="bg-dark text-white">
        <button type="submit" color="primary" >Update Data</button>
        <button color="secondary" onClick={toggle}>Cancel</button>
    </ModalFooter>
</form>
</Modal>
        </div>
    );
}
export default CustomerProfile;