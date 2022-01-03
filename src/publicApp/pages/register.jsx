import React from "react";
import {Formik, Form} from "formik";
import InputElement from "../../sharedInteface/inputElement";
import {register} from "../../appClient";

const Register = props => {
    const initialValues = {
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: ""
    }
    const handleSignUp = async (values, {setSubmitting}) => {
        const {firstName, lastName, email, password} = values;
        const res = await register(firstName, lastName, email, password);
        console.log(res.data)
    }


    return (
        <>
            <div className="basicCard utPosCenter w-25">
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
        </>
    )
};

export default Register;
