import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, Input, Button, Modal, Form, ModalHeader, ModalBody, FormGroup, ModalFooter, Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';
import { authHeader } from '../config/config';
import { objectToFormData } from 'object-to-formdata';
const ProductOwnerProfile = (props)=>{
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const API_SERVICEOWNER_URL = `${domain}/product-owners/one`;
    const [user, setUser] = useState([]);
    const [productOwner, setProductOwner] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serviceObj, setServiceObj] = useState({
        marketName: "", ownerName: "", marketPhone: "", avatar: null
    })
    const toggle = () => setModal(!modal);
    useEffect(() => {
        axios.get(API_SERVICEOWNER_URL, authHeader)
            .then(response => {
                console.log("success");
                console.log(response.data.user);
                console.log("product0", response.data);
                setProductOwner(response.data);
                setUser(response.data.user);
                setServiceObj(response.data);
             
            })
            .catch(err => {
                if (err.response) {
                    console.log(err);
                    if (err.response.status === 404) {
                        setProductOwner([]);
                    }
                }
            })
    }, [loading]);

    const statusChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `${API_SERVICEOWNER_URL}/status`,
                authHeader
            );
            setUser(response.data.user);
            setLoading(!loading);
            console.log(response);
        } catch (error) { console.log(error) }
    }
    const imageChange = (e) => {
        setServiceObj({ ...serviceObj, avatar: e.target.files[0] });
    }
    const updateProductOwner = async (e) => {
        e.preventDefault();
        // e.persist()
        let forum = new FormData()
        forum.append('marketName', serviceObj.marketName)
        forum.append('ownerName', serviceObj.ownerName)
        forum.append('marketPhone', serviceObj.marketPhone)
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
    return(
        <div>
            <Card key={productOwner._id} >
                <CardBody>
                    <CardImg src={serviceObj?.user?.avatar} alt="productOwner Pic" style={{ width: "100px", height: "100px" }} />
                    <CardTitle>
                        Product Owner Profile
                </CardTitle>
                    <CardText>
                        marketName:{productOwner.marketName}
                    </CardText>
                    <CardText>
                        ownerName:{productOwner.ownerName}
                    </CardText>
                    <CardText>
                    marketPhone:{productOwner.marketPhone}
                    </CardText>
                    <CardText>
                        Status:{user.status}
                    </CardText>
                </CardBody>
                <button onClick={toggle} className="btn btn-primary"> Update</button>
                <button onClick={toggle} className="btn btn-success" onClick={statusChange}> Change Status</button>
            </Card>
            <Modal isOpen={modal} toggle={toggle}>

                <form encType="multipart/form-data" onSubmit={(e) => { updateProductOwner(e) }}>
                    <ModalHeader className="bg-dark text-white">Update Product Owner Data</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input type="text" value={serviceObj.marketName} onChange={(e) => { setServiceObj({ ...serviceObj, marketName: e.target.value }) }} placeholder="marketName" /><br />
                            <Input type="text" value={serviceObj.ownerName} onChange={(e) => { setServiceObj({ ...serviceObj, ownerName: e.target.value }) }} placeholder="OwnerName" /><br />
                            <Input type="number" value={serviceObj.marketPhone} onChange={(e) => { setServiceObj({ ...serviceObj, marketPhone: e.target.value }) }} placeholder="marketPhone" /><br />
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
export default ProductOwnerProfile;