import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Card, Button } from 'react-bootstrap'
import {Typography, Slider} from '@material-ui/core';
import InputRange from 'react-input-range';

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const ShowProducts = ({ products, lastProductElementRef }) => {
  // const {state:{products}}= useLocation()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [productName, setProductName] = useState('')
  const [brandName, setBrandName] = useState('')
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
      <div className="container" style={{ width: '60%', marginTop: "50px" }}>
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
        <div className="row">
          {filteredProducts && filteredProducts.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <Card style={{ width: '20rem', marginTop: '10px' }} key={product._id} ref={lastProductElementRef}>
                  <Card.Img variant="top" src={`${domain}/${product.images_path[0]}`} style={{ width: '90%', margin: 'auto', marginTop: '10px' }} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text style={{ color: '#006fcc' }}>
                      {console.log(product.price)}
                      {product.price} <span style={{ fontSize: '10px' }}>EGP</span>
                    </Card.Text>
                    <div style={{ display: 'flex', 'justifyContent': 'space-around' }}>
                      <Button variant="danger" className="btn-card" >View</Button>
                      <Button variant="danger" className="btn-card">Add to Cart</Button>
                    </div>
                  </Card.Body>
                </Card>
              )

            }
            else {
              return (
                <Card style={{ width: '20rem', marginTop: '10px' }} key={product._id}>
                  <Card.Img variant="top" src={`${domain}/${product.images_path[0]}`} style={{ width: '90%', margin: 'auto', marginTop: '10px' }} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text style={{ color: '#006fcc' }}>
                      {console.log(product.price)}
                      {product.price} <span style={{ fontSize: '10px' }}>EGP</span>
                    </Card.Text>
                    <div style={{ display: 'flex', 'justifyContent': 'space-around' }}>
                      <Button variant="danger" className="btn-card" >View</Button>
                      <Button variant="danger" className="btn-card">Add to Cart</Button>
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