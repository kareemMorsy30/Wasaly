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
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));




const OrderForm = ({ props, setShowSuccess, ShowTotals }) => {
    const classes = useStyles();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [item, setItem] = useState('')
    const [phone, setPhone] = useState('')
    const [amount, setAmount] = useState(1)
    const [description, setDescription] = useState('')

    // const [from, setFrom] = useState({
    //     area: '',
    //     street: '',
    //     city: '',
    //     longitude: 0,
    //     latitude: 0,
    // });
    console.log('====================================');
    // console.log(from);
    console.log('====================================');
    const [to, setTo] = useState({
        area: '',
        street: '',
        city: '',
        longitude: 0,
        latitude: 0,
    })
    const dispatch = useDispatch();
    console.log(props);

    const [transportations, setTransportations] = useState([]);
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [suggested, setSuggested] = useState([]);
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    const [useraddress, setuseraddress] = useState('')
    const [show, setShow] = useState(false)
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
            total += parseInt(item.price, 10) * item.amount
        });

        setTotal(total)
        setShowTotal(true)
    }

    const haandleuserAddress = (event) => {
        const input = event.target.value;


    }

    try {

        console.log('====================================');
        console.log(props);
        console.log('====================================');

    } catch (error) {
        // setaddresss({error:error,loading:false})
        console.log(error);

    }

    const from = {
        // from: {
        area: '',
        city: '',
        longitude: 0,
        latitude: 0,

    }
    // }
    const insertTo = event => {
        const input = event.target.value;

        setToValue(event.target.value);

        if (input.length >= 3 && input[input.length - 1] !== ' ') {
            getGeoLocation(input).then(data => {
                setlongitude(data.longitude);

                if (data.area) {
                    setTo({
                        ...to,
                        area: data.fullArea,
                        city: data.city,
                        longitude: data.longitude,
                        latitude: data.latitude,
                    });
                    console.log("to inside insert to first IF ", to);
                    console.log("to inside insert toValue first IF ", toValue);

                }

                if (input > toValue && data.area && !suggested.includes(data.area) && data.area.toLowerCase().includes(input)) {
                    setSuggested([...suggested, data.area]);
                    setToValue(data.area);
                    console.log("to inside insert to second IF ", to);
                    console.log("to inside insert toValue second IF ", toValue);

                    setlongitude(data.longitude);

                }
            })
        }
    }

    const handleSubmit = event => {
        // setWaiting(true);
        event.preventDefault();
        // setTo(toValue);

        if (to.area == "" && props.user.userData.address.length > 0) {
            setTo(props.user.userData.address[0] && props.user.userData.address[0])
        }
        else if (to.area == "" || !to || !phone) {
            setAlert({
                message: 'Check required inputs',
                type: 'error'
            })
        }
        else {
            if (show || props.user.userData.address.length == 0) {
                if (!phone || !description || !to) {
                    setAlert({
                        message: 'Check required inputs',
                        type: 'error'
                    })
                }
                else {
                    const order = { to, phone, description };
                    // setOrder(order);
                    MakeOrder(order).then(data => {
                        console.log(authHeader)
                        Axios.delete(`${domain}/users/removeCart`, authHeader())
                        setShowSuccess(true);
                        ShowTotals(false);
                    }

                    ).catch(err => console.log(err)
                    )
                }

            }
            else {
                if ((props.user.userData.address[0] && props.user.userData.address[0].area) || (props.user.userData.address[0].location && props.user.userData.address[0].location)) {
                    const order = {
                        to:
                        {
                            area: props.user.userData.address[0].area,
                            street: props.user.userData.address[0].street || "",
                            city: props.user.userData.address[0].city,
                            longitude: props.user.address && props.user.address.length > 0 && props.user.userData.address[0].location.longitude || 0,
                            latitude: props.user.address && props.user.address.length > 0 && props.user.userData.address[0].location.latitude || 0

                        }, phone, description
                    };

                    // setOrder(order);

                    MakeOrder(order).then(data => {
                        console.log('hiiiiiiiiiiiiiiiiiiiiiii')
                        Axios.delete(`${domain}/users/removeCart`, authHeader)
                        setShowSuccess(true);
                        ShowTotals(false);
                    }

                    ).catch(err => console.log(err)
                    )
                }
            }
            console.log(typeof (to))
        }
        // getAvailableServiceOwners(order)
        // .then(owners => {
        //     setServiceOwners(owners);
        //     setWaiting(false);
        // })
        // .catch(err => console.error(err));
    }

    return (
        <div className="delivery-form">
            {/*  
        1-check if user has area inside address   (Show ORDER FORM without From Value input  ) WITH BUTTON
2- check if user has location inside address without area (SHow ORder Form with From Value input ) without button 
3-check if he has addres  (choose add new address choose his address )  WITH BUTTON 

        */}
            {props.user.userData.address[0] && props.user.userData.address[0].area && props.user.userData.address[0].location ?
                <>
                    <div className="order" >
                        <h4>Your Address</h4>
                        <p>{props.user.userData.address[0].street}</p>
                        <p>{props.user.userData.address[0].area}</p>
                        <p>{props.user.userData.address[0].city}</p>
                    </div>
                    {
                        show
                            ?
                            <AvForm onSubmit={handleSubmit}>
                                <div className="form_container">

                                    <AvField name="to" type="text" placeholder="To" value={toValue} onChange={insertTo} list="to-list" style={{ border: alert.type === 'error' && !to.area && '1px red solid' }} />
                                    <datalist id="to-list">
                                        <option key="destination" value={to.area} />
                                    </datalist>

                                    <AvField name="phone" type="text" placeholder="phone" value={phone} onChange={event => setPhone(event.target.value)} style={{ border: alert.type === 'error' && !phone && '1px red solid' }} />
                                    <textarea placeholder="More info" value={description} onChange={event => setDescription(event.target.value)} style={{ border: alert.type === 'error' && !description && '1px red solid' }} />
                                    <button type="submit" onSubmit={handleSubmit} className="submit-btn">Purchase Product</button>
                                </div>
                            </AvForm>
                            :
                            <AvForm onSubmit={handleSubmit}>
                                <div className="form_container">

                                    {

                                    }
                                    <AvField
                                        type="text"
                                        placeholder="phone"
                                        name="phone1"
                                        value={phone}
                                        onChange={event => setPhone(event.target.value)}
                                        style={{ border: alert.type === 'error' && !phone && '1px red solid' }}
                                        validate={{
                                            pattern: { value: '^(012|011|010|015)[0-9]{8}$', errorMessage: 'Your phone must be a valid number' }

                                        }}

                                    />
                                    <textarea placeholder="More info" value={description} onChange={event => setDescription(event.target.value)} style={{ border: alert.type === 'error' && !description && '1px red solid' }} />
                                    <button type="submit" onSubmit={handleSubmit} className="submit-btn">Purchase product</button>
                                </div>
                            </AvForm>
                    }

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon></Icon>}
                        onClick={() => { setShow((prevstate) => !prevstate) }}>{show ? "Choose my address" : "Choose Another Address"}</Button>
                </>

                :

                <AvForm onSubmit={handleSubmit}>
                    <div className="form_container">

                        <AvField name="to" type="text" placeholder="To" value={toValue} onChange={insertTo} list="to-list" style={{ border: alert.type === 'error' && !to.area && '1px red solid' }} />
                        <datalist id="to-list">
                            <option key="destination" value={to ? to.area : ''} />
                        </datalist>

                        <AvField
                            type="text"
                            placeholder="phone"
                            name="phone"
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                            style={{ border: alert.type === 'error' && !phone && '1px red solid' }}
                            validate={{
                                pattern: { value: '^(012|011|010|015)[0-9]{8}$', errorMessage: 'You phpne must be a valid number' }

                            }}

                        />                        <textarea placeholder="More info" value={description} onChange={event => setDescription(event.target.value)} style={{ border: alert.type === 'error' && !description && '1px red solid' }} />
                        <button type="submit" onSubmit={handleSubmit} className="submit-btn">Purchase Product</button>
                    </div>
                </AvForm>
            }


            <>

            </>


        </div>

    )


}

export default OrderForm