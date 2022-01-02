import React from "react";
import BaseComponent from "../../baseComponent";
import LoginForm from "../../components/publicSite/element/loginForm";
import {connect} from 'react-redux';
import {setAuth} from "../../store/actions/authAction";
import LoadingComponent from "../../components/ui/element/loadingComponent";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAuth: details => {
            dispatch(setAuth(details))
        }
    }
};

class Login extends BaseComponent {
    signInHandler = (email, password) => {
        const {setAuth} = this.props;
        const postData = {
            email,
            password
        };
        this.apiPost('signIn', 'user/login', postData, res => {
            //Now deal with sign in so when the user logged in
            // set the item in local storage and take it with every next request
            const {data} = res;
            if (data.isAuthenticated) {
                setAuth(data);
            }
            this.setState({
                verifying: false,
                error: false
            });
        }, err => {
            this.setState({
                verifying: false,
                error: true
            });
            console.error(err);
        });
        this.setState({
            verifying: true
        })
    };

    render() {
        const {verifying, error} = this.state;
        return (<>
        {error && <div className="alert-danger text-center">Invalid credentials!</div>}
            {verifying && <div className="mt-5"><LoadingComponent color="#ff8e01" text="Authenticating..."/></div>}
            {!verifying && <LoginForm signInHandler={this.signInHandler}/>}
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);