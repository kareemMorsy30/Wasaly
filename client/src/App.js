import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import { Router, Switch, Route } from 'react-router-dom'
// import NavBar from './components/navbar'
import CreateProduct from './components/product owner/createProduct'
import UpdateProduct from './components/product owner/updateProduct'

function App() {
  return (
    
      <div>
        {/* <NavBar/> */}

        <div className="container">
    
          <Switch>
            <Route exact path="/product/create" component={CreateProduct} />
            <Route exact path="/product/edit" component={UpdateProduct} />
          </Switch>
        </div>
      </div>

   

  );
}

export default App;
