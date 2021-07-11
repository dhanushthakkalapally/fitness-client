import React, {Component} from "react";
import FormInput from "../../ui/element/formInput";
import BasicCard from "../../ui/element/basicCard";
import PropTypes from 'prop-types';
import '../styles/loginForm.css';

class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleSignIn = (e) => {
        const {email, password} = this.state;
        const {signInHandler} = this.props;
        e.preventDefault();
        signInHandler(email, password);
    };

    passwordHandler = (e) => {
        const password = e.target.value;
        this.setState({
            password
        })
    };

    emailHandler = (e) => {
        const email = e.target.value;
        this.setState({
            email
        })
    };

    render() {
        const {email, password} = this.state;
        return (
            <div className="d-flex container formContainer justify-content-center align-items-center">
                <div className="inputContainer">
                    <BasicCard>
                        <h3 className="text-center formHeader">Sign in</h3>
                        <form onSubmit={this.handleSignIn}>
                            <div className="formInputGroup container my-2">
                                <FormInput label="Email/Username"
                                           id="loginEmail"
                                           type="input"
                                           value={email}
                                           onChangeHandler={this.emailHandler}
                                >
                                </FormInput>
                            </div>
                            <div className="formInputGroup container my-2">
                                <FormInput label="Password"
                                           id="loginPassword"
                                           type="password"
                                           value={password}
                                           onChangeHandler={this.passwordHandler}
                                >
                                </FormInput>
                            </div>
                            <div className="formInputGroup container text-center my-2">
                                <button type="submit" className="btn btn-lg ">Sign in</button>
                            </div>
                        </form>
                    </BasicCard>
                </div>
            </div>
        )
    }
}

export default LoginForm;

LoginForm.propTypes = {
    signInHandler: PropTypes.func.isRequired
};