import React from "react";
import {useSelector} from "react-redux";

const Dashboard = () => {
    const auth = useSelector(state => state.auth)
    console.log(auth)
    const {userDetails} = auth;

    const {preferred_username: userName} = userDetails;

    return (
        <h2 className="text-center">Welcome {userName}</h2>
    )
}

export default Dashboard;
