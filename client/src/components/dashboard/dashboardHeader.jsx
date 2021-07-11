import React, {Component} from "react";
import {connect} from "react-redux";
import {clearAuth} from "../../store/actions/authAction";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        clearAuth: () => {dispatch(clearAuth())},
    }
};

class DashboardHeader extends Component {


    render() {
        console.log(this.props)
        const {clearAuth} = this.props;
        this.checkAuthentication();
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

    checkAuthentication() {
        const {auth, history} = this.props;
        if (auth.isAuthenticated) {
            return true;
        } else {
            console.log('Redirecting to Landing Page.....!');
            //    redirect to landing page
            history.replace('/');
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardHeader));