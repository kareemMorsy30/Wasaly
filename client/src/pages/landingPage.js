import React, { useState, useEffect } from 'react'
import Delivery from '../components/customer/delivery';
import CardWithImage from '../components/cardWithImage'
import UserNavBar from "../components/user/userNavBar";
import axios from 'axios'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Link} from 'react-router-dom'

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
            <div className="container">
                <Delivery />
                <br />
                <div className="container" style={{ marginTop: '80px' }}>
                    <div className="row">
                        <div className="col-4">
                        <Link to={categories[0] &&`/categoryproducts/${categories[0]._id}`}><CardWithImage text={categories[0] && categories[0].name} image={categories[0] && `${domain}/${categories[0].image}`} width="100%" /> </Link>
                        </div>
                        <div className="col-4">
                        <Link to={categories[1] &&`/categoryproducts/${categories[1]._id}`}>   <CardWithImage text={categories[1] && categories[1].name} image={categories[1] && `${domain}/${categories[1].image}`} width="100%" /></Link>
                        </div>
                        <div className="col-4">
                        <Link to={categories[2] &&`/categoryproducts/${categories[2]._id}`}>  <CardWithImage text={categories[2] && categories[2].name} image={categories[2] && `${domain}/${categories[2].image}`} width="100%" /></Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                        <Link to={categories[3] &&`/categoryproducts/${categories[3]._id}`}> <CardWithImage text={categories[3] && categories[3].name} image={categories[3] && `${domain}/${categories[3].image}`} width="100%" /></Link>
                        </div>
                        <div className="col-4">
                        <Link to={categories[4] &&`/categoryproducts/${categories[4]._id}`}>   <CardWithImage text={categories[4] && categories[4].name} image={categories[4] && `${domain}/${categories[4].image}`} width="100%" /></Link>
                        </div>
                        <div className="col-4">
                        <Link to={categories[5] &&`/categoryproducts/${categories[5]._id}`}>  <CardWithImage text={categories[4] && categories[5].name} image={categories[5] && `${domain}/${categories[5].image}`} width="100%" /></Link>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default LandingPage;