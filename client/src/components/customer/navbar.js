import React, { useState, useEffect } from 'react'
import UserNavBar from "../user/userNavBar";
import axios from 'axios'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const NavBar = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`${domain}/customers/categories`).
            then((res) => {
                console.log(res)
                setCategories(res.data)
            }).catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <>
            <UserNavBar />
            <SideNav
                onSelect={(selected) => {
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                      </NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Categories
                       </NavText>

                        {categories.length > 0 && categories.map((category) =>
                            <NavItem eventKey="charts/linechart">
                                <NavText>
                                    {category.name}
                                </NavText>
                            </NavItem>

                        )}
                    
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
          

        </>
    )
}

export default NavBar;