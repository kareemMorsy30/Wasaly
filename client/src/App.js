import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { Router, Switch, Route } from 'react-router-dom'
// import NavBar from './components/navbar'
import CreateProduct from './components/product owner/createProduct'
import UpdateProduct from './components/product owner/updateProduct'
import ListProducts from './components/product owner/listProducts';
import Connections from './components/product owner/connection';
import ProductOwnerDetails from './components/product owner/productOwnerDetails';
import ListCatProducts from './components/product owner/CategoryProducts';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AdminLogin from "./components/admin/adminLogin";
import ServiceOwnerProfile from "./components/service owner/serviceOwnerProfile";
import UserNavBar from "./components/user/userNavBar";
import UserAndCustomerNavBar from "./components/customer/navbar";
/*** Service owners */
import ServiceOwnerOrders from './components/service owner/orders';
/**
 * Admin NavBar Ya adham :)
 */
import NavBar from "./components/admin/adminNavBar";
import ServiceOrderForm from './components/customer/serviceForm';
// import Delivery from './components/customer/delivery';
import Delivery from './components/customer/delivery';
import Order from './components/user/orders';
import OrderDetails from './components/user/orderDetails'
import ProductDetails from './components/product owner/Cart/ProductDetails';
// import Cart from './components/product owner/Cart/Cart';
import CartPage from './components/product owner/Cart/CartPage';


// import MainCart  from './components/product owner/Cart/AddCart';
import LandingPage from './pages/landingPage'
import {isUser, isCustomer} from './services/authServices'
import SearchResults from './pages/searchResults'
import FooterPage from './components/footer'

function App() {
  return (

    <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
      {/* <NavBar/> */}

      {isUser() || isCustomer() ||1?
        <UserAndCustomerNavBar/>:''  
      }
      <div style={{  flex: '1 0 auto', marginTop:'12vh'}}>
   
      <Route exact path="/service-owner/orders" component={ServiceOwnerOrders} />
      <Route exact path="/service-owner/connection" component={ProductOwnerDetails} />
      <Route exact path="/product-owner/connections" component={Connections} />

        <Switch>
          <Route exact path="/products" component={ListProducts} />
          <Route exact path="/serviceownerprofile/:id" component={ServiceOwnerProfile} />

          <Route exact path="/products/create" component={CreateProduct} />
          <Route exact path="/products/:id/edit" component={UpdateProduct} />
          <Route exact path="/admin">
            <NavBar />
            <AdminLogin />
          </Route>
          <Route exact path="/register" component={Register} />

          <Route exact path="/" component={LandingPage} />
            {/* <UserNavBar /> */}
            {/* <Route exact path="/" component={Delivery} /> */}


          <Route exact path="/search/:id" component={SearchResults}/>
          {/* CategoryProducts.js */}
            <Route exact path="/categoryproducts/:id" component={ListCatProducts} />
            <div className="container">
            <Route exact path="/test" >
            </Route>
            <Route exact path="/sO" component={ServiceOrderForm} />
            {/* <Route exact path="/" component={Delivery} /> */}

            <Route exact path="/orders" component={Order} />
            <Route exact path="/orders/:id" component={OrderDetails} />
            {/* http://localhost:3000/5ef231d4a5a9572baa78364f/ownerinfo */}
            <Route exact path="/:id/ownerinfo" component={ProductDetails} />
            {/* <Route exact path="/cart" component={Cart} /> */}
            <Route exact path="/login" component={Login} />
          
          <Route exact path="/user/cart" component={CartPage} />
           
           {/* <div className="menu-items">
                
              {products.map(item => <Products item={item} key={item.itemId} handleClick={this.handleClick} {...props} />)}
       
       </div> 
       
           }/> */} 
        
          </div>
          </Switch>
          </div>
           <FooterPage/>
      </div>

   

  );
}

export default App;
