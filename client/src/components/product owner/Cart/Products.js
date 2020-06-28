import React, { useEffect, useState } from 'react'
import './Product.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import ProductDetails from './ProductDetails'
// import productOwner from '../../../../../server/config/productOwner';
function ProductInfo(props) {
  const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
  let showAddToCartButton= props.showAddToCartButton;
  showAddToCartButton=true;
  const [Product, setProduct] = useState({})

  useEffect(() => {
    setProduct(props.detail)

  }, [props.detail])

  const addToCarthandler = () => {
    props.addToCart(props.detail._id)
    console.log("props", props);
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

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton &&  (
        <Button variant="danger"  onClick={addToCarthandler}   className="btn-card">Add to Cart</Button>

      )
    );
  };
  // console.log(Product)


  const images = Product&&Product.images_path&& Product.images_path.map(image =>( <div><img src={`${domain}/${image}`} />  </div>) )


  return (
    <>
         
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Carousel>
                  {images}
            </Carousel>
          </div>
          <div className="col-3">
              <h4>{Product.name}</h4>
              <h4>{showStock(Product.quantity)}</h4>
              <h4 style={{color:"blue"}}>{Product.price}<span style={{fontSize:"10px", color:"blue"}}>EGP</span></h4>
              <h4>Description: </h4>
             <p>{Product.description}</p>
             {showAddToCart(showAddToCartButton)}

             {/* <Button variant="danger"  onClick={addToCarthandler}   className="btn-card">Add to Cart</Button> */}
             <p style={{marginTop:'10px'}}>Sold by:    <span style={{fontSize:'13px', fontWeight:400}}>{Product.owner&&Product.owner.ownerName}</span></p>

          </div>
      
        </div>
      </div>
      <h4>Product Information: </h4>
      <div className="order" style={{width:'100%'}}>
        <h6>SPECIFICATIONS</h6>
        <p>Brand Name:    <span style={{fontSize:'13px'}}>{Product.owner&&Product.owner.marketName}</span></p>
        <p>Description:    <span style={{fontSize:'13px'}}>{Product.Description&&Product.Description}</span></p>

      </div>

      
      </>
  )

 
  
  
}

export default ProductInfo

 /* <div className="container" style={{ width: '60%', marginTop: "50px" }}>
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
                                {Product.owner&&Product.owner.ownerName}
                              </Card.Text>
                              <Card.Text>
                                {Product.owner&&Product.owner.marketName}
                              </Card.Text>
                              <Card.Text>
                                {Product.owner&&Product.owner.marketPhone}
                              </Card.Text>
                           
                              <div style={{ display: 'flex', 'justifyContent': 'space-around' }}>
                                <Button variant="danger" className="btn-card" >View</Button>
                                <Button variant="danger"  onClick={addToCarthandler}  className="btn-card">Add to Cart</Button>
                              </div>
                            </Card.Body>
                          </Card>
                     
                  </div>
                // </div> */