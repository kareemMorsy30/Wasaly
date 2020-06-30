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
import { readNotification } from '../../endpoints/notifications';
import { Form, FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import Login from "../login";
import Logout from "../user/logout";
import Search from "../search"
import { isLoggedIn, isProductOwner } from '../../services/authServices'
import { Badge, Menu } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import MatBadge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

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
    const history = useHistory();

    const toggle = () => setIsOpen(!isOpen);
    const notifications = () => {
        readNotification().then(data => {
            props.setNotificationsNo(0);
            setTimeout(() => {
              props.setNotifications(data)
            }, 4000);
        });
        history.push("/notifications");
    }


    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const path = window.location.pathname;
    console.log(path);
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
        <Navbar className="site-navbar" color="light" light expand="md" >
            <div className="container">
                <NavbarBrand style={{paddingLeft: '2%'}} href="/">Wasaly</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

                    <Nav navbar>


                        <NavItem className="nav-item" style={{backgroundColor: path === '/' && 'red'}}>
                            <a style={{marginBottom: '2px'}} className="nav-link" href="/">Home</a>
                        </NavItem>
                        {isProductOwner() &&
                            <NavItem className="nav-item">
                                <a className="nav-link" href="/products">Products</a>
                            </NavItem>
                        }
                        <NavItem className="nav-item" style={{backgroundColor: path.includes('/service') && 'red'}}>
                            <a className="nav-link" href="/service">Services</a>
                        </NavItem>
                        <NavItem className="nav-item" style={{backgroundColor: path.includes('/about-us') && 'red'}}>
                            <a className="nav-link" href="/about-us">About Us</a>
                        </NavItem>
                        {/* <NavItem>
                            <Link className="nav-link" to="/serviceownerprofile">My profile</Link>
                        </NavItem> */}
                        {console.log(isLoggedIn())}
                    </Nav>
                </Collapse>

                <Search />
                {!isLoggedIn() &&( <div style={{fontSize:'14px', fontWeight:500, marginLeft:'15px'}}>  <Link to="/login">Login</Link> <Link to="/register">Register</Link></div> )}
                <IconButton>
                    {
                        isLoggedIn()&&
                        <Link style={{
                            marginRight: -9
                            , color: '#667777'
                        }} className="nav-link" to="/cart">

                            <ShoppingCartOutlinedIcon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />

                        </Link>
                    }
                </IconButton>
                {
                    isLoggedIn() 
                    &&
                    <IconButton color="inherit" onClick={notifications}>
                        <MatBadge badgeContent={props.notificationsNo} color="error">
                            <NotificationsIcon/>
                        </MatBadge>
                    </IconButton>
                }
                {
                    isLoggedIn() == false ? (
                        <NavItem>
                            {/* <Login /> */}
                        </NavItem>
                    ) : <Logout />
                }
                
            </div>
        </Navbar>
    );
};

export default NavBar;