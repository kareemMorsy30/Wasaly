import React, { useState, useEffect } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from "reactstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import AdminLogout from "./adminLogout";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/users/admin", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }
                ).then((response) => {
                    setIsLoggedIn(true);
                });

            } catch (error) {
                console.log("error is ...", error);
            }
        })();
    }, []);

    return (
        <>
        {/* <Navbar color="light" light expand="md">
            <NavbarBrand >Wasaly Admin</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link className="nav-link" to="/admin/categories">ProductOwners</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/admin/books">ServiceOwners</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/admin/authors">Users</Link>
                    </NavItem>
                </Nav>
                {console.log("is logged in : ", isLoggedIn)}
                {isLoggedIn === true ? (<AdminLogout />) : null}

            </Collapse>
        </Navbar>
        {props.children} */}
        </>
    );
};

export default NavBar;
