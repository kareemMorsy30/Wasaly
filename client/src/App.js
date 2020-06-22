import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { Router, Switch, Route } from 'react-router-dom'
// import NavBar from './components/navbar'
import CreateProduct from './components/product owner/createProduct'
import UpdateProduct from './components/product owner/updateProduct'
import ListProducts  from './components/product owner/listProducts';
import ListCatProducts  from './components/product owner/CategoryProducts';
import Register from "./components/auth/Register";
import AdminLogin from "./components/admin/adminLogin";
import UserNavBar from "./components/user/userNavBar";
import ServiceOwnerOrders from './components/service owner/orders';
/**
 * Admin NavBar Ya adham :)
 */
import NavBar from "./components/admin/adminNavBar";
import ServiceOrderForm from './components/customer/serviceForm';
// import Delivery from './components/customer/delivery';
import Category from './components/Category';
import Delivery from './components/customer/delivery';
import Order  from './components/user/orders';
import OrderDetails from './components/user/orderDetails'
import ProductDetails from './components/product owner/Cart/ProductDetails';
import Cart from './components/product owner/Cart/Cart';

// import MainCart  from './components/product owner/Cart/AddCart';

function App() {
  return (
    
      <div>
        {/* <NavBar/> */}

        <Route exact path="/service-owner/orders" component={ServiceOwnerOrders} />

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
                    {/* <Route exact path="/" component={Delivery} /> */}

                </Route>

              <Route exact path="/test" >
                    < Category/>
                </Route>
            <Route exact path="/sO" component={ServiceOrderForm} />
            {/* <Route exact path="/" component={Delivery} /> */}
           
            <Route exact path="/orders" component={Order} />
            <Route exact path="/orders/:id" component={OrderDetails} />
            <Route exact path="/categoryproducts/:id" component={ListCatProducts} />

            <Route exact path="/:id/ownerinfo" component={ProductDetails} />
            <Route exact path="/cart" component={Cart} />
          
           
          </Switch>
        </div>
      </div>

   

  );
}

export default App;
