import React, {useEffect} from "react";
import {Formik, Form} from "formik";
import InputElement from "../../sharedInteface/inputElement";
import {register} from "../../appClient";
import {useHistory} from "react-router";

const Register = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: ""
    }
    const history = useHistory();
    const handleSignUp = async (values) => {
        const {firstName, lastName, email, password} = values;
        await register(firstName, lastName, email, password);
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
                                <div className="d-flex justify-content-between">
                                    <div className="p-2">
                                        <InputElement label="Firstname:"
                                                      required
                                                      type="input"
                                                      id="firstName"
                                                      name="firstName"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <InputElement label="Lastname:"
                                                      required
                                                      type="input"
                                                      id="lastName"
                                                      name="lastName"
                                        />
                                    </div>
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
