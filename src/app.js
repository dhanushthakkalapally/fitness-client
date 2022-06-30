import React, {Suspense, useEffect} from "react";
import {Route} from "react-router";
import AppRoutes from "./appRoutes";
import PublicAppHeader from "./publicApp/publicAppHeader";
import PrivateAppHeader from "./privateApp/privateAppHeader";
import {useDispatch, useSelector} from "react-redux";
import {configureAuth} from "./store/actions/authAction";

const App = () => {
    const {auth} = useSelector(state => {
        return {
            auth: state.auth
        }
    })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(configureAuth())
    }, [dispatch])

    const {isAuthenticated, authLoading} = auth;

     if (authLoading) {
        return <>Please wait site is loading...</>
    }

    return (
        <>
            {!isAuthenticated && <PublicAppHeader/>}
            {isAuthenticated && <PrivateAppHeader/>}
            {AppRoutes.map((item, idx) => <Route key={idx} path={item.path} render={(props) => {
                return <Suspense fallback={<></>}>
                    <item.component props={props}/>
                </Suspense>
            }}/>)}
        </>
    );

}


export default App;
