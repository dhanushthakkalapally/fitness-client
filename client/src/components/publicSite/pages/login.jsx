import React from "react";
import BaseComponent from "../../baseComponent";
import LoginForm from "../element/loginForm";
import {connect} from 'react-redux';
import {setAuth} from "../../../store/actions/authAction";

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
            setAuth(data)
        }, err => {
            console.error(err);
        })
    };

    render() {
        return (<>
            <LoginForm signInHandler={this.signInHandler}/>
        </>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);