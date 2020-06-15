import React, { useState, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import axios from 'axios'
import {authHeader} from '../../config'

const UpdateProduct = (props) => {
    const [images, setImages] = useState([])
    const [loaded, setLoaded] = useState()
    const { register, errors, handleSubmit } = useForm();
    const [productname, setProductname] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [deletingImage,setDeletingImage]= useState(false)


    const {id}= props.match.params
    useEffect(() => {
        axios.get(`http://localhost:8000/product/${id}`,authHeader)
            .then(res => {
                if (res.data.name) {
                    const { description, name, price, quantity, images_path } = res.data
                    setDescription(description)
                    setProductname(name)
                    setPrice(price)
                    setQuantity(quantity)
                    setImages(images_path)
                }
            })
    }, [deletingImage])


    const onSubmit = (e) => {

       
        const data = new FormData()
        for (var x = 0; x < images.length; x++) {
            data.set('image', images[x])
        }
        data.set("name", productname)
        data.set("description", description)
        data.set("price", price)
        data.set("quantity", quantity)

        axios.patch(`http://localhost:8000/product/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res, err) => {
            toast.success('Updated successfully')
        }).catch(err => {
            console.log(err)
            toast.error('Error Submiting the form')
        })
    }

    const fileSelectedHandler = (e) => {
        if (maxSelectFile(e) && checkMimeType(e) && checkFileSize(e) && images.length + e.target.files.length <6) {
            let data= new FormData()
            for (var x = 0; x < e.target.files.length; x++) {
                data.append('file', e.target.files[x])
            }
            axios.post(`http://localhost:8000/product/${id}/images`, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUzZWNkZmY1NTEzNTYwODI2MWY0YjciLCJpYXQiOjE1OTIwNDY4NjYsImV4cCI6MTU5MjA1ODk5N30.qyPuZ7wse45E8sJl8tEaVNnDBEJ17XarOcAOJAvDJ5Y`

                }
            }).then((res) => {
                setImages((prevImages)=>[...prevImages,...res.data])
                }).catch(err=>{
                    toast.error('Error Submiting the form')
                })
            
        }
        else if(images.length + e.target.files.length > 5){
            toast.error('Number of images are more than 5')
        }
    }

    const maxSelectFile = (event) => {
        let files = event.target.files // create file object
        if (files.length > 5) {
            const msg = 'Only 5 images can be uploaded at a time'
            event.target.value = null // discard selected file
            console.log(msg)
            return false;

        }
        return true;

    }
    const checkFileSize = (event) => {
        let files = event.target.files
        let size = 3000000
        let err = "";
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                console.log(files[x].size)
                err += files[x].type + 'is too large, please pick a smaller file\n';
            }
        };
        if (err !== '') {
            event.target.value = null
            console.log(err)
            return false
        }

        return true;

    }

    const checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err += files[x].type + ' is not a supported format\n';
            }
        };

        for (var z = 0; z < err.length; z++) { // loop create toast massage
            event.target.value = null
            toast.error(err[z])
        }

        if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file

            return false;
        }
        return true;

    }

    const handleImageDeleting=(e)=>{      
        axios.delete(`http://localhost:8000/product/${id}/images/${e.target.id}`, authHeader
        ).then((res, err) => {
            setDeletingImage((prevState)=>!prevState)
            toast.success('Deleted successfully')
        }).catch(err => {
            console.log(err)            
            toast.error('Error Deleting the image')
        })
    }
    return (
        <>
            <h2>Edit the Product</h2>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="name">
                    <Form.Label>product name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        value={productname}
                        onChange={(e) => setProductname(e.target.value)}
                        placeholder="name"
                        ref={register({ required: true, minLength: 3 })} />
                </Form.Group>
                {
                    errors.name ?
                        <p className="alert alert-danger">
                            {
                                errors.name.type == "required" ?
                                    "Product Name is required" :
                                    errors.name.type == "minLength" ?
                                        "Product name is too short" : ""
                            }</p> : ""}

                <Form.Group controlId="description">
                    <Form.Label>product description</Form.Label>
                    <Form.Control
                        name="description"
                        value={description}
                        as="textarea"
                        rows="4"
                        placeholder="Description..."
                        onChange={(e) => setDescription(e.target.value)}
                        ref={register({ required: true, minLength: 10 })} />
                </Form.Group>
                {
                    errors.description ?
                        <p className="alert alert-danger">
                            {
                                errors.description.type == "required" ?
                                    "Product description is required" :
                                    errors.description.type == "minLength" ?
                                        "Product description is too short" : ""
                            }</p> : ''
                }

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>


                    <Form.Control
                        name="price"
                        value={price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="price"
                        ref={register({ required: true, min: 0 })} />
                </Form.Group>
                {
                    errors.price ?
                        <p className="alert alert-danger">
                            {
                                errors.price.type == "required" ?
                                    "Product price is required" :
                                    errors.price.type == "min" ?
                                        "Product price can not be negative" : ""}</p> : ""
                }


                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        name="quantity"
                        value={quantity}
                        type="number"
                        placeholder="quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        ref={register({ required: true, min: 0 })} />
                </Form.Group>
                {errors.quantity ?
                    <p className="alert alert-danger">
                        {
                            errors.quantity.type === "required" ?
                                "Product price is required" :
                                errors.quantity.type == "min" ?
                                    "Product price can not be negative" : ""
                        }
                    </p> : ""
                }


                <Form.File
                    id="custom-file"
                    label="Custom file input"
                    custom
                    name="images"
                    multiple
                    onChange={fileSelectedHandler}
                    ref={register({ required: images.length === 0 ? true : false })}
                />
                {errors.images && <p className="alert alert-danger">Product images is required</p>}
                <div className="container">
                    <div className="row">

                        {images.map((image, i) => {
                            let display = "none"
                            return (<div className="col-sm">
                                <img onClick={handleImageDeleting} id={image} src="https://image.flaticon.com/icons/svg/261/261935.svg" style={{ width: '40px', height: '40px' }} />

                                <img  className="img-thumbnail" src={`http://localhost:8000/${image}`} />

                            </div>)
                        })}


                    </div>
                </div>
                <div className="form-group">
                    <Progress max="100" color="success" value={loaded} >{Math.round(loaded, 2)}%</Progress>
                </div>

                <Button variant="primary" type="submit">
                    Submit
        </Button>
            </Form>

            <div className="form-group">
                <ToastContainer />
            </div>
        </>
    )
}

export default UpdateProduct