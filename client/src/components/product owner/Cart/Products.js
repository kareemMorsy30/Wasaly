import React, { useEffect, useState } from 'react'
import './Product.css';
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

import ProductDetails from './ProductDetails'
function ProductInfo(props) {
const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

    const [Product, setProduct] = useState({})

    useEffect(() => {
        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
        console.log("props",props);
        console.log('====================================');
        console.log(props.detail);
        console.log('====================================');
        
    }
const showStock = quantity => {
  return quantity > 0 ? (
    <span className="badge badge-primary badge-pill mb-2">In Stock</span>
  ) : (
    <span className="badge badge-primary badge-pill mb-2">Out of Stock</span>
  );
};

// const shouldRedirect = redirect => {
//   if (redirect) {
//     return <Redirect to="/cart" />;
//   }
// };

// const showAddToCart = showAddToCartButton => {
//   return (
//     showAddToCartButton && (
//       <button
//         className="btn btn-outline-success mt-2 mb-2"
//         onClick={addToCart}
//       >
//         Add to cart
//       </button>
//     )
//   );
// };

    return (
          <>
                <div className="container" style={{ width: '60%', marginTop: "50px" }}>
                  <div className="row">
                          <Card style={{ width: '20rem', marginTop: '10px' }} key={Product._id} >
                            <Card.Img variant="top" src={`${domain}/${Product.images_path}`} style={{ width: '90%', margin: 'auto', marginTop: '10px' }} />
                            <Card.Body>
                              <Card.Title>{Product.name}</Card.Title>
                              <Card.Text>
                                {Product.description}
                              </Card.Text>
                              <Card.Text>
                                {Product.price}$
                              </Card.Text>
                              <Card.Text>
                                <div>{showStock(Product.quantity)}</div>
                              </Card.Text>
                              <Card.Text>
                                {/* {Product.owner.ownerName} */}
                              </Card.Text>
                              <Card.Text>
                                {/* {Product.owner.marketName} */}
                              </Card.Text>
                              <Card.Text>
                                {/* {Product.owner.marketPhone} */}
                              </Card.Text>
                           
                              <div style={{ display: 'flex', 'justifyContent': 'space-around' }}>
                                <Button variant="danger" className="btn-card" >View</Button>
                                <Button variant="danger"  onClick={addToCarthandler}  className="btn-card">Add to Cart</Button>
                              </div>
                            </Card.Body>
                          </Card>
                     
                  </div>
                </div>
              </>
            )
}

export default ProductInfo
