import React, {useState, useEffect} from 'react';
import { getNotifications } from '../../endpoints/notifications';
 
const NotificationsContext = React.createContext();
export const NotificationsProvider = ({children}) => {
    const [notifications,setNotifications] = useState([]);

    useEffect(() => {
        getNotifications().then(notifications => setNotifications(notifications));
    }, []);

    return (
        <NotificationsContext.Provider value={{
            notifications,
            setNotifications
        }}>
            {children}
        </NotificationsContext.Provider>
    )
}
 
export default NotificationsContext;