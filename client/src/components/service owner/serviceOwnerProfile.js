import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, Input,Button,Modal ,ModalHeader,ModalBody,FormGroup,ModalFooter,Card, CardText, CardBody, CardTitle, CardImg} from 'reactstrap'; 
import {authHeader} from '../config/config'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ServiceOwnerProfile =({match})=>{
    const serviceOwnerId =  match.params.id  
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const API_SERVICEOWNER_URL = `${domain}/service-owners/${serviceOwnerId}`;
    const [serviceOwner, setServiceOwner] = useState([]);
    const [user, setUser] = useState([]);
    const [productOwner, setProductOwner] = useState([]);
    // const [serviceDistance, setServiceDistance] = useState("");
    // const [serviceRegion, setServiceRegion] = useState("");
    // const [serviceTransportation, setServiceTransportation] = useState("");
    // const [serviceRating, setServiceRating] = useState("");
    const [imagePath,setImagePath ] = useState("");
    const [modal, setModal] = useState(false);
    const [serviceObj,setServiceObj] = useState({
        distance:0,region:0,transportation:"",rating:0
    })
    const toggle = () => setModal(!modal);
    console.log(serviceOwnerId);
    useEffect(() => {
        axios.get('http://localhost:5000/service-owners/5ef284d743ed7e1916f4aa22', authHeader)
    .then(response => {
        console.log("success");
        console.log("serviceO",response.data);
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
    })} , []);       

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
    
    const updateServiceOwner = async(e)=>{
        e.preventDefault();
        let forum = new FormData()
        forum.set('distance', serviceObj.distance)
        forum.set('region',serviceObj.region)
        forum.set('transportation',serviceObj.transportation)
        forum.set('rating',serviceObj.serviceRating)
        try {
            console.log(serviceObj);
            // console.log(forum.get('image_path'));
            const res = await axios.patch(
                `http://localhost:5000/service-owners/5ef284d743ed7e1916f4aa22`,
                forum , authHeader
            );
            // console.log(res);
            // console.log(serviceOwner);
            // console.log(forum);
            console.log(res.data);
            setServiceObj(res.data);
            toggle();
            console.log(serviceObj);
        } catch (error) {console.log(error)}  
    }
    const statusChange=async(e)=>{
        e.preventDefault();
        try{
        const response = await axios.get(
            `http://localhost:5000/service-owners/5ef284d743ed7e1916f4aa22/status`,
             authHeader
        );
        setUser(response.data.user)
        console.log(response);
        }catch(error){console.log(error)}
    }
    
    
    return(
        <div>
           <Card key={serviceOwner._id} style={{ width: "20rem", marginLeft: "22rem", marginTop: "2rem" }} >
              <CardBody>
              <CardImg src="http://localhost:5000/uploads/users/images/2020-06-23T16:35:20.178Z-64329874_2086624524776682_8448602010156007424_n.jpg" alt="serviceOwner Pic" style={{ width: "100px", height: "100px" }}/>
                <CardTitle>
                    Service Owner Profile
                </CardTitle>
                <CardText>
                    Distance:{serviceOwner.distance}
                </CardText>
                <CardText>
                    Region:{serviceOwner.region}
                </CardText>
                <CardText>
                    Transportation:{serviceOwner.transportation}
                 </CardText>
                 <CardText>
                    Ratings:{serviceOwner.rating}
                 </CardText>
                 <CardText>
                    Status:{user.status}
                 </CardText>
                 
               </CardBody>
               <button onClick={toggle} className="btn btn-primary"> Update</button>
               <button onClick={toggle} className="btn btn-success" onClick={statusChange}> Change Status</button>
             </Card>
             <Modal isOpen={modal} toggle={toggle}>
        <form encType="multipart/form-data" onSubmit={(e)=>{updateServiceOwner(e)}}>
            <ModalHeader className="bg-dark text-white">Update Service Owner Data</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Input type="number" value={serviceObj.distance} onChange={(e)=>{setServiceObj({...serviceObj,distance:e.target.value})}} placeholder="Distance" /><br/>
                    <Input type="number" value={serviceObj.region} onChange={(e)=>{setServiceObj({...serviceObj,region:e.target.value})}}  placeholder="Region"/><br/>
                    <Input type="text" value={serviceObj.transportation} onChange={(e)=>{setServiceObj({...serviceObj,transportation:e.target.value})}} placeholder="Transportation"/><br/>
                    <Input type="number" value={serviceObj.rating} onChange={(e)=>{setServiceObj({...serviceObj,rating:e.target.value})}} placeholder="Rating"/><br/>
                    {/* <Input type="file" name = "image_path" onChange={imageChange} placeholder="image"/><br/> */}
                </FormGroup>
            </ModalBody>
            <ModalFooter className="bg-dark text-white">
                <button color="primary" >Update Data</button>
                <button color="secondary" onClick={toggle}>Cancel</button>
            </ModalFooter>
            </form>
        </Modal>
        </div>
    );
}
export default ServiceOwnerProfile;