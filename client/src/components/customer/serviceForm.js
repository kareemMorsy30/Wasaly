import React, { useState, useEffect } from 'react'
import Push from 'push.js';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/form.scss';
import { getAvailableTransportations, getAvailableServiceOwners } from '../../endpoints/order';
import { getGeoLocation } from '../../endpoints/geocoding';
import '../../styles/delivery-section.scss';

const ServiceOrderForm = ({ setServiceOwners, setWaiting, setOrder }) => {
    const [item, setItem] = useState('')
    const [amount, setAmount] = useState(1)
    const [description, setDescription] = useState('')
    const [transportation, setTransportation] = useState('');
    const [from, setFrom] = useState({
        area: '',
        street: '',
        city: '',
        longitude: 0,
        latitude: 0,
    });
    const [to, setTo] = useState({
        area: '',
        street: '',
        city: '',
        longitude: 0,
        latitude: 0,
    })
    const [transportations, setTransportations] = useState([]);
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [suggested, setSuggested] = useState([]);
    const [alert, setAlert] = useState({
        message: '',
        type: null
    });

    useEffect(() => {
        getAvailableTransportations().then(transportations => {
            setTransportations(transportations);
        });
    }, []);

    const insertFrom = event => {
        const input = event.target.value;

        setFromValue(event.target.value);

        if(input.length >= 3 && input[input.length-1] !== ' '){
            getGeoLocation(input).then(data => {
                console.log(data);

                if(data.area) setFrom({
                    
                    ...from,
                    area: data.fullArea,
                    city: data.city,
                    longitude: data.longitude,
                    latitude: data.latitude,
                });
                console.log(data.area);
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

    const insertTo = event => {
        const input = event.target.value;

        setToValue(event.target.value);

        if(input.length >= 3 && input[input.length-1] !== ' '){
            getGeoLocation(input).then(data => {
                if(data.area) setTo({
                    ...to,
                    area: data.fullArea,
                    city: data.city,
                    longitude: data.longitude,
                    latitude: data.latitude,
                });

                if(input > toValue && data.area && !suggested.includes(data.area) && data.area.toLowerCase().includes(input)){
                    setSuggested([...suggested, data.area]);
                    setToValue(data.area);
                }
            })
        }
    }

    const handleSubmit = event => {
        setWaiting(true);
        event.preventDefault();
        if(!item || !amount || !description || !transportation || !from || !to)
            setAlert({
                message: 'Check required inputs',
                type: 'error'
            })

        const order = {
            item,
            amount,
            description,
            transportation,
            from,
            to
        };

        setOrder(order);

        getAvailableServiceOwners(order)
        .then(owners => {
            setServiceOwners(owners);
            setWaiting(false);
        })
        .catch(err => console.error(err));

        const socket = io(`${process.env.REACT_APP_BACKEND_DOMAIN}`);

        socket.on('pushNotification', function (data) {
            console.log(data);
            Push.create("Order status has been updated", {
                body: data.msg, //this should print Msg of owner
                icon: '/icon.png',
                timeout: 4000,
                onClick: function () {
                    window.focus();
                    this.close();
                }
            });
            Push.clear();
        });
    }

    return (
        <div className="delivery-form">
            <form onSubmit={handleSubmit}>
                <div className="form_container">
                    <input type="text" placeholder="From" value={fromValue} onChange={insertFrom} list="from" style={{border: alert.type === 'error' && !from.area && '1px red solid'}}/>
                    <datalist id="from">
                        <option key="source" value={from.area}/>
                    </datalist>
                    <input type="text" placeholder="To" value={toValue} onChange={insertTo} list="to-list" style={{border: alert.type === 'error' && !to.area && '1px red solid'}}/>
                    <datalist id="to-list">
                        <option key="destination" value={to.area}/>
                    </datalist>
                    <input type="number" placeholder="Amount" value={amount} onChange={event => setAmount(event.target.value)} style={{border: alert.type === 'error' && !amount && '1px red solid'}}/>
                    <select name="author" id="author" value={transportation} onChange={event => setTransportation(event.target.value)} style={{border: alert.type === 'error' && !transportation && '1px red solid'}}>
                        <option disabled selected value="">Transportation way</option>
                        {
                            transportations.length > 0 && transportations.map(transportation => {
                                return <option value={transportation}>{transportation}</option>;
                            })
                        }
                    </select>
                    <input type="text" placeholder="Item to deliver" value={item} onChange={event => setItem(event.target.value)} style={{border: alert.type === 'error' && !item && '1px red solid'}}/>
                    <textarea placeholder="More info" value={description} onChange={event => setDescription(event.target.value)} style={{border: alert.type === 'error' && !description && '1px red solid'}}/>
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    )


}

export default ServiceOrderForm