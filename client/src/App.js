import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { Router, Switch, Route } from 'react-router-dom'
// import NavBar from './components/navbar'
import CreateProduct from './components/product owner/createProduct'
import UpdateProduct from './components/product owner/updateProduct'
import ListProducts  from './components/product owner/listProducts';
import Register from "./components/auth/Register";
import AdminLogin from "./components/admin/adminLogin";
import UserNavBar from "./components/user/userNavBar";

/**
 * Admin NavBar Ya adham :)
 */
import NavBar from "./components/admin/adminNavBar";
import ServiceOrderForm from './components/customer/serviceForm';
import Delivery from './components/customer/delivery';

function App() {
  return (
    
      <div>
        {/* <NavBar/> */}

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
          </Switch>
        </div>
      </div>

   

  );
}

export default App;
