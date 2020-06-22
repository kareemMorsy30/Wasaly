import React, { useState, useEffect } from 'react'
import { Card, Button} from 'react-bootstrap'

import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    useParams,
    useLocation
  } from "react-router-dom";
  

const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`

const SearchResults = () => {
    const {state:{products}}= useLocation()
    console.log(products)
    return (
        <>
        <div className="container" style={{width:'60%', marginTop:"50px"}}>
        <div className="row">

    
          
         {products&& products.map((product)=>
             <Card style={{ width: '20rem', marginTop:'10px' }}>
             <Card.Img variant="top" src={`${domain}/${product.images_path[0]}`} style={{width:'90%', margin:'auto', marginTop:'10px'}}/>
             <Card.Body>
               <Card.Title>{product.name}</Card.Title>
               <Card.Text>
                {product.description}
               </Card.Text>
               <div style={{display:'flex', 'justify-content': 'space-around'}}>
                    <Button variant="danger" className="btn-card" >View</Button>
                    <Button variant="danger"  className="btn-card">Add to Cart</Button>
               </div>
             </Card.Body>
           </Card>
         )}
         </div>
        </div>
        </>
    )

}

export default SearchResults