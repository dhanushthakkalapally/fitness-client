import React from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router";
import publicAppRoutes from "../publicApp/publicAppRoutes";

const PublicAppContainer = () => {
    const {auth} = useSelector(state => {
        return {
            auth: state.auth
        }
    })
    const {isAuthenticated} = auth;
    console.log(isAuthenticated)
    return (
        <Switch>
            {publicAppRoutes.map((item, idx) => <Route path={item.path} render={props => {
                const {canAllow, component: Component} = item;
                if ((isAuthenticated && canAllow) || !isAuthenticated) {
                    return <Component props={props}/>
                }
                return <Redirect to="/dashboard"/>
            }} idx={idx}/>)}

        </Switch>
    )
}

export default PublicAppContainer;
