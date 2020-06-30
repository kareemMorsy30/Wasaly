import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../styles/about-us.scss';

const AboutUs = (props) => {
    const [ serviceOwners, setServiceOwners ] = useState([]);
    const [ waiting, setWaiting ] = useState(false);
    const [ order, setOrder ] = useState(null);

    return (
        <Container>
            <div style={{ width: '85%', margin: '3rem auto', textAlign: 'start' }}>
            <h1 className="about-us-title">About Us</h1>
            <hr></hr>
            <div>
                <Row style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Col className="about-us-col" xs="6" ><img className="about-us-images" src="../../img/customer.jpg" /></Col>
                    <Col className="about-us-col" xs="6">
                        <h3>
                        Help small and limited businesses to grow by
                        providing them a platform they can use to show
                        their products and handle delivery by connecting
                        to one of service owners
                        </h3>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col className="about-us-col" xs="6">
                        <h3>
                        Product owners can add their products to their
                        own markets and handle their own transactions
                        of following product requests and providing
                        delivery using the platform delivery channel or in
                        their own way
                        </h3>
                    </Col>
                    <Col className="about-us-col" xs="6"><img className="about-us-images" src="../../img/products.jpg" /></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col className="about-us-col" xs="6"><img className="about-us-images" src="../../img/payment.jpg" /></Col>
                    <Col className="about-us-col" xs="6">
                        <h3>
                            User can deliver any thing he want from one
                            location to another with available trusted service
                            owners
                        </h3>
                    </Col>
                </Row>
            </div>
            </div>
        </Container>
    )
}

export default AboutUs;