import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import Info from "../alerts/info";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { getNotifications } from '../../endpoints/notifications';
import '../../styles/order.scss';

const Notifications = () => {
    const [notifications,setNotifications] = useState([]);
    
    useEffect(()=>{
        getNotifications().then(data => setNotifications(data))
    },[])

    return(
        notifications.length > 0 
        ?
        <div className="container">
            <h2 style={{width:'80%', padding:' 10px', margin: '10px auto'}}>All your notifications</h2>
            {notifications.map(notification=>
            <a href={notification.link}>
            <div className="row order">
                <div className="col-8">
                    { notification.message }
                </div>
                <div className="col-2">
                    <Moment style={{color: 'black', fontSize: 'small'}} format="D MMM YYYY" withTitle>
                        {notification.createdAt}
                    </Moment>
                </div>
                <div className="col-2">
                    { !notification.read && <FontAwesomeIcon color="red" icon={faCircle}/> }
                </div>
            </div>
            </a>
            )}
        </div>
        :
        <Info msg="You do not have any notifications yet!"/>
    )

}

export default Notifications