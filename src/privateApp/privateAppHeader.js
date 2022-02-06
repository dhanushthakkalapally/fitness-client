import React from "react";
import {useDispatch} from "react-redux";
import {clearAuth} from "../store/actions/authAction";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const PrivateAppHeader = () => {
    const dispatch = useDispatch();

    return (
        <Navbar expand="lg" className="navBar p-0">
            <div className="container">
                <Navbar.Brand className="navBrand">
                    <Link to="/"> MyYbe </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse className="justify-content-between" id="responsive-navbar-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item navElement"><Link to={"/dashboard"}>Home</Link></li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item navElement me-2">
                            <a href="#" onClick={(event) => {
                                event.preventDefault();
                                dispatch(clearAuth())
                                }
                            }
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )

}

export default PrivateAppHeader;
