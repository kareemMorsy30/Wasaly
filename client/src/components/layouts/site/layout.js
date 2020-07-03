import React from "react";
import NavBar from './navbar';
import FooterPage from './footer';
import { NotificationsProvider } from '../notificationsContext';

const SiteLayout = ({children}) => {
    return (
        <NotificationsProvider>
        <NavBar />
            {children}
        <FooterPage />
        </NotificationsProvider>
    )
}

export default SiteLayout;