import React from "react";
import NavBar from './navbar';
import FooterPage from './footer';

const SiteLayout = ({children}) => {
    return (
        <>
        <NavBar />
            {children}
        <FooterPage />
        </>
    )
}

export default SiteLayout;