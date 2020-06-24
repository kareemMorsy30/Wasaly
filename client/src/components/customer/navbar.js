import React, { useState, useEffect } from 'react'
import {Link, NavLink} from 'react-router-dom'
import UserNavBar from "../user/userNavBar";
import axios from 'axios'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {isUser} from '../../services/authServices'
import Auth from '../product owner/Cart/UserCart';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
var styles={
    'backgroundColor': 'rgba(76, 175, 80, 0)'
}

const NavBar = () => {
    const [categories, setCategories] = useState([])
    const [sideBarColor, setSideBarColor]= useState({  'backgroundColor': 'rgba(76, 175, 80, 0)'})
    useEffect(() => {
        axios.get(`${domain}/customers/categories`).
            then((res) => {
                setCategories(res.data)
            }).catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <>
            <UserNavBar user={Auth} />
            <SideNav            
                style={sideBarColor}
                onToggle={(expanded)=>
                    expanded ? setSideBarColor({'backgroundColor': 'rgb(219, 61, 68)'}) :   setSideBarColor({'backgroundColor':  'rgba(76, 175, 80, 0)'})
                }
                onSelect={(selected) => {
                    // Add your code here
                }}            
            >
                <SideNav.Toggle />
                <SideNav.Nav  >
                    <NavItem eventKey="home">
                        <NavIcon>
                     
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', color:'red'}} />
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
                               <Link to='/orders'> Track Orders</Link>
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
                              <NavItem eventKey="charts/linechart" key={category.name}>
                              
                              <NavText>
                             <Link className="" to={category._id &&`/categoryproducts/${category._id}`} style={{ backgroundImage: "none" }}> 
                                    {category.name}
                            </Link>
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