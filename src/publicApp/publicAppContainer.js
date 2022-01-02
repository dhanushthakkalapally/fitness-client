import React from "react";
import {useSelector} from "react-redux";

const PublicAppContainer = () => {
    const {auth} = useSelector(state => {
        return {
            auth: state.auth
        }
    })

    console.log(auth);
    return (
        <>
            SANJU IS GREATS
        </>
    )
}

export default PublicAppContainer;
