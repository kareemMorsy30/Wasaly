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
import { isLoggedIn, isProductOwner } from '../../services/authServices'
import { Badge, Menu } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';


// import ShoppingCart from "@bit/mui-org.material-ui-icons.shopping-cart";




const NavBar = (props) => {
    const [searchInput, setSearchInput] = useState('');
    console.log('====================================');
    // console.log("NAV BAR    ", props.user());
    console.log('====================================');
    const handleSearchInput = e => {
        console.log(e.target.value);

        setSearchInput(e.target.value);
    };

    function handleClick(e) {
        console.log("CLICKED");

        e.preventDefault();
        window.location.assign('/search/?q=' + searchInput);
        // console.log('The link was clicked.'); 
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`


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
    console.log(props);


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
                        {isProductOwner() &&
                            <NavItem>
                                <Link className="nav-link" to="/products">Products</Link>
                            </NavItem>
                        }
                        <NavItem>
                            <Link className="nav-link" to="/services">Services</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/users">users</Link>
                        </NavItem>
                        {/* <NavItem>
                            <Link className="nav-link" to="/serviceownerprofile">My profile</Link>
                        </NavItem> */}
                        {console.log(isLoggedIn())}


                        <NavItem>
                            {
                                isLoggedIn()&&
                                <Link style={{
                                    marginRight: -9
                                    , color: '#667777'
                                }} className="nav-link" to="/cart">

                                    <ShoppingCartOutlined type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />

                                </Link>
                            }
                        </NavItem>
                        {
                            isLoggedIn() == false ? (
                                <NavItem>
                                    {/* <Login /> */}
                                </NavItem>
                            ) : <Logout />
                        }
                    </Nav>
                </Collapse>

                <Search />
                {!isLoggedIn() &&( <div style={{fontSize:'14px', fontWeight:500, marginLeft:'15px'}}>  <Link to="/login">Login</Link> <Link to="/register">Register</Link></div> )}
            </div>
        </Navbar>
    );
};

export default NavBar;