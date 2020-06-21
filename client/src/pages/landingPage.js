import React, { useState, useEffect } from 'react'
import Delivery from '../components/customer/delivery';
import CardWithImage from '../components/cardWithImage'
import UserNavBar from "../components/user/userNavBar";
import axios from 'axios'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const LandingPage = () => {
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
            {/* <UserNavBar />
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
            </SideNav> */}

            <div className="container">
                <Delivery />
                <br />
                <div className="container" style={{ marginTop: '80px' }}>
                    <div className="row">
                        <div className="col-4">
                            <CardWithImage text={categories[0] && categories[0].name} image={categories[0] && `${domain}/${categories[0].image}`} width="100%" />
                        </div>
                        <div className="col-4">
                            <CardWithImage text={categories[1] && categories[1].name} image={categories[1] && `${domain}/${categories[1].image}`} width="100%" />
                        </div>
                        <div className="col-4">
                            <CardWithImage text={categories[2] && categories[2].name} image={categories[2] && `${domain}/${categories[2].image}`} width="100%" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <CardWithImage text={categories[3] && categories[3].name} image={categories[3] && `${domain}/${categories[3].image}`} width="100%" />
                        </div>
                        <div className="col-4">
                            <CardWithImage text={categories[4] && categories[4].name} image={categories[4] && `${domain}/${categories[4].image}`} width="100%" />
                        </div>
                        <div className="col-4">
                            <CardWithImage text={categories[4] && categories[5].name} image={categories[5] && `${domain}/${categories[5].image}`} width="100%" />
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default LandingPage;