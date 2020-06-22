import React ,{useState}from 'react';
import './Product.css';
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import ProductDetails from './ProductDetails'
function Products({item,match,handleCart,handleClick,product,showAddToCartButton=true,  showRemoveProductButton = false,
  setRender = f => f,
  render = undefined
}) {
  const [redirect, setRedirect] = useState(false);
  
 const  addItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.push({
        ...item,
        count: 1
      });
      // remove duplicates
      // build an Array from new Set and turn it back into array using Array.from
      // so that later we can re-map it
      // new set will only allow unique values in it
      // so pass the ids of each object/product
      // If the loop tries to add the same value again, it'll get ignored
      // ...with the array of ids we got on when first map() was used
      // run map() on it again and return the actual product from the cart
  
      cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
        return cart.find(p => p._id === id);
      });
  
      localStorage.setItem('cart', JSON.stringify(cart));
      next();
    }
  };
  
// Add to cart functionality
const addToCart = () => {
  addItem(item, () => {
    setRedirect(true);
  });
};
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
    showAddToCartButton && (
      <button
        className="btn btn-outline-success mt-2 mb-2"
        onClick={addToCart}
      >
        Add to cart
      </button>
    )
  );
};
   console.log(match)
  return (
    
    <div className="card h-100 text-center">
    {
    console.log(item)
    }
    <div className="column card-body">

    <div className="card-header">{item.name}</div>
    <div className="card-image">
        {shouldRedirect(redirect)}
        <img src={`http://localhost:5000/1592636194850-Screenshot%20from%202020-06-15%2016-32-07.png`} alt={`localhost:5000/${item.images_path}`}/>
      </div>

                    <p>{item.description } </p>
                    <p>${item.price }</p>
                    <div>{showStock(item.quantity)}</div>
                   <li>
                        <Link to={`/${item._id}/ownerinfo`}> View </Link>
                        </li>
                        {showAddToCart(showAddToCartButton)}
                </div>
                </div>

        
  );
}

export default Products;
