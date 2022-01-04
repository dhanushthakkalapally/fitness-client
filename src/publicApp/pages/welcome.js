import React from "react";
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <>
        <h2 className="text-center pt-5">Welcome! Let's start our fitness journey.</h2>
            <div className="d-flex justify-content-center"> <button className="btn btn-md btn-primary "><Link to="/login" className="text-white">Sign in Here!</Link></button></div>
        </>
    )
}

export default Welcome;
