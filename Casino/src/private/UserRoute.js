import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode'
const AUTH = localStorage.getItem('usertoken')
// var decoded = decode(AUTH);
// console.log(decoded._id);
// localStorage.setItem("USERID",decoded._id)

if(AUTH){
    var decoded = decode(AUTH);
    console.log(decoded._id);
    localStorage.setItem("USERID",decoded._id) 
}



 const PrivateRoute = ({ component:Component, ...rest }) => (
    <Route {...rest} render={props => (
        AUTH
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute;
