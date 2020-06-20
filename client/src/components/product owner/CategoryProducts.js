import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link ,useParams} from 'react-router-dom'
import VerticallyCenteredModal from '../verticallCenteredModal'
import { authHeader } from '../config/config'
import CreateProduct from './createProduct'
import UpdateProduct from './updateProduct';
import ListcatProducts from './ListcatProducts'
/**
 * 
 * @param {*} props
 * const [products, setproducts] = useState([]);
const [cart, setcart] = useState([]);
const [totalPrice, settotalPrice] = useState(0);
const [product, setproduct] = useState({}); 
 */

const ListCatProducts = (props) => {
const id = useParams()['id'];

    const [products, setProducts] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [createModalShow, setCreateModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [productId, setProductID] = useState("")
    const [deleted, setDeleted] = useState(false)
    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
console.log('====================================');
console.log(id);
console.log('====================================');
    useEffect(() => {
        axios.get(`${domain}/product/categoryproducts`, authHeader)
            .then(res => {
                console.log(res)
                console.log('====================================');
                console.log("in effect");
                console.log('====================================');
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
            <ListcatProducts productsList={ products.filter((product) => product.category._id === id) } />

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
export default ListCatProducts
