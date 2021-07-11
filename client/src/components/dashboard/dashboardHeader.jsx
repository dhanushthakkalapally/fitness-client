import React, {Component} from "react";
import {connect} from "react-redux";
import {clearAuth} from "../../store/actions/authAction";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const mapDispatchToProps = dispatch => {
    return {
        clearAuth: () => {
            dispatch(clearAuth())
        },
    }
};

class DashboardHeader extends Component {

    render() {
        return (
            <Navbar expand="lg" className="navBar">
                <div className="container">
                    <Navbar.Brand className="navBrand">
                        <Link to="/"> Fitness </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-between" id="responsive-navbar-nav">
                        <ul className="navbar-nav ml-auto">
                            {/*<li className="nav-item navElement"><Link to="/">Home</Link></li>*/}
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item navElement me-2" onClick={clearAuth}>Sign out</li>
                        </ul>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }

}

export default connect(mapDispatchToProps)(DashboardHeader);