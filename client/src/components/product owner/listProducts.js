import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import VerticallyCenteredModal from '../verticallCenteredModal'
import { authHeader } from '../config/config'
import CreateProduct from './createProduct'
import UpdateProduct from './updateProduct';

const ListProducts = (props) => {
    const [products, setProducts] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [createModalShow, setCreateModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [productId, setProductID] = useState("")
    const [deleted, setDeleted] = useState(false)
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

    useEffect(() => {
        axios.get(`${domain}/product`, authHeader)
            .then(res => {
                console.log(res)
                res.data.length >= 0 && setProducts(res.data)
            }
            ).catch(err => {
                console.log(err)
            })
    }, [deleted, createModalShow, editModalShow])

    const deleteProduct = () => {
        axios.delete(`${domain}/product/${productId}`, authHeader)
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

            <Button onClick={() => {setCreateModalShow(true) }}><a>Create Product</a></Button>

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
                                    <Button onClick={() => { setProductID(product._id); setEditModalShow(true) }}>Edit</Button>{" "}
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
                title={"Delete Product"}
                body={"Are you sure?"}
                handleClose={()=>setModalShow(false)}             

            >
                <Button onClick={deleteProduct}>Delete</Button>
                <Button onClick={() => setModalShow(false)}>Close</Button>
            </ VerticallyCenteredModal>

            < VerticallyCenteredModal
                show={createModalShow}
                title={"Create Product"}  
                handleClose={()=>setCreateModalShow(false)}             
            >
            <CreateProduct/>
            </ VerticallyCenteredModal>
            < VerticallyCenteredModal
                show={editModalShow}
                title={"Edit Product"}  
                handleClose={()=>setEditModalShow(false)}             
            >
            <UpdateProduct id={productId}/>
            </ VerticallyCenteredModal>
        </>
    )

}
export default ListProducts