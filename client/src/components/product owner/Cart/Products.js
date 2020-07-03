import React, { useEffect, useState } from 'react'
import './Product.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Card, Button, Spinner } from 'react-bootstrap'
import { Carousel } from 'react-responsive-carousel';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { ToastContainer, toast } from 'react-toastify';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import ProductDetails from './ProductDetails'

function ProductInfo(props) {

  const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

  let showAddToCartButton= props.showAddToCartButton;
  showAddToCartButton=true;
  const [Product, setProduct] = useState({})
  const [render,rerender]=useState(false)
  useEffect(() => {
    setProduct(props.detail)
  }, [props.detail,render])
  console.log(props.detail)
  const addToCarthandler = () => {
    props.setProductt(prevProduct=>{
      return [{...prevProduct[0],quantity:prevProduct[0].quantity-1}]
    });
    setProduct(prevProduct=>{
      return [{...prevProduct[0],quantity:prevProduct[0].quantity-1}]
    });
    props.addToCart(props.detail[0]._id)
    toast('Product added to your cart successfully!');
  }

  const showStock = product => {
    return product.quantity > 0 ? (
      <div className="to-cart-section">
        <span className="in-stock-badge badge badge-primary badge-pill mb-4">In Stock</span>
        <IconButton onClick={addToCarthandler}>
          <ShoppingCartOutlinedIcon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3, color: 'red' }} />
        </IconButton>
      </div>
      )
     : (
        <span className="badge badge-primary badge-pill mb-2">Out of Stock</span>


);
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  // const showAddToCart = showAddToCartButton => {
  //   return (
  //     // showAddToCartButton &&  (
  //     //   <Button variant="danger"  onClick={addToCarthandler}   className="btn-card">Add to Cart</Button>

  //     // )
  //   );
  // };
  // console.log(Product)


  const images = Product[0]&&Product[0].images_path&& Product[0].images_path.map(image =>( <div><img src={`${domain}/${image}`} />  </div>) )


  return (
      Product[0]?
    <>
    <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Carousel>
                  {images}
            </Carousel>
          </div>
          <div style={{margin:'auto', marginTop: '15px',marginBottom:'200px'}} >

              <h4 style={{fontSize:"40px", fontWeight:'800'}}>{Product[0].name}</h4>
              <hr></hr>
          <div className="col-8" >
            <div className="row">
            <h4>Quantity: {Product[0].quantity}</h4>
            </div>
            <div className="row">
            <h4>Price: </h4><h4 style={{color:"blue"}}> {Product[0].price}<span style={{fontSize:"10px", color:"blue"}}>EGP</span></h4>
            </div>
            
            <p>{Product[0].description}</p>
             
             {/* {showAddToCart(showAddToCartButton)} */}

             {/* <Button variant="danger"  onClick={addToCarthandler}   className="btn-card">Add to Cart</Button> */}
             <p style={{marginTop:'10px'}}>Sold by:    <span style={{fontSize:'13px', fontWeight:400}}>{Product[0].owner&&Product[0].owner.ownerName}</span></p>
             <h4>{showStock(Product[0])}</h4>

          </div>

          </div>
      
        </div>
      </div>
      <h4>Product Information: </h4>
      <div className="order" style={{width:'100%'}}>
        <h6>SPECIFICATIONS</h6>
        <p>Brand Name:    <span style={{fontSize:'13px'}}>{Product[0].owner&&Product[0].owner.marketName}</span></p>
        <p>Description:    <span style={{fontSize:'13px'}}>{Product[0].description&&Product[0].description}</span></p>

      </div>
      
      </>
    
    :<Spinner />
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