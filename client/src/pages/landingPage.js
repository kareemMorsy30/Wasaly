import React, { useState, useEffect } from 'react'
import CardWithImage from '../components/cardWithImage'
import UserNavBar from "../components/user/userNavBar";
import axios from 'axios'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const LandingPage = () => {
    const [categories, setCategories] = useState([])

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
            <div className="container">

                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/001.png"
                            alt="First slide"
                        />

                    </Carousel.Item>
                 
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/000.png"
                            alt="Third slide"
                        />


                    </Carousel.Item>
                </Carousel>
                <br />
                <div className="container" style={{ marginTop: '80px' }}>
                    <div className="row">
                        <div className="col-4">
                            {categories[0] && <Link to={`/categoryproducts/${categories[0]._id}`}><CardWithImage text={categories[0] && categories[0].name} image={categories[0] && `${domain}${categories[0].image}`} width="100%" /> </Link>}
                        </div>
                        <div className="col-4">
                            {categories[1] && <Link to={`/categoryproducts/${categories[1]._id}`}>   <CardWithImage text={categories[1] && categories[1].name} image={categories[1] && `${domain}${categories[1].image}`} width="100%" /></Link>}
                        </div>
                        <div className="col-4">
                            {categories[2] && <Link to={`/categoryproducts/${categories[2]._id}`}>  <CardWithImage text={categories[2] && categories[2].name} image={categories[2] && `${domain}${categories[2].image}`} width="100%" /></Link>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            {categories[3] && <Link to={`/categoryproducts/${categories[3]._id}`}> <CardWithImage text={categories[3] && categories[3].name} image={categories[3] && `${domain}/${categories[3].image}`} width="100%" /></Link>}
                        </div>
                        <div className="col-4">
                            {categories[4] && <Link to={`/categoryproducts/${categories[4]._id}`}>   <CardWithImage text={categories[4] && categories[4].name} image={categories[4] && `${domain}/${categories[4].image}`} width="100%" /></Link>}
                        </div>
                        <div className="col-4">
                            {categories[5] && <Link to={`/categoryproducts/${categories[5]._id}`}>  <CardWithImage text={categories[4] && categories[5].name} image={categories[5] && `${domain}/${categories[5].image}`} width="100%" /></Link>}
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default LandingPage;