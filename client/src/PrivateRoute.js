
// //tweaked from : https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e

import React from 'react';
import {  Route, 
          Redirect, 
          useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PrivateRoute ({ from, component: Component, ...rest }) {

    // Import user information from cookies.
    const authenticatedUser = Cookies.getJSON('authenticatedUser');
    const credentials = Cookies.getJSON('credentials');

    // Declare history variable.
    let location = useLocation();

    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page

    return (
        <Route {...rest}>
            {authenticatedUser ? (
                <Component authenticatedUser={authenticatedUser} credentials={credentials} />
                ) : (
                <Redirect to={{
                    pathname: '/signin',
                    state: { from: location.pathname }
                }} />)
            }
        </Route>
    )
}