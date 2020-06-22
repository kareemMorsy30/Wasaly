import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import UserNavBar from "../user/userNavBar";
import axios from 'axios'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {isUser} from '../../services/authServices'

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
                        <Link to='/'> Home</Link>
                      </NavText>
                    </NavItem>
                    { isUser()&&
                        <NavItem eventKey="Orders">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                               <Link to='orders'> Track Orders</Link>
                        </NavText>
                        </NavItem>
                    }
                    <NavItem eventKey="categories">
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