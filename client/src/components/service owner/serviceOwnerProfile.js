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
    const [productOwner, setProductOwner] = useState([]);
    const [serviceDistance, setServiceDistance] = useState("");
    const [serviceRegion, setServiceRegion] = useState("");
    const [serviceTransportation, setServiceTransportation] = useState("");
    const [serviceRating, setServiceRating] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    console.log(serviceOwnerId);
    useEffect(() => {
        axios.get('http://localhost:5000/service-owners/5ee65308b60c072b27451ab9', authHeader)
    .then(response => {

        console.log("success");
        console.log("serviceO",response.data);
        setServiceOwner(response.data)
        // setProductOwner(response.data.productOwner)
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
        forum.append('distance', serviceDistance)
        forum.append('region',serviceRegion)
        forum.append('transportation',serviceTransportation)
        forum.append('rating',serviceRating)
        try {
            console.log(serviceDistance);
            // console.log(forum.get('image_path'));
            const response = await axios.patch(
                `http://localhost:5000/service-owners/5ee65308b60c072b27451ab9`,
                forum , authHeader
            );
            console.log(serviceOwner);
            setServiceOwner(owner=>owner.concat(response.data));
            toggle();
            console.log(serviceOwner);
        } catch (error) {console.log(error)}
       
    }
    
    
    
    return(
        <div>
           <Card key={serviceOwner._id} style={{ width: "20rem", marginLeft: "22rem", marginTop: "2rem" }} >
              <CardBody>
              <CardImg />
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
               </CardBody>
               <button style={buttonStyle} onClick={toggle} className="bg-dark text-white"> 
                <FontAwesomeIcon icon={faPlusCircle} />
            </button>
             </Card>
             <Modal isOpen={modal} toggle={toggle}>
        <form encType="multipart/form-data" onSubmit={(e)=>{updateServiceOwner(e)}}>
            <ModalHeader className="bg-dark text-white">Update Service Owner Data</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Input type="number" value={serviceDistance} onChange={(e)=>{setServiceDistance(e.target.value)}} placeholder="Distance" /><br/>
                    <Input type="number" value={serviceRegion} onChange={(e)=>{setServiceRegion(e.target.value)}}  placeholder="Region"/><br/>
                    <Input type="text" value={serviceTransportation} onChange={(e)=>{setServiceTransportation(e.target.value)}} placeholder="Transportation"/><br/>
                    <Input type="number" value={serviceRating} onChange={(e)=>{setServiceRating(e.target.value)}} placeholder="Rating"/><br/>
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