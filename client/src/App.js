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
/**** Admin ****/
import AdminServiceOwners from './components/admin/serviceOwners';
import All from './components/admin/categories/all';
/**
 * Admin NavBar Ya adham :)
 */
import NavBar from "./components/admin/adminNavBar";
import ServiceOrderForm from './components/customer/serviceForm';
// import Delivery from './components/customer/delivery';
import Category from './components/Category';
import Delivery from './components/customer/delivery';
import Order from './components/user/orders';
import OrderDetails from './components/user/orderDetails'
import ProductDetails from './components/product owner/Cart/ProductDetails';
import Cart from './components/product owner/Cart/Cart';

// import MainCart  from './components/product owner/Cart/AddCart';
import LandingPage from './pages/landingPage'
import { isUser, isCustomer, isProductOwner, isServiceOwner } from './services/authServices'
import SearchResults from './pages/searchResults'
import FooterPage from './components/footer'
import ProductOwnerRoute from './components/routes/productOwnerRoute'
import UserRoute from './components/routes/UserRoute'



function App() {
  return (

    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* <NavBar/> */}

      {isUser() || isCustomer() || isProductOwner() || isServiceOwner() ?
        <UserAndCustomerNavBar /> : ''
      }
      <div style={{  flex: '1 0 auto', marginTop:'12vh'}}>
      {/* Product owner routes */}
      <Route exact path="/product-owner/connections" component={Connections} />

      {/* Service owner routes */}
      <Route exact path="/service-owner/orders" component={ServiceOwnerOrders} />
      <Route exact path="/service-owner/connection" component={ProductOwnerDetails} />

      {/* Admin routes */}
      <Route exact path="/admin/service-owners" component={AdminServiceOwners} />
      <Route exact path="/admin/categories" component={All} />

        <Switch>
          <Route exact path="/serviceownerprofile/:id" component={ServiceOwnerProfile} />


          <Route exact path="/admin">
            <NavBar />
            <AdminLogin />
          </Route>


          <Route exact path="/register" component={Register} />

          <Route exact path="/" component={LandingPage} />
          {/* <UserNavBar /> */}
          {/* <Route exact path="/" component={Delivery} /> */}


          <Route exact path="/search/:id" component={SearchResults} />
          <Route exact path="/categoryproducts/:id" component={ListCatProducts} />


          <div className="container">
            <ProductOwnerRoute exact path="/products/create">
                <CreateProduct />
            </ProductOwnerRoute>

            <ProductOwnerRoute exact path="/products/:id/edit">
                <UpdateProduct />
            </ProductOwnerRoute>

            <ProductOwnerRoute exact path="/products">
              <ListProducts />
            </ProductOwnerRoute>


            {/* <Route exact path="/test" >
              < Category />
            </Route> */}
            <Route exact path="/sO" component={ServiceOrderForm} />
            {/* <Route exact path="/" component={Delivery} /> */}

            <Route exact path="/orders" component={Order} />
            <Route exact path="/orders/:id" component={OrderDetails} />

            <Route exact path="/:id/ownerinfo" component={ProductDetails} />
            <UserRoute exact path="/cart">
               <Cart />
            </UserRoute>
            <Route exact path="/login" component={Login} />


            {/* <div className="menu-items">
                
              {products.map(item => <Products item={item} key={item.itemId} handleClick={this.handleClick} {...props} />)}
       
       </div> 
       
           }/> */}

          </div>
        </Switch>
      </div>
      <FooterPage />
    </div>



  );
}

export default App;
