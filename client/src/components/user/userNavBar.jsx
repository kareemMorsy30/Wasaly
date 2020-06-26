import React, { useState, useEffect } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button,

} from "reactstrap";
import { Form, FormControl } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import axios from "axios";
import Login from "../login";
import Logout from "../user/logout";
import Search from "../search"
import {isLoggedIn} from '../../services/authServices'

const NavBar = (props) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearchInput = e => {
        console.log(e.target.value);
        
      setSearchInput(e.target.value);
    };
  
    function handleClick(e) {
        console.log("CLICKED");
            
      e.preventDefault();    
      window.location.assign('/search/?q='+searchInput);
      // console.log('The link was clicked.'); 
     }
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const domain= `${process.env.REACT_APP_BACKEND_DOMAIN}`


    // useEffect(() => {
    //     (async function () {
    //         try {
    //             let response = await axios.get(
    //                 `${domain}/users/logincheck`, {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + localStorage.getItem("token")
    //                 }
    //             }
    //             ).then((response) => {
    //                 console.log('====================================');
    //                 console.log("Response  ::  ",response);
    //                 console.log('====================================');
    //                 if (response.status === 200) {
    //                     setIsLoggedIn(true);
    //                     sessionStorage.setItem("user", JSON.stringify(response.data.user));
    //                     sessionStorage.setItem("loggedIn", JSON.stringify(true));
    //                 }
    //             });


    //         } catch (error) {
    //             console.log("error is ...", error);
    //         }
    //     })();
    // }, []);


    return (
        <Navbar color="light" light expand="md" >
                <div className="container">
                    <NavbarBrand href="/">wasaly</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>

                    <Nav navbar>
                        <NavItem>
                            <Link className="nav-link" to="/">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/products/list">Products</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/services">Services</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/users">users</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/serviceownerprofile/5ef284d743ed7e1916f4aa22">My profile</Link>
                        </NavItem>
                        {console.log(isLoggedIn())}
                        {
                            isLoggedIn() == false ? (
                                <NavItem>
                                    {/* <Login /> */}
                                </NavItem>
                            ) : <Logout />
                        }
                    </Nav>
                     </Collapse>
       
            <Search/>
            </div>
        </Navbar>
    );
};

export default NavBar;