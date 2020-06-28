import React, {useState, useEffect} from 'react';
 
const NotificationsContext = React.createContext();
export const NotificationsProvider = ({children}) => {
    const [notifications,setNotifications] = useState([]);

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