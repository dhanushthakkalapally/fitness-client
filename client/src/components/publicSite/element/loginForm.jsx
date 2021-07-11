import React, {Component} from "react";
import FormInput from "../../ui/element/formInput";
import BasicCard from "../../ui/element/basicCard";
import '../styles/loginForm.css';

class LoginForm extends Component {
    render() {
        return (
            <div className="d-flex container formContainer justify-content-center align-items-center">
                <div className="inputContainer">
                    <BasicCard>
                        <h3 className="text-center formHeader">Sign in</h3>
                        <form>
                            <div className="formInputGroup container my-2">
                                <FormInput label="Email/Username"
                                           id="loginEmail">
                                </FormInput>
                            </div>
                            <div className="formInputGroup container my-2">
                                <FormInput label="Password"
                                           id="loginPassword">
                                </FormInput>
                            </div>
                            <div className="formInputGroup container text-center my-2">
                                <button className="btn btn-lg ">Sign in</button>
                            </div>
                        </form>
                    </BasicCard>
                </div>
            </div>
        )
    }
}

export default LoginForm;