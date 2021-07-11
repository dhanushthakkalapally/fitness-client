import React from "react";
import BaseComponent from "../../baseComponent";
import LoginForm from "../element/loginForm";

class Login extends BaseComponent {
    signInHandler = (email, password) => {
        const postData = {
            email,
            password
        };
        this.apiPost('signIn', 'user/login', postData, res => {
            console.log(res.data);
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

export default Login;