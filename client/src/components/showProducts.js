import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {isLoggedIn} from '../services/authServices'
import { ToastContainer, toast } from 'react-toastify';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const ShowProducts = ({ products, setProducts, lastProductElementRef, showAddToCartButton = true, addToCart }) => {
  // const {state:{products}}= useLocation()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [productName, setProductName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [showButton, setshowButton] = useState(showAddToCartButton)

  console.log('====================================');
  // console.log(product.q);
  console.log('====================================');
  // const [forceRerender, setForceRerender] = React.useState(true);

  // const [minValue, setMinValue ]=useState(0)
  // const [maxValue, setMaxValue ]=useState(20000)
  // const [step, setStep ]=useState(150)
  // const [firstValue, setFirstValue ]=useState(0)
  // const [secondValue, setSecondValue ]=useState(10000)

  useEffect(() => {
    setFilteredProducts(() => [...products])
  }, [products])

  const filterByName = (e) => {
    setProductName(e.target.value)
    if (products.length > 0) {
      const filteredProd = products.filter(product => product.name.includes(e.target.value))
      setFilteredProducts(filteredProd)
    }
  }
  const filterbyBrandName = (e) => {
    setBrandName(e.target.value)

    if (products.length > 0 && e.target.value != "") {
      const filteredProd = products.filter(product => product.owner && product.owner.marketName.includes(e.target.value))
      setFilteredProducts([...filteredProd])
    } else setFilteredProducts(products)
  }

  const addToCarthandler = (prod) => {
    console.log('***************************************',
      setProducts(products.map(product => {
        if (product._id.toString() === prod._id.toString()) {
          product.quantity = --prod.quantity;
        }
        return product;
      })));
    addToCart(prod._id)
  }

  const showStock = (product) => {
    {
      if (product.quantity > 0) {
        return (
          <>
         
            <span className="badge badge-primary badge-pill mb-2">In Stock</span>          
            <br></br>
           
          </>
        )
      } else {
        return (<>
          <span className="badge badge-primary badge-pill mb-2">Out of Stock</span>
          {() => setshowButton(false)}
        </>
        )
      }
    };
  }
  // const filterByPrice=(event,name)=>{    
  //   let value = event.target.value;
  //   if(name === "second"){        
  //   		if(parseInt(firstValue) < parseInt(value)){
  //           setSecondValue(value)
  //       }
  //   }
  //   else{
  //   		if(parseInt(value) < parseInt(secondValue)){      
  //         setFirstValue(value) 
  //       }
  //   }  
  //   if (products.length > 0 && event.target.value != "") {
  //     const filteredProd = products.filter(product => product.price>=firstValue && product.price<= secondValue)
  //     setFilteredProducts([...filteredProd])
  //   }
  // }

  return (
    <>
    <ToastContainer />
      <div className="container" style={{ width: '60%', marginTop: "50px" }}>
        {products.length > 0 ?
          <div className='row'>

            <input className="form-control" style={{ width: '20%', margin: '5px' }} value={productName} onChange={filterByName} placeholder="Enter Product Name" />
            <input className="form-control" style={{ width: '20%', margin: '5px' }} value={brandName} onChange={filterbyBrandName} placeholder="Enter Brand Name" />
            {/* <section className="range-slider">

                <input type="range" value={firstValue} min={minValue}  step={step}  onChange={(e)=>filterByPrice( e,"first")}/>
                <input type="range" value={secondValue} max={maxValue} step={step} onChange={(e)=>filterByPrice(e,"second")}/>

                <div className="minValue">{firstValue}</div>
                <div className="maxValue">{secondValue}</div>
            </section> */}

          </div>
          : <h4 style={{ margin: 'auto 0' }}>There are no Products</h4>

        }
        <div className="row">
          {filteredProducts && filteredProducts.map((product, index) => {
            if (products.length === index + 1) {

              return (
                <Card style={{ width: '20rem', marginTop: '10px' }} key={product._id} ref={lastProductElementRef}>
                  <Card.Img variant="top" src={`${domain}/${product.images_path[0]}`} style={{ width: '90%', margin: 'auto', marginTop: '10px', flex: '1 0 auto', height: '10rem' }} />
                  <Card.Body style={{ flexShrink: 0 }}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text style={{ color: '#006fcc' }}>
                      {product.price} <span style={{ fontSize: '10px' }}>EGP</span>
                    </Card.Text>
                    <Card.Text style={{ color: '#006fcc' }}>
                      <span style={{ fontSize: '10px' }}></span>
                      {showStock(product)}
                    </Card.Text>

                    <div style={{ display: 'flex',flexDirection:'column', 'justifyContent': 'space-around', flexShrink: 0 }}>
                    <Link to={`/${product._id}/ownerinfo`}> <Button variant="danger" className="btn-card" style={{width:'100%', margin:'2px 0px'}} ><VisibilityIcon /> View</Button></Link>
                      {product.quantity > 0&&isLoggedIn()&&<Button variant="danger"style={{width:'100%', margin:'2px 0px'}} onClick={() => {
                        addToCarthandler(product)
                      }} className="btn-card"><ShoppingCartOutlinedIcon type="shopping-cart" /> Add to Cart</Button>
                    }
                    </div>
                  </Card.Body>
                </Card>
              )

            }
            else {
              return (
                <Card style={{ width: '20rem', marginTop: '10px' }} key={product._id}>
                  <Card.Img variant="top" src={`${domain}/${product.images_path[0]}`} style={{ width: '90%', margin: 'auto', marginTop: '10px', flex: '1 0 auto', height: '10rem' }} />
                  <Card.Body style={{ flexShrink: 0 }}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text style={{ color: '#006fcc' }}>
                      {product.price} <span style={{ fontSize: '10px' }}>EGP</span>
                    </Card.Text>
                    <Card.Text style={{ color: '#006fcc' }}>


                      <span style={{ fontSize: '10px' }}></span>
                      {showStock(product)}
                    </Card.Text>
                    <div style={{ display: 'flex',flexDirection:'column', 'justifyContent': 'space-around', flexShrink: 0 }}>
                    <Link to={`/${product._id}/ownerinfo`}> <Button variant="danger" className="btn-card" style={{width:'100%',  margin:'2px 0px'}} >View</Button></Link>
                      {product.quantity> 0&&isLoggedIn()&&<Button variant="danger"style={{width:'100%', margin:'2px 0px'}} onClick={() => {
                        addToCarthandler(product)
                        toast('Product added to your cart successfully!');
                      }} className="btn-card">Add to Cart</Button>
                    }
                    </div>
                  </Card.Body>
                </Card>
              )
            }
          })}
        </div>
      </div>
    </>
  )

}

export default ShowProducts

