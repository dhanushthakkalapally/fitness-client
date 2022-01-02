import React from "react";
import {useSelector} from "react-redux";
import {Route} from "react-router";

const PrivateAppContainer = () => {
    const {auth} = useSelector(state => {
        return {
            auth: state.auth
        }
    })

    console.log(auth);
    return (
        <>

        </>
    )
}

export default PrivateAppContainer;
