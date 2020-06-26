import React from 'react'
import Table from 'react-bootstrap/Table'

function UserCardBlock(props) {
    const domain= process.env.REACT_APP_BACKEND_DOMAIN

console.log('====================================');
console.log(props);
console.log('====================================');

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `${domain}/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
                <td style={{ 
                    backgroundColor:"initial"
                 }}>
                    <img style={{ width: '70px' }} alt="product" 
                    src={renderCartImage(product.images_path)} />
                </td> 
                <td style={{ 
                    backgroundColor:"initial"
                 }}>{product.quantity} EA</td>
                <td style={{ 
                    backgroundColor:"initial"
                 }}>$ {product.price} </td>
                <td style={{ 
                    backgroundColor:"initial"
                 }}><button 
                onClick={()=> props.removeItem(product._id)}
                >Remove </button> </td>
            </tr>
        ))
    )


    return (
        <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
                </Table>
    )
}

export default UserCardBlock

/**
 *  { 
        
        
        props.products && props.products.map((product) => {

        <Table striped bordered hover variant="dark">
        
  <thead>
    <tr>
      <th>#</th>
      <th>Product Image</th>
      <th>Product Quantity</th>
      <th>Product Price</th>
    <th>Remove from Cart</th>
    </tr>
  </thead>
  <tbody>
         <tr key={product._id}>
                 <td>
                  <img style={{ width: '70px' }} alt="product" 
                    src={renderCartImage(product.images_path)} />
                </td> 
                <td>{product.quantity} EA</td>
                <td>$ {product.price} </td>
                <td><button 
                onClick={()=> props.removeItem(product._id)}
                >Remove </button> </td>
            </tr>
   
  
  </tbody>
 } ) }
 */