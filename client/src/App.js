import React from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
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

   

=======
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './user/Home';

function App() {
  return (
    <Router>
      <Switch>
              {/* routes available for all */}
              <Route exact path="/" component={Home}/>
      </Switch>
    </Router>
>>>>>>> edfd540e782bd9ecd09dd8ac0abe42f265f09976
  );
}

export default App;
