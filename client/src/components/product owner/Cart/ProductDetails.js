import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import Products from './Products';
import { addToCart } from '../../../components/product owner/Cart/actions/user_actions';
import { useDispatch } from 'react-redux';
import { authHeader } from '../../config/config'

function ProductDetails(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id
    const [Product, setProduct] = useState([])
    const domain = process.env.REACT_APP_BACKEND_DOMAIN

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/product/${id}/ownerinfo`,)
            .then(response => {
                console.log(response.data[0])
                setProduct([response.data[0]])
            })

    }, [])

    const addToCartHandler = (productId) => {
        Axios.post(`${domain}/users/addToCart?productId=${productId}`, authHeader,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
        ).then(response => response.data


        ).catch(e => console.log(e)     )

    }

    return (
        <div className="menu-items">
            <Products detail={Product} showAddToCartButton={false} setProductt={setProduct} addToCart={addToCartHandler} />
        </div>
    )

}

export default ProductDetails