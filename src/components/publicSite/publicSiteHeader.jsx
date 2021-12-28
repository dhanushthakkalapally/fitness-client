import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import './styles/publicHeader.css';
import {connect} from "react-redux";
import {Routes} from "../../utils/routesUtil";
import {clearAuth} from "../../store/actions/authAction";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};
const mapDispatchToProps = dispatch => {
    return {
        clearAuth: () => dispatch(clearAuth())
    }
};

class PublicSiteHeader extends Component {
    handleSignOut = () => {
        this.props.clearAuth()
    };

    render() {
        const {isAuthenticated} = this.props.auth;
        return (
            <>
                <Navbar expand="lg" className="navBar p-0">
                    <div className="container">
                        <Navbar.Brand className="navBrand">
                            <Link to={Routes.landingPage.url}>Fitness</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                            <ul className="navbar-nav">
                                <li className="nav-item navElement me-2"><Link to="/about">About</Link></li>
                                {!isAuthenticated &&
                                <li className="nav-item navElement me-2"><Link to={Routes.login.url}>Sign in</Link>
                                </li>}
                                {isAuthenticated && <li className="nav-item navElement me-2"><Link
                                    to={Routes.dashboard.url}>Dashboard</Link></li>}
                                {isAuthenticated && <li className="nav-item navElement me-2"><a onClick={this.handleSignOut}>Sign out</a></li>}
                            </ul>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </>)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PublicSiteHeader);
