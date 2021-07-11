import React from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import './styles/publicHeader.css';

function PublicSiteHeader(props) {
    return (
        <>
            <Navbar expand="lg" className="navBar">
                <div className="container">
                    <Navbar.Brand className="navBrand">
                        Fitness
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-between" id="responsive-navbar-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item navElement"><Link to="/">Home</Link></li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item navElement me-2"><Link to="/about">About</Link></li>
                            <li className="nav-item navElement me-2"><Link to="/login">Sign in</Link></li>
                        </ul>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>)
};


export default PublicSiteHeader;