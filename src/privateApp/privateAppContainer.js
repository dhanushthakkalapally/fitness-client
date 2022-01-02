import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router";
import privateAppRoutes from "./privateAppRoutes";
import PrivateAppHeader from "./privateAppHeader";

const PrivateAppContainer = () => {
    const {auth} = useSelector(state => {
        return {
            auth: state.auth
        }
    })
    // const {isAuthenticated} = auth;
    const isAuthenticated = true
    return (
        <>
            {isAuthenticated && <PrivateAppHeader/>}
            <Switch>
                {privateAppRoutes.map((item, idx) =>
                    <Route path={item.path} render={props => {
                        return isAuthenticated ?
                            <item.component props={props}/> :
                            <Redirect to="/login"/>
                    }} key={idx}/>)}
            </Switch>
        </>
    )
}

export default PrivateAppContainer;
