import {isServiceOwner,isLoggedIn} from '../../services/authServices'
import React from 'react'
import {Route, Redirect} from 'react-router-dom'


export default function ServiceOwnerRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isServiceOwner() ? (
            children
          ) : (
            <Redirect

              to={                  
                isLoggedIn?{
                pathname: "/login",
                state: { from: location }
              }:{
                pathname: "/",
                state: { from: location }
              }
            
            }
            />
          )
        }
      />
    );
  }