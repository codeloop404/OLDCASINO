import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode'
const AUTH = localStorage.getItem('superAdmintoken')
// var decoded = decode(AUTH);
// console.log(decoded);

if(AUTH){
    var decoded = decode(AUTH);
    console.log(decoded._id);
    localStorage.setItem("USERID",decoded._id) 
}



 const SuperPrivateRoute = ({ component:Component, ...rest }) => (
    <Route {...rest} render={props => (
        AUTH
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

export default SuperPrivateRoute;