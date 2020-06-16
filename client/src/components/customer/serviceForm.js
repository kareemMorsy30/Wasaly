import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import axios from 'axios'

const ServiceOrderForm = (props) => {
    const [item, setItem] = useState([])
    const [amount, setAmount] = useState()
    const { register, errors, handleSubmit } = useForm();
    const [cost, setCost] = useState('')
    const [description, setDescription] = useState('')
    const [district, setDistrict] = useState([])
    const [street, setStreet] = useState([])
    const [to, setTo] = useState([])
    const [transportationWay, setTranportationWay] = useState('')

    const districts = [
        "Abbassia",
        "Ain Shams",
        "Azbakeya",
        "Bab al-Louq",
        "Boulaq",
        "City of the Dead (Cairo)",
        "Coptic Cairo",
        "Daher, Egypt",
        "Downtown Cairo",
        "El Manial",
        "El Marg",
        "El Matareya, Cairo",
        "El Qobbah",
        "El Rehab",
        "El Sahel",
        "El Sakkakini",
        "Ezbet El Haggana",
        "Ezbet El Nakhl",
        "Faggala",
        "Fifth Settlement",
        "Fustat",
        "Garden City, Cairo",
        "Gezira (Cairo)",
        "Heliopolis, Cairo",
        "Islamic Cairo",
        "Maadi",
        "Old Cairo",
        "Roda Island",
        "Shubra (administrative region)",
        "Shubra",
        "Shubra El Kheima",
        "Wagh El Birket",
        "Zamalek",
        "Zeitoun, Cairo"
    ]
    return (
        <>
            <h2>Place Order</h2>
            <Form onSubmit={handleSubmit()}>
                <Form.Group controlId="name">
                    <Form.Label>product name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
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

                <Form.Group controlId="cost">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control
                        name="cost"
                        value={cost}
                        type="number"
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="cost of the product"
                        ref={register({ required: true, min: 0 })} />
                </Form.Group>
                {
                    errors.cost ?
                        <p className="alert alert-danger">
                            {
                                errors.cost.type == "required" ?
                                    "Product cost is required" :
                                    errors.cost.type == "min" ?
                                        "Product cost can not be negative" : ""}</p> : ""
                }


                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        name="amount"
                        value={amount}
                        type="number"
                        placeholder="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        ref={register({ required: true, min: 0 })} />
                </Form.Group>
                {errors.amount ?
                    <p className="alert alert-danger">
                        {
                            errors.amount.type === "required" ?
                                "Product amount is required" :
                                errors.amount.type == "min" ?
                                    "Product amount can not be negative" : ""
                        }
                    </p> : ""
                }
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        as="select"
                        type="number"
                        name="district"
                        custom
                        ref={register({ required: true })}
                    >
                        <option></option>
                        {districts.map(district => <option>{district}</option>)}

                    </Form.Control>
                </Form.Group>
                {errors.district ?
                    <p className="alert alert-danger">
                        {
                            errors.district.type === "required" ?
                                "district is required" : ""
                        }
                    </p> : ""
                }

                <Form onSubmit={handleSubmit()}>
                    <Form.Group controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            name="street"
                            type="text"
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                            placeholder="street"
                            ref={register({ required: true, minLength: 3 })} />
                    </Form.Group>

                    {
                        errors.street ?
                            <p className="alert alert-danger">
                                {
                                    errors.street.type == "required" ?
                                        "Street name is required" :
                                        errors.street.type == "minLength" ?
                                            "Street name is too short" : ""
                                }</p> : ""}
                  

                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Tranporation  way</Form.Label>
                        <Form.Control
                            value={transportationWay}
                            onChange={(e) => setTranportationWay(e.target.value)}
                            as="select"
                            type="number"
                            name="transportation"
                            custom
                            ref={register({ required: true })}
                        >
                            <option></option>
                            <option>Bicycle</option>
                            <option>Car</option>
                        </Form.Control>
                    </Form.Group>
                    {errors.transportation ?
                        <p className="alert alert-danger">
                            {
                                errors.transportation.type === "required" ?
                                    "Preferred Transportation way is required" : ""
                            }
                        </p> : ""
                    }


                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>

                <div className="form-group">
                    <ToastContainer />
                </div>
                </Form>
        </>
    )


}

export default ServiceOrderForm