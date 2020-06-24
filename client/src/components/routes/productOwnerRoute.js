import {isProductOwner,isLoggedIn} from '../../services/authServices'
import React from 'react'
import {Route, Redirect} from 'react-router-dom'


export default function ProductOwnerRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isProductOwner() ? (
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