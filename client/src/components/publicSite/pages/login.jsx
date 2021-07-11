import React from "react";
import BaseComponent from "../../baseComponent";
import LoginForm from "../element/loginForm";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};



class Login extends BaseComponent {
    signInHandler = (email, password) => {
        const postData = {
            email,
            password
        };
        this.apiPost('signIn', 'user/login', postData, res => {
            //Now deal with sign in so when the user logged in
            // set the item in local storage and take it with every next request

            console.log(res.data);
        }, err => {
        })
    };

    render() {
        console.log(this.props);
        return (<>
            <LoginForm signInHandler={this.signInHandler}/>
        </>)
    }
}

export default connect(mapStateToProps, null)(Login);