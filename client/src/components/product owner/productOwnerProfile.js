import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, Input, Button, Modal, Form, ModalHeader, ModalBody, FormGroup, ModalFooter, Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';
import { authHeader } from '../config/config';
import { objectToFormData } from 'object-to-formdata';
import { getGeoLocation } from '../../endpoints/geocoding';
import '../../styles/delivery-section.scss';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/form.scss';
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
    const [address, setAddress] = useState({
        area: '',
        street: '',
        city: '',
        longitude: 0,
        latitude: 0,
    });
const [fromValue, setFromValue] = useState('');
const [toValue, setToValue] = useState('');
const [suggested, setSuggested] = useState([]);    
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

    const updateAddress = event => {
        const input = event.target.value;

        setFromValue(event.target.value);

        if(input.length >= 3 && input[input.length-1] !== ' '){
            getGeoLocation(input).then(data => {
                console.log(data);

                if(data.area) setAddress({
                    
                    ...address,
                    area: data.fullArea,
                    city: data.city,
                    longitude: data.longitude,
                    latitude: data.latitude,
                });
                console.log(data.area);
                console.log(address);
                if(input > toValue && data.area && !suggested.includes(data.area) && data.area.toLowerCase().includes(input)){
                    console.log('====================================');
                    console.log(data.area);
                    console.log('====================================');
                    setSuggested([...suggested, data.area]);
                    setFromValue(data.area);
                }
            })
        }
    }
    const submitForm = async(e)=>{
        e.preventDefault();
        try {
            // console.log(serviceObj);
            // console.log(objectToFormData(serviceObj))
            // console.log(forum.get('image_path'));
            console.log("hello from submit");
            console.log(address)
            const res = await axios.patch(`${API_SERVICEOWNER_URL}/modify/address`,{address}, authHeader)
            // console.log()
            console.log("address",res.data);
            setAddress(res.data);
            setLoading(!loading);
            // toggle();
            console.log(serviceObj);
        } catch (error) { console.log(error) }
    }
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
        <div className="container  vh-100">
        <div className="d-flex vh-100">
        <div className="child1 col-6">
            <Card key={productOwner._id} >
            <table>
                <CardBody>
                <CardTitle>
                       <h3> {user.name}'s Profile</h3>
                </CardTitle>
                    <CardImg src={serviceObj?.user?.avatar} alt="productOwner Pic" style={{ width: "200px", height: "300px" }} />
                    <tr><h3>
                    <th>userName:</th>
                    <td><CardText> {user.username}</CardText></td></h3>
                    </tr>
                    <tr>
                    <h3><th>Status:</th>
                        <td><CardText>{user.status} </CardText></td></h3>
                        </tr>
                        <tr>
                        <h3><th>Email:</th>
                            <td><CardText>{user.email} </CardText></td></h3>
                        </tr>
                        {user.address &&
                    <tr>
                        <h3><th>address:</th>
                    <td><CardText>{user.address[0].area}, {user.address[0].city} </CardText></td></h3>
                    </tr>
                }
                {user.phones && user.phones.length > 1 && user.phones.map((phone,index)=>{
                       return( 
                           <tr><h3>
                        <th>phone{index+1}:</th>
                       <td><CardText>{phone} </CardText></td></h3></tr> ) })
                              
                    }
                    <tr><h3><th> marketName:</th>
                    <td><CardText>
                       {productOwner.marketName}
                    </CardText></td></h3></tr>
                    <tr><h3><th> ownerName:</th>
                    <td><CardText>
                       {productOwner.ownerName}
                    </CardText></td></h3></tr>
                    <tr><h3><th> marketPhone:</th>
                    <td><CardText>
                       {productOwner.marketPhone}
                    </CardText></td></h3></tr>
                    
                </CardBody>
                <button onClick={toggle} className="btn btn-primary"> Update</button>
                <button onClick={toggle} className="btn btn-success" onClick={statusChange}> Change Status</button>
                </table>
            </Card>
            </div>
            <div className="child2 col-6" >
            <form onSubmit={submitForm}>
            <input type="text" placeholder="address" value={fromValue} onChange={updateAddress} list="from" style={{border: alert.type === 'error' && !address.area && '1px red solid'}}/>
                    <datalist id="from">
                        <option key="source" value={address.area}/>
                    </datalist>
                    <button type="submit"  className="btn btn-success" >Update Address</button>
            </form>
            </div>
            </div>
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