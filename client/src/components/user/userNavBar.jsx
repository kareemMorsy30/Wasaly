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


    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/users/logincheck", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }
                ).then((response) => {
                    console.log('====================================');
                    console.log("Response  ::  ",response);
                    console.log('====================================');
                    if (response.status === 200) {
                        setIsLoggedIn(true);
                        sessionStorage.setItem("user", JSON.stringify(response.data.user));
                        sessionStorage.setItem("loggedIn", JSON.stringify(true));
                    }
                });


            } catch (error) {
                console.log("error is ...", error);
            }
        })();
    }, []);
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">wasaly</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
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
                    {
                        isLoggedIn == false ? (
                            <NavItem>
                                <Login />
                            </NavItem>
                        ) : <Logout />
                    }
                </Nav>


            </Collapse>
            {/* <Form inline onSubmit={handleClick}>
                <FormControl type="text" value={searchInput} onChange={handleSearchInput} placeholder="Search for product " className="mr-sm-2" />
                <Link to={`/search/${searchInput}`}>
                    <Button variant="outline-primary" onClick={handleClick}>Search</Button>
                </Link>
            </Form> */}
             <Search/>
        </Navbar>
    );
};

export default NavBar;
