import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    getCartItems,
    removeCartItem,
} from '../Cart/actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Result, Empty } from 'antd';
import Axios from 'axios';
import OrderForm from '../../customer/orderForm';

function CartPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [owner, setowner] = useState([])
    console.log('================Cart Page====================');
    console.log(props);
    console.log('====================================');

    useEffect(() => {

        let cartItems = [];
        // const responsePayload={};
        if (props.user.userData && props.user.userData.cart) {
            console.log("props",props.user.userData.cart.length);
            
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then((response) => {
                        console.log('================RESPONSEEEE====================');
                        console.log(response);
                        // setowner(response.payload)

                        console.log('====================================');
                        if (response.payload.length > 0) {
                            calculateTotal(response.payload)
                            // owner(response.payload)s
                        }
                    })
            }
        }

    }, [props.user.userData])
  

    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        setTotal(total)
        setShowTotal(true)
    }


    const removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then((response) => {
                console.log('====================================');
                console.log("REMOVE RESPONSE ", response);
                console.log('====================================');
                if (response.payload.cartDetail.length <= 0) {
                    setShowTotal(false)
                } else {
                    calculateTotal(response.payload.cartDetail)
                }
            })
    }

const addOrder = ()=>{
    // dispatch(addtoOrder())
    

}



console.log('=================Props from Cart page===================');
console.log(props);
console.log('====================================');
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <div>

                <UserCardBlock
                    products={props.user.cartDetail}
                    owner={owner}
                    removeItem={removeFromCart}
                    addOrder={addOrder}
                />
   {ShowTotal ?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total amount: ${Total} </h2>
                    </div>
                    :
                    ShowSuccess ?
                        <Result
                            status="success"
                            title="Successfully Purchased Items"
                        /> :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p>No Items In the Cart</p>

                        </div>
                }
<OrderForm    props={props}/>
             
            </div>




        </div>
    )
}

export default CartPage

