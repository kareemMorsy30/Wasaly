import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, Input, Button, Modal, Form, ModalHeader, ModalBody, FormGroup, ModalFooter, Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';
import { authHeader } from '../config/config';
import { objectToFormData } from 'object-to-formdata';
import { getGeoLocation } from '../../endpoints/geocoding';
import '../../styles/delivery-section.scss';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/form.scss';
const CustomerProfile = (props)=>{
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const API_SERVICEOWNER_URL = `${domain}/users/one`;
    const [user, setUser] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serviceObj, setServiceObj] = useState({name: "", username: "",phones:[],address:[],status:"" ,avatar: null})
        // name: "", username: "",phones:[],address:[] ,avatar: null
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
            const res = await axios.patch(`${API_SERVICEOWNER_URL}/modify/address`,{address}, authHeader)
            // console.log()
            
            console.log(res.data);
            setAddress(res.data);
            setLoading(!loading);
            // toggle();
            console.log(serviceObj);
        } catch (error) { console.log(error) }
    }
    const updateCustomer = async (e) => {
        e.preventDefault();
        // e.persist()
        let forum = new FormData()
        forum.append('name', serviceObj.name)
        forum.append('username', serviceObj.username)
        forum.append('status', serviceObj.status)
        // forum.append('phones', serviceObj.phones)
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
        <div className="container  vh-100">
        <div className="d-flex vh-100">
        <div  className="child1 col-6">
            <Card key={user._id} >
            <table>
                <CardBody>
                <CardTitle><h2>{user.name}'s Profile</h2></CardTitle>
                    <CardImg src={serviceObj?.avatar =='/'? `http://localhost:5000/${serviceObj?.avatar}`:`http://localhost:5000${serviceObj?.avatar}`} alt="user Pic" style={{ width: "200px", height: "300px" }} />
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
                </CardBody>
                </table>
                <button onClick={toggle} className="btn btn-primary"> Update</button>
                {/* <button onClick={toggle} className="btn btn-success" onClick={statusChange}> Change Status</button> */}
            </Card>
            </div>
            <div className="child2 col-6" >
            <form onSubmit={submitForm}>
            <input type="text" placeholder="From" value={fromValue} onChange={updateAddress} list="from" style={{border: alert.type === 'error' && !address.area && '1px red solid'}}/>
                    <datalist id="from">
                        <option key="source" value={address.area}/>
                    </datalist>
                    <button type="submit"  className="btn btn-success" >Update Address</button>
            </form>
            </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>

<form encType="multipart/form-data" onSubmit={(e) => { updateCustomer(e) }}>
    <ModalHeader className="bg-dark text-white">Update Customer Data</ModalHeader>
    <ModalBody>
        <FormGroup>
            <Input type="text" value={serviceObj.name} onChange={(e) => { setServiceObj({ ...serviceObj, name: e.target.value }) }} placeholder="marketName" /><br />
            <Input type="text" value={serviceObj.username} onChange={(e) => { setServiceObj({ ...serviceObj, username: e.target.value }) }} placeholder="OwnerName" /><br />
            <label for="status">Choose a status:</label>
            <select name="status" id="status" onChange={(e) => { setServiceObj({ ...serviceObj, status: e.target.value }) }}>
            <option value="Online" >Online</option>
            <option value="Offline" >Offline</option>
            </select>
            {/* <Input type="text" value={serviceObj.status} onChange={(e) => { setServiceObj({ ...serviceObj, status: e.target.value }) }} placeholder="marketPhone" /><br /> */}
            {/* <Input type="number" value={serviceObj.phones} onChange={(e)=>{setServiceObj({...serviceObj,phones:e.target.value})}} placeholder="Phones"/><br/> */}
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