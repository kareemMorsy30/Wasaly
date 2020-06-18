import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ServiceForm from "./serviceForm";
import List from "./list";
import '../../styles/form.scss';
import '../../styles/delivery-section.scss';

const Delivery = (props) => {
    const [ serviceOwners, setServiceOwners ] = useState([]);

    return (
        <div className="delivery-section">
            <div className="delivery-img">
                <img src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/nutraingredients-usa.com/news/suppliers/new-delivery-services-pop-up-amid-social-distancing-era/10914556-1-eng-GB/New-delivery-services-pop-up-amid-social-distancing-era_wrbm_large.jpg"/>
            </div>
            <div className="delivery-form">
                {
                    serviceOwners.length == 0 
                    ?
                    <ServiceForm setServiceOwners={setServiceOwners}/>
                    :
                    <List serviceOwners={serviceOwners}/>
                }
            </div>
        </div>
    )
}

export default Delivery