import React, {Component} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {clearAuth} from "../../store/actions/authAction";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Routes} from "../../utils/routesUtil";

const PrivateAppHeader = props => {
    const dispatch = useDispatch();
    const {auth} = useSelector(state => {
        return {
            auth: state.auth
        };
    });

    return (
        <Navbar expand="lg" className="navBar p-0">
            <div className="container">
                <Navbar.Brand className="navBrand">
                    <Link to="/"> Fitness </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse className="justify-content-between" id="responsive-navbar-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item navElement"><Link to={Routes.dashboard.url}>Home</Link></li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item navElement me-2"><a onClick={() => dispatch(clearAuth)}>Sign out</a></li>
                    </ul>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )

}

export default PrivateAppHeader;
