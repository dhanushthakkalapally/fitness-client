import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router";
import publicAppRoutes from "../publicApp/publicAppRoutes";

const PublicAppContainer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    console.log(loading);
    console.log(error);
    useEffect(() => {
       // Promise.resolve().then(() => {
       //     // setLoading(false);
       //     // setError(true);
       // })
    }, [])
    const {auth} = useSelector(state => {
        return {
            auth: state.auth
        }
    })
    const {isAuthenticated} = auth;
    return (
        <>
            <Switch>
                {publicAppRoutes.map((item, idx) => <Route path={item.path} exact={item.exact} render={props => {
                    const {canAllow, component: Component} = item;
                    if ((isAuthenticated && canAllow) || !isAuthenticated) {
                        return <Component props={props}/>
                    }
                    return <Redirect to="/dashboard"/>
                }} key={idx}/>)}

            </Switch>
        </>
    )
}

export default PublicAppContainer;
