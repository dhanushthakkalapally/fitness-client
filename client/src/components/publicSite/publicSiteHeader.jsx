import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import './styles/publicHeader.css';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {Routes} from "../../utils/routesUtil";

const mapStateToProps= state=> {
  return {
      auth: state.auth
  }
};


class PublicSiteHeader extends Component {


    render() {
        const {isAuthenticated} = this.props.auth;
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
                                <li className="nav-item navElement"><Link to={Routes.landingPage.url}>Home</Link></li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item navElement me-2"><Link to="/about">About</Link></li>
                                {!isAuthenticated && <li className="nav-item navElement me-2"><Link to={Routes.login.url}>Sign in</Link></li>}
                                {isAuthenticated && <Redirect to={Routes.dashboard.url}/>}
                            </ul>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </>)
    }
};


export default connect(mapStateToProps, null)(PublicSiteHeader);