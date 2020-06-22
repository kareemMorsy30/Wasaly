import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Card, Button } from 'react-bootstrap'

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const ShowProducts = ({ products, lastProductElementRef }) => {
  // const {state:{products}}= useLocation()
  
  console.log(products)
  return (
    <>
      <div className="container" style={{ width: '60%', marginTop: "50px" }}>
        <div className="row">
          {products && products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <Card style={{ width: '20rem', marginTop: '10px' }} key={product._id} ref={lastProductElementRef}>
                  <Card.Img variant="top" src={`${domain}/${product.images_path[0]}`} style={{ width: '90%', margin: 'auto', marginTop: '10px' }} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      {product.description}
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
              return(
                <Card style={{ width: '20rem', marginTop: '10px' }} key={product._id}>
                  <Card.Img variant="top" src={`${domain}/${product.images_path[0]}`} style={{ width: '90%', margin: 'auto', marginTop: '10px' }} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      {product.description}
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