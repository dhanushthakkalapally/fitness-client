import React, {useEffect} from "react";
import {Formik, Form} from "formik";
import InputElement from "../../sharedInteface/inputElement";
import {register} from "../../appClient";
import {useHistory} from "react-router";
import { Auth } from 'aws-amplify';

const Register = () => {
    const initialValues = {
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    }
    const history = useHistory();
    const handleSignUp = async (values) => {
        const {username, email, password} = values;
        console.log(email)
        const res =  await Auth.signUp({
            username: email,
            password,
            attributes: {
                preferred_username: username,
                // gender: "Male",
                // firstname: firstName,
                // lastname: lastName
            }
        });
        console.log(res)
        history.push("/welcome");
    }

    useEffect(() => {
        document.title = "Sign up"
    }, [])

    return (
        <div className="row">
            <div className="utPosCenter col-sm-8 col-md-7 col-lg-3">
                <div className="basicCard p-4">
                    <h3 className="text-center">Sign up</h3>
                    <Formik initialValues={initialValues}
                            onSubmit={handleSignUp}
                    >
                        {
                            () => (<Form>
                                    <div className="p-2">
                                        <InputElement label="Username:"
                                                      required
                                                      type="input"
                                                      id="username"
                                                      name="username"
                                        />
                                    </div>
                                <div className="p-2">
                                    <InputElement label="Email:"
                                                  required
                                                  type="email"
                                                  id="email"
                                                  name="email"
                                    />
                                </div>
                                <div className="p-2">
                                    <InputElement label="Password:"
                                                  required
                                                  type="password"
                                                  id="password"
                                                  name="password"
                                    />
                                </div>
                                <div className="p-2">
                                    <InputElement label="Confirm Password:"
                                                  required
                                                  type="password"
                                                  id="confirmPassword"
                                                  name="confirmPassword"
                                    />
                                </div>
                                <div className="p-2">
                                    <button type="submit"
                                            className="btn btn-block btn-primary btn-md"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </Form>)
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
};

export default Register;
