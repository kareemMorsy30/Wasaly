import React, { useState, useEffect } from 'react';
import Alert from '../alerts/alert';
import Info from '../alerts/info';
import OperationHolder from './productOwnerDetails/operationHolder';
import Details from './productOwnerDetails/details';
import { marketDetails } from '../../endpoints/productOwners';
import '../../styles/details.scss';

const ProductOwnerDetails = (props) => {
    const [owner, setOwner] = useState({
        marketName: "",
        marketPhone: "",
        ownerName: "",
        user: {
            address: [{
                area: "",
                city: "",
                street: ""
            }],
            _id: "",
            email: "",
            image_path: "",
            name: "",
            phones: [],
            role: "",
            status: "offline",
            username: "",
        }
    })
    const [status, setStatus] = useState('');
    const [ alert, setAlert ] = useState({
        errors: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        marketDetails().then(market => {
            if(market.status !== 'Not connected'){
                setOwner(market.market);
                console.log(market)
            }
            setStatus(market.status);
        });
    } ,[]);

    return (
            status !== 'Not connected'
            ?
            <>
                <div className="card_one" style={{backgroundColor: alert.errors && 'red' || alert.success && '#2ecc71'}}>
                    {alert.errors || alert.success ?
                        <Alert alert={alert}/>
                        :
                        <>
                            <h5>Product owner connection request</h5>
                        </>
                    }
                </div>
                <div className="book-container">
                    <div className="upper-card">
                        <OperationHolder market={owner} setStatus={setStatus} status={status} setAlert={setAlert} alert={alert}/>
                        <Details market={owner}/>
                    </div>
                    <div className="bottom-card">
                    </div>
                </div>
            </>
            :
            <Info msg="You are not connected to any product owner yet!"/>
    )
}

export default ProductOwnerDetails;