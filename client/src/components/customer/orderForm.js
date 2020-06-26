import React, { useState, useEffect } from 'react'
import Push from 'push.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import '../../styles/form.scss';
import { getAvailableTransportations, getAvailableServiceOwners, MakeOrder, domain } from '../../endpoints/order';
import { getGeoLocation } from '../../endpoints/geocoding';
import '../../styles/delivery-section.scss';
import { useDispatch } from 'react-redux';
import {
    getCartItems,
    removeCartItem,
} from '../product owner/Cart/actions/user_actions';
import Axios from 'axios';
import { authHeader } from '../config/config';

const OrderForm = ({props}) => {
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [item, setItem] = useState('')
    const [phone, setPhone] = useState('')
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
    const dispatch = useDispatch();

    const [transportations, setTransportations] = useState([]);
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState(props.user.userData&&props.user.userData.address?props.user.userData.address[0].area:'' ) ;
    const [suggested, setSuggested] = useState([]);
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    const [useraddress, setuseraddress] = useState('')

    // setuseraddress(props.user.userData&&props.user.userData.address?props.user.userData.address[0].area:'')
    // const { loading, breweries, error } = usestate;
    // const [addresss, setaddresss] = useState({error,loading,address})

    const [alert, setAlert] = useState({
        message: '',
        type: null
    });
    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)
    }

    const haandleuserAddress=(event)=>
    {
        const input = event.target.value;


    }
   
try {
    // console.log('===================props of order=================');
    // console.log(props.user.userData['address'] === undefined  &&props.user.userData);
    // console.log('====================================');

    console.log('====================================');
    console.log(props);
    console.log('====================================');
    
} catch (error) {
    // setaddresss({error:error,loading:false})
    console.log(error);
    
}
  
useEffect(()=>{
    props.user.userData&&  setToValue(props.user.userData.address[0].area)
},[ props.user.userData&&props.user.userData.address.length])

// ,data.longitude,data.latitude

    const insertFrom = event => {
        const input = event.target.value;

        setFromValue(event.target.value);


        if(input.length >= 3 && input[input.length-1] !== ' '){
            getGeoLocation(input).then(data => {
                console.log("data",data);
                console.log(data.latitude);
                

                if(data.area) setFrom({
                    
                    ...from,
                    area: data.fullArea,
                    city: data.city,
                    longitude:data.longitude,
                    latitude:data.latitude,
                });
                setlatitude(data.latitude);

                console.log(data.area);
                console.log('====================================');
                console.log(latitude);

                if(input > toValue && data.area && !suggested.includes(data.area) && data.area.toLowerCase().includes(input)){
                    console.log('====================================');
                    console.log(data.area);
                    console.log('====================================');
                    // { latitude: data.latitude, longitude: data.longitude } }
                    setSuggested([...suggested, data.area]);
                    setFromValue(data.area);
                    console.log('====================================');
                    console.log(latitude);
                    console.log('====================================');
                setlatitude(data.latitude);

                }
            })
        }
    }

    const insertTo = event => {
        const input = event.target.value;

        setToValue(event.target.value);

        if(input.length >= 3 && input[input.length-1] !== ' '){
            getGeoLocation(input).then(data => {
                setlongitude(data.longitude);

                if(data.area) setTo({
                    ...to,
                    area: data.fullArea,
                    city: data.city,
                    longitude:data.longitude,
                    latitude:data.latitude,
                });

                if(input > toValue && data.area && !suggested.includes(data.area) && data.area.toLowerCase().includes(input)){
                    setSuggested([...suggested, data.area]);
                    setToValue(data.area);
                setlongitude(data.longitude);

                }
            })
        }
    }

    const handleSubmit = event => {
        // setWaiting(true);
        event.preventDefault();

        if( !phone|| !amount || !description || !transportation || !from || !to)
            setAlert({
                message: 'Check required inputs',
                type: 'error'
            })

        const order = {
            amount,
            description,
            transportation,
            from,
            to,transportation,phone,description
        };

        // setOrder(order);
MakeOrder(order).then(data=> {console.log("data",data)

            // setWaiting(false);
        }

).catch(err=>console.log(err)
)

        // getAvailableServiceOwners(order)
        // .then(owners => {
        //     setServiceOwners(owners);
        //     setWaiting(false);
        // })
        // .catch(err => console.error(err));
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
                    {/* <input type="number" placeholder="Amount" value={amount} onChange={event => setAmount(event.target.value)} style={{border: alert.type === 'error' && !amount && '1px red solid'}}/> */}
                    {/* <select name="author" id="author" value={transportation} onChange={event => setTransportation(event.target.value)} style={{border: alert.type === 'error' && !transportation && '1px red solid'}}>
                        <option disabled selected value="">Transportation way</option>
                        {
                            transportations.length > 0 && transportations.map(transportation => {
                                return <option value={transportation}>{transportation}</option>;
                            })
                        }
                    </select> */}
                    {/* <input type="text" placeholder="Item to deliver" value={item} onChange={event => setItem(event.target.value)} style={{border: alert.type === 'error' && !item && '1px red solid'}}/> */}
                    <input type="text" placeholder="phone" value={phone} onChange={event => setPhone(event.target.value)} style={{border: alert.type === 'error' && !item && '1px red solid'}}/>
                    <textarea placeholder="More info" value={description} onChange={event => setDescription(event.target.value)} style={{border: alert.type === 'error' && !description && '1px red solid'}}/>
                    <button type="submit" onSubmit={handleSubmit} className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    )


}

export default OrderForm