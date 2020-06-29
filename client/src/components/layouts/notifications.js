import React, { useEffect, useState, useContext } from 'react';
import Moment from 'react-moment';
import Info from "../alerts/info";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import '../../styles/order.scss';
import NotificationsContext from './notificationsContext';

const Notifications = () => {
    const {
        notifications,setNotifications
    } = useContext(NotificationsContext);

    return(
        <div className="container">
            <h2 style={{width:'80%', padding:' 10px', margin: '10px auto'}}>All your notifications</h2>
            {
            notifications.length > 0 
            ?
            notifications.map(notification=>
            <a href={notification.link}>
            <div className="row order">
                <div className="col-8">
                    { notification.message }
                </div>
                <div className="col-2">
                    <Moment style={{color: 'black', fontSize: 'small'}} format="HH:mm" withTitle>
                        {notification.createdAt}
                    </Moment>
                    {' '}
                    <Moment style={{color: 'black', fontSize: 'small'}} toNow withTitle>
                        {notification.createdAt}
                    </Moment>
                </div>
                <div className="col-2">
                    { !notification.read && <FontAwesomeIcon color="red" icon={faCircle}/> }
                </div>
            </div>
            </a>
            )
            :
            <Info msg="You do not have any notifications yet!"/>
            }
        </div>
    )

}

export default Notifications