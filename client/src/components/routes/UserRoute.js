import {isLoggedIn} from '../../services/authServices'
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export default function UserRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                }}
            />
          )
        }
      />
    );
  }