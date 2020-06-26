
import React, { useState } from 'react'
import axios from 'axios';
import { authHeader } from './config/config'
import VerticallyCenteredModal from './verticallCenteredModal'
import { Button, Form } from 'react-bootstrap';

const Review = (props) => {

    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const { serviceId, rate, order } = props
    const [review, setReview] = useState(rate);
    const [modalShow, setModalShow] = useState(false);

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        setModalShow(false)
        const data = { review, order }
        axios.patch(`${domain}/services/${serviceId}/reviews/`, data, authHeader)
            .then(response => {
                console.log(response); // Service Review Object
            })
            .catch(err => {
                console.log(err)
            })
        setReview('')
    }

    return (
        <>
            <Button style={{marginLeft:'10px', fontSize:'14px'}}onClick={() => setModalShow(true)}>Add Review</Button>{" "}

            < VerticallyCenteredModal
                show={modalShow}
                title={"Add Review"}
               
                handleClose={() => setModalShow(false)}
            >
                 <Form onSubmit={handleReviewSubmit}>
                    <Form.Group controlId="name">
                        <Form.Control
                            name="name"
                            type="text"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Add Your Review"
                        />
                    </Form.Group>
                      <Button variant="primary" type="submit">
                      Submit
                  </Button>
              </Form>
               
            </ VerticallyCenteredModal>

        </>
    );

}

export default Review