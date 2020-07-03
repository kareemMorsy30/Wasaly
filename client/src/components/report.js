
import React, { useState } from 'react'
import axios from 'axios';
import { authHeader } from './config/config'
import VerticallyCenteredModal from './verticallCenteredModal'
import { Button, Form } from 'react-bootstrap';

const Report = (props) => {

    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    const { serviceId, rate, order } = props
    const [report, setReport] = useState(rate);
    const [modalShow, setModalShow] = useState(false);

    const handleReportSubmit = (e) => {
        e.preventDefault()
        setModalShow(false)
        const data = { report, order }
        axios.put(`${domain}/services/service-owners/${serviceId}/report/`, data, authHeader)
            .then(response => {
                console.log(response); // Service Rating Object
            })
            .catch(err => {
                console.log(err)
            })
        setReport('')
    }

    return (
        <>
            <a style={{marginLeft:'10px', fontSize:'14px'}}onClick={() => setModalShow(true)}>Report This Service</a>{" "}

            < VerticallyCenteredModal
                show={modalShow}
                title={"Report this service"}
               
                handleClose={() => setModalShow(false)}
            >
                 <Form onSubmit={handleReportSubmit}>
                    <Form.Group controlId="name">
                        <Form.Control
                            name="name"
                            type="text"
                            value={report}
                            onChange={(e) => setReport(e.target.value)}
                            placeholder="Report the service"
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

export default Report