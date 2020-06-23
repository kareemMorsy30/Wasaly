import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import VerticallyCenteredModal from '../verticallCenteredModal'
import { authHeader } from '../config/config'
import CreateProduct from './createProduct'
import UpdateProduct from './updateProduct';
import ListcatProducts from './ListcatProducts'
import ShowProducts from '../showProducts'
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
    const [page, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)

    const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
    useEffect(()=>{
        setProducts([])
        setPageNumber(1)
    },[id])

    useEffect(() => {    
        let cancel
        axios.get(`${domain}/category/categoryproducts/${id}`, {
            params: {
                page,
            },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
            .then(response => {   
                console.log(response.data.products)          
                response.data.products.length > 0 && (
                    setProducts(prevProducts => {
                        return [...prevProducts, ...response.data.products]
                    })
                )
                setHasMore(response.data.products.length > 0)
                setLoading(false)
            }
            ).catch(err => {
                if (axios.isCancel(error)) return
                setError(error)
                setProducts([])
                console.log(err)
            })
    }, [page,id])

    const observer = useRef()

    const lastProductElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <>
            <ShowProducts products={products} lastProductElementRef={lastProductElementRef} />
            {loading}
            {error}
        </>
    )

}
export default ListCatProducts
