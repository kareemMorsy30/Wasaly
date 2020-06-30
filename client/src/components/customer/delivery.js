import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ServiceForm from "./serviceForm";
import List from "./list";
import '../../styles/form.scss';
import '../../styles/delivery-section.scss';
import ReactLoading from 'react-loading';

const Delivery = (props) => {
    const [ serviceOwners, setServiceOwners ] = useState([]);
    const [ waiting, setWaiting ] = useState(false);
    const [ order, setOrder ] = useState(null);

    return (
        <div style={{ width: '85%', margin: '3rem auto', textAlign: 'center' }}>
            <h1 className="about-us-title">Request any service all over Egypt</h1>
            <hr></hr>
            <div className="delivery-section">
                <div className="delivery-img">
                    <img src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/nutraingredients-usa.com/news/suppliers/new-delivery-services-pop-up-amid-social-distancing-era/10914556-1-eng-GB/New-delivery-services-pop-up-amid-social-distancing-era_wrbm_large.jpg"/>
                </div>
                <div className="delivery-form">
                    {
                        waiting 
                        ?
                        <ReactLoading type="cylon" color="rgb(196, 0, 42)" height={'40%'} width={'40%'} />
                        : 
                        serviceOwners.length == 0 
                        ?
                        <ServiceForm setServiceOwners={setServiceOwners} setWaiting={setWaiting} setOrder={setOrder}/>
                        :
                        <List serviceOwners={serviceOwners} order={order}/>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Delivery