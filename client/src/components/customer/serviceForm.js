import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import '../../styles/form.scss';
import { getAvailableTransportations } from '../../endpoints/order';
import '../../styles/delivery-section.scss';

const ServiceOrderForm = (props) => {
    const [item, setItem] = useState([])
    const [amount, setAmount] = useState()
    const { register, errors, handleSubmit } = useForm();
    const [description, setDescription] = useState('')
    const [transportation, setTransportation] = useState('Transportation way');
    const [from, setFrom] = useState({
        area: ''
    });
    const [to, setTo] = useState({
        area: ''
    })
    const [transportations, setTransportations] = useState([]);

    useEffect(() => {
        getAvailableTransportations().then(transportations => {
            console.log(transportations);
            setTransportations(transportations);
        })
    }, []);

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

    const insertFrom = event => {
        setFrom({
            ...from,
            area: event.target.value
        })
    }

    const insertTo = event => {
        setTo({
            ...from,
            area: event.target.value
        })
    }

    return (
        <div className="delivery-form">
            <form onSubmit={handleSubmit}>
                <div className="form_container">
                    <input type="text" placeholder="From" value={from.area} onChange={insertFrom} list="from-list"/>
                    <datalist id="from-list">
                        <option value="Boston"/>
                    </datalist>
                    <input type="text" placeholder="To" value={to.area} onChange={insertTo} list="to-list"/>
                    <datalist id="to-list">
                        <option value="Boston"/>
                    </datalist>
                    <input type="number" placeholder="Amount" value={amount} onChange={event => setAmount(event.target.value)} />
                    <select name="author" id="author" value={transportation} onChange={event => setTransportation(event.target.value)} >
                        <option disabled selected value="Transportation way">Transportation way</option>
                        {
                            transportations.map(transportation => {
                                return <option value={transportation}>{transportation}</option>;
                            })
                        }
                    </select>
                    <input type="text" placeholder="Item to deliver" value={item} onChange={event => setItem(event.target.value)} />
                    <textarea placeholder="More info" value={description} onChange={event => setDescription(event.target.value)}/>
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    )


}

export default ServiceOrderForm