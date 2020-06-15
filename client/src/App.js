import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { Router, Switch, Route } from 'react-router-dom'
// import NavBar from './components/navbar'
import CreateProduct from './components/product owner/createProduct'
import UpdateProduct from './components/product owner/updateProduct'
import ListProducts  from './components/product owner/listProducts';
import ServiceOrderForm from './components/customer/serviceForm';

function App() {
  return (
    
      <div>
        {/* <NavBar/> */}

        <div className="container">
    
          <Switch>
            <Route exact path="/products" component={ListProducts} />
            <Route exact path="/products/create" component={CreateProduct} />
            <Route exact path="/products/:id/edit" component={UpdateProduct} />
            <Route exact path="/" component={ServiceOrderForm} />
          </Switch>
        </div>
      </div>

   

  );
}

export default App;
