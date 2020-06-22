
import React from 'react';
import './Product.css';
import {Link, Switch, Route} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Products from './Products'
// import Cart from './cart'

class ProductDetails extends React.Component {
    state={
        products:[],
        cart:[],
        totalPrice:0,
        product:{}
    }
    
    
    handleClick=(e)=>{
      console.log('====================================');
      console.log("PRODUCTDETAILS");
      console.log('====================================');
    
   let repeated=false
       const {cart}=this.state
       console.log('====================================');
       console.log("Cart :  ",cart);
       console.log('====================================');
       cart.forEach(item=>{
        console.log('====================================');
        console.log(item._id===e._id);
        console.log('====================================');
           if(item._id===e._id){
         
               item.quantity+=1;
               
               repeated=!repeated;
           }
          
       })
       
       if(!repeated) {
           cart.push(e)
       
         this.setState({cart:cart})
     }
            this.total()
    }
    handleCart=(item,id)=>{
      item.item={}
    
   let repeated=false
       const {cart,products}=this.state
       
       cart.forEach(item=>{
         
           if(item.itemId===id){
           
               item.quantity+=1;
               
               repeated=!repeated;
           }
          
       })
       
       if(!repeated) {
           products.forEach(item=>{
               if(item.itemId===id){
                          cart.push(item)
               }
           })
       
    
       
         this.setState({cart:cart})
     }
            this.total()
    }
    
    
    total=()=>{
        const {cart}=this.state
        let total=0
        let i=0;
        
        cart.forEach((item)=>{
            
          
                 if(item.price)
                 
                 {total +=item.price*item.quantity
                 console.log('====================================');
                 console.log("total",total);
                 console.log('====================================');    }           
            else total+=item.price*item.quantity
                 
            i++;
          
        } )
        
     
     return this.setState({totalPrice:total})
           
      
        
    }
    
    fetchProduct=(id)=>{
        
        this.setState({product:id})
                 
    }
      delete=(e)=>{
        const {cart}=this.state
        let c=0;
        
        for(let i=0;i<cart.length;i++){
            if(cart[i].itemId===e.itemId){
                 c=i;
                break
            }
           
        }

        cart[c].quantity=1;
        cart.splice(c,1)
        this.total()
        return this.setState({cart:cart})
        
    }
      
       handleChange=(event,cartItem)=> {
         const {cart}=this.state
       console.log(event.target)
         cart.forEach(item=>{
             if(item.itemId===cartItem.itemId){
              
              item.quantity=event.target.value
              console.log(item.quantity)
             }
         })
       this.setState({cart:cart});
         this.total()
  }
    
    
    componentDidMount(){
  const id = this.props.match.params.id;

                fetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/product/${id}/ownerinfo`, 
                      { 
                        method: 'get', 
                        headers: new Headers({
                        "Authorization": "e8dc5e3d7edc21ac2dcfd847d8d29eae"
                        })
                        }).then(response => response.json())
                        .then(data => { data.forEach(item => {item.quantity=1});
                    this.setState({products:data})}
                             )
                
                
        
            }
handleProduct=(id)=>{
    console.log(id)
    this.setState({product:id})
    
}

render(){
    const {products,cart,product}=this.state
return (
 <div className="menu-items">
                     
{products.map(item => <Products item={item} product={product} handleClick={this.handleClick} key={item.itemId} handleCart={this.handleCart} />)}

</div>  
)

}

}
export default ProductDetails;
