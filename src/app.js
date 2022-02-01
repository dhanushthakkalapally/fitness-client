import React, {Suspense} from "react";
import {Route} from "react-router";
import AppRoutes from "./appRoutes";
import PublicAppHeader from "./publicApp/publicAppHeader";
import PrivateAppHeader from "./privateApp/privateAppHeader";
import {useSelector} from "react-redux";

const App = () => {
     const {auth} = useSelector(state => {
        return {
            auth: state.auth
        }
    })
    const {isAuthenticated} = auth;
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
