import axios from 'axios';
import {
    AUTH_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
} from './types';
import { authHeader } from '../../../config/config'

// export function registerUser(dataToSubmit) {
//     const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
//         .then(response => response.data);

//     return {
//         type: REGISTER_USER,
//         payload: request
//     }
// }

// export function loginUser(dataToSubmit) {
//     const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
//         .then(response => response.data);

//     return {
//         type: LOGIN_USER,
//         payload: request
//     }
// }

const USER_SERVER=process.env.REACT_APP_BACKEND_DOMAIN;

export function auth() {
    const request = axios.get(`${USER_SERVER}/users/auth`,authHeader)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

// export function addToCart(_id) {
//       axios.post(`${domain}/users/addToCart?productId=${productId}`
//         ,authHeader,

//     {   
//                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// }
    
    
//     ).then(response=>       response.data
        
       
//     ).catch(e=>console.log(e)
//     )



//     }



export function getCartItems(cartItems, userCart) {
    const request = axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/product/products_by_id?id=${cartItems}&type=array`,authHeader)
        .then(response => {
            console.log('============Get CART ========================');
            console.log(response);
            console.log('====================================');

console.log('====================================');
console.log("USER CART  ",userCart);
console.log('====================================');

console.log('====================================');
console.log("CartItems",cartItems);
console.log('====================================');

            //Make CartDetail inside Redux Store 
            // We need to add quantity data to Product Information that come from Product Collection. 

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })

            return response.data;
        });

    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}




export function removeCartItem(id) {
    const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
        .then(response => {

            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}







