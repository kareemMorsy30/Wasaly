import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { Router, Switch, Route } from 'react-router-dom'
// import NavBar from './components/navbar'
import CreateProduct from './components/product owner/createProduct'
import UpdateProduct from './components/product owner/updateProduct'
import ListProducts  from './components/product owner/listProducts';
import Connections from './components/product owner/connection';
import Register from "./components/auth/Register";
import AdminLogin from "./components/admin/adminLogin";
import UserNavBar from "./components/user/userNavBar";
/*** Service owners */
import ServiceOwnerOrders from './components/service owner/orders';
/**
 * Admin NavBar Ya adham :)
 */
import NavBar from "./components/admin/adminNavBar";
import ServiceOrderForm from './components/customer/serviceForm';
import Delivery from './components/customer/delivery';
import Order  from './components/user/orders';
import OrderDetails from './components/user/orderDetails'

function App() {
  return (
    
      <div>
        {/* <NavBar/> */}

        <Route exact path="/service-owner/orders" component={ServiceOwnerOrders} />

        <Route exact path="/product-owner/connections" component={Connections} />

        <div className="container">
          
          <Switch>
            <Route exact path="/products" component={ListProducts} />
            <Route exact path="/products/create" component={CreateProduct} />
            <Route exact path="/products/:id/edit" component={UpdateProduct} />
            <Route exact path="/admin">
                <NavBar />
                <AdminLogin />
            </Route>
            <Route exact path="/register" component={ Register } />

                <Route exact path="/" >
                    <UserNavBar />
                    <Route exact path="/" component={Delivery} />
                </Route>
            
            {/* <Route exact path="/" component={ServiceOrderForm} /> */}
            {/* <Route exact path="/" component={Delivery} /> */}
           
            <Route exact path="/orders" component={Order} />
            <Route exact path="/orders/:id" component={OrderDetails} />
          </Switch>
        </div>
      </div>

   

  );
}

export default App;
