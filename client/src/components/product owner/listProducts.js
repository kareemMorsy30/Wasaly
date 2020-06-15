import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { authHeader } from '../../config'
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import VerticallyCenteredModal from '../verticallCenteredModal'

const ListProducts = (props) => {
    const [products, setProducts] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [productId, setProductID] = useState("")
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/product', authHeader)
            .then(res => {
                console.log(res)
                res.data.length >= 0 && setProducts(res.data)
            }
            ).catch(err => {
                console.log(err)
            })
    }, [deleted])

    const deleteProduct = () => {
        axios.delete(`http://localhost:8000/product/${productId}`, authHeader)
            .then(res => {
                setDeleted((prevState) => !prevState)
                setModalShow(false)
            }
            ).catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            {products.length ?
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, i) =>
                            <tr key={product._id}>
                                <td>{i}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Button><Link to={`/products/${product._id}/edit`}>Edit</Link></Button>{" "}
                                    <Button onClick={() => { setProductID(product._id); setModalShow(true) }}><a>Delete</a></Button>
                                </td>
                                
                            </tr>


                        )}
                    
                </tbody>
                </Table>
                : "Loading..."
                        }
                < VerticallyCenteredModal
                        show={modalShow}
                        deleteProduct={deleteProduct}
                        onHide={() => setModalShow(false)}
                    />
        </>
    )

}
export default ListProducts