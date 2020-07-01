import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, Input, Button, Modal, Form, ModalHeader, ModalBody, FormGroup, ModalFooter, Card, CardText, CardBody, CardTitle, CardImg } from 'reactstrap';
import { authHeader } from '../config/config';
import { objectToFormData } from 'object-to-formdata';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getGeoLocation } from '../../endpoints/geocoding';
import '../../styles/delivery-section.scss';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/form.scss';
const ServiceOwnerProfile = (props) => {
    // console.log("hello");
    // const serviceOwnerId = props.match.params.id
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const API_SERVICEOWNER_URL = `${domain}/service-owners`;
    const [serviceOwner, setServiceOwner] = useState([]);
    const [user, setUser] = useState([]);
    const [productOwner, setProductOwner] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serviceObj, setServiceObj] = useState({
        distance: 0, region: 0, transportation: "", rating: 0, avatar: null,phones:[]
    })
    const [price,setPrice] = useState("")
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
    // console.log(serviceOwnerId);
    useEffect(() => {
        axios.get(API_SERVICEOWNER_URL, authHeader)
            .then(response => {
                console.log("success");
                console.log("serviceO", response.data);
                console.log("status",response.data.user)
                setServiceOwner(response.data);
                setUser(response.data.user);
                setServiceObj(response.data);
                setProductOwner(response.data.productOwner);
            })
            .catch(err => {
                if (err.response) {
                    console.log(err);
                    if (err.response.status === 404) {
                        setServiceOwner([]);
                    }
                }
            })
    }, [loading]);

    const buttonStyle = {
        border: "none",
        padding: "5px",
        cursor: "pointer",
        width: "auto",
        marginTop: "1rem",
        marginBottom: "1rem",
        fontSize: "1.5rem",
        float: "right",
        borderRadius: "8px"
    }

    const updateServiceOwner = async (e) => {
        e.preventDefault();
        // e.persist()
        let forum = new FormData()
        forum.append('distance', serviceObj.distance)
        forum.append('region', serviceObj.region)
        forum.append('transportation', serviceObj.transportation)
        forum.append('rating', serviceObj.rating)
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
console.log("phone",user.phones);
// const handleInput =(e)=>{
//     e.preventDefault();
//     setPrice(e.target.value);
//     console.log(price);
// }
// const submitInput = (e)=>{
//     setPrice(e.target.value);
// }
console.log(price);
    return (
        <div className="container vh-100">
        <div className="d-flex vh-100">
        <div className="child1 col-6">
            <Card key={serviceOwner._id} >
            <table>
                <CardBody>
                <CardTitle>
                        <h2>{user.name}'s Profile</h2>
                    </CardTitle>
                    <CardImg src={serviceObj?.user?.avatar =='/'? `http://localhost:8000/${serviceObj?.user?.avatar}`:`http://localhost:8000${serviceObj?.user?.avatar}`} alt="user Pic" style={{ width: "200px", height: "300px" }} /> 
                   
                    <tr><h3>
                    <th>userName:</th>
                    <td><CardText> {user.username}</CardText></td></h3>
                    </tr>
                    <tr><h3><th> Distance:</th>
                   <td> <CardText>
                       {serviceOwner.distance}  km
                    </CardText></td></h3></tr>
                    <tr><h3><th> Region:</th>
                    <td><CardText>
                        {serviceOwner.region}  km
                    </CardText></td></h3></tr>
                    <tr><h3><th>Transportation:</th>
                   <td> <CardText>
                        {serviceOwner.transportation}
                    </CardText></td></h3></tr>
                   <tr>
                   <h3><th>Ratings:</th>
                   <td><CardText>
                        {serviceOwner.rating}
                    </CardText></td></h3> </tr>
                    {user.address &&
                    <tr>
                        <h3><th>address:</th>
                    <td><CardText>{user.address[0].area}, {user.address[0].city} </CardText></td></h3>
                    </tr>
                }
                    <tr>
                    <h3><th>Status:</th>
                        <td><CardText>{user.status} </CardText></td></h3>
                        </tr>
                        {user.phones && user.phones.length > 0 && user.phones.map((phone,index)=>{
                       return( 
                           <tr><h3>
                        <th>phone{index+1}:</th>
                       <td><CardText>{phone} </CardText></td></h3></tr> ) })
                    }
                    {/* <tr><h3><th>price per distance:</th>
                    <td><CardText>{price}</CardText></td></h3></tr> */}

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
                    <button type="submit" className="btn btn-success" >Update Address</button>
            </form>
            {/* <form onSubmit={submitInput}>
                <input type="text" placeholder="price per distance" onChange={handleInput} />
                <button type="submit" className="btn btn-secondary">type your price per distance</button>
            </form> */}
            </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>

                <form encType="multipart/form-data" onSubmit={(e) => { updateServiceOwner(e) }}>
                    <ModalHeader className="bg-dark text-white">Update Service Owner Data</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input type="number" value={serviceObj.distance} onChange={(e) => { setServiceObj({ ...serviceObj, distance: e.target.value }) }} placeholder="Distance" /><br />
                            <Input type="number" value={serviceObj.region} onChange={(e) => { setServiceObj({ ...serviceObj, region: e.target.value }) }} placeholder="Region" /><br />
                            <Input type="text" value={serviceObj.transportation} onChange={(e) => { setServiceObj({ ...serviceObj, transportation: e.target.value }) }} placeholder="Transportation" /><br />
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
export default ServiceOwnerProfile;