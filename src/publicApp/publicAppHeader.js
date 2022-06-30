import React from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const PublicAppHeader = () => {
    const {auth} = useSelector(state => {
        return {
            auth: state.auth
        }
    });
    const {isAuthenticated} = auth;
    return (
        <Navbar expand="lg" className="navBar p-0">
            <div className="container">
                <Navbar.Brand className="navBrand">
                    <Link to={""}>TurtleTurtleRun</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item navElement me-2"><Link to="/about">About</Link></li>
                        {!isAuthenticated &&
                            <li className="nav-item navElement me-2"><Link to={"/login"}>Sign in</Link>
                            </li>}
                        {isAuthenticated && <li className="nav-item navElement me-2"><Link
                            to={"/dashboard"}>Dashboard</Link></li>}
                        {isAuthenticated &&
                            <li className="nav-item navElement me-2">
                                <a onClick={this.handleSignOut}>Sign out</a>
                            </li>
                        }
                    </ul>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default PublicAppHeader;
