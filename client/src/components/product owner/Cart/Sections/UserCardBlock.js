import React,{useState} from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  
function UserCardBlock(props) {
    const domain = process.env.REACT_APP_BACKEND_DOMAIN
    const classes = useStyles();

    console.log('====================================');
    console.log(props);
    console.log('====================================');
const [owner, setowner] = useState()
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `${domain}/${image}`
        }
    }

    console.log('====================Owner================');
    // console.log(props.products.owner);
    // let owner=props;
    console.log(props);
    
    console.log('====================================');

    const renderItems = () => (
        props.products && props.products.map(product => (
            <tr key={product._id}>
<td style={{
                    backgroundColor: "initial"
                }}>
                    <img style={{ width: '70px' }} alt="product"
                        src={renderCartImage(product.images_path)} />
                </td>
                <td style={{
                    backgroundColor: "initial"
                }}>{product.amount} </td>

<td style={{
                    backgroundColor: "initial"
                }}> {product.price} EG</td>

              
                <td style={{
                    backgroundColor: "initial"
                }}> {product.name} </td>


                {/* <td style={{
                    backgroundColor: "initial"
                }}>$ {!props.owner[0].owner.ownerName:} </td> */}


                

               
                <td style={{
                    backgroundColor: "initial"
                }}>
                    <Button  onClick={() => props.removeItem(product._id)}
                      variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
                    >Remove</Button>
                </td>
               
               
               
                {/* <td style={{
                    backgroundColor: "initial"
                }}>
                    <Link to="/addOrder" className="btn btn-primary">Make Order</Link>

                </td> */}
            </tr>
        ))
    )


    return (
       
       
        // {
            
            
            
            
        //    { props.products.length >0?  
        <Table striped bordered hover variant="dark">

            <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Brand Name</th>
                    <th>Remove from Cart</th>
                </tr>
            </thead>
            <tbody>
                {renderItems()}
            </tbody>

        </Table>
        // : <div>"Loading..."</div>}

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