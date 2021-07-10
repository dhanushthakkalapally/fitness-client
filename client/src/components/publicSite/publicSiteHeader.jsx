import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import './styles/publicHeader.css';

class PublicSiteHeader extends Component {
    render() {
        return (
            <>
                <Navbar expand="lg" className="navBar">
                    <Navbar.Brand>
                        Fitness
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-between" id="responsive-navbar-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to="/">Home</Link></li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item me-2"><Link to="/login">Login</Link></li>
                        </ul>
                    </Navbar.Collapse>
                </Navbar>
            </>)
    }
}


export default PublicSiteHeader;