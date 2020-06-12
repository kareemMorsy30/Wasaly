import React from 'react';
import logo from './logo.svg';
import './App.css';
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
  );
}

export default App;
