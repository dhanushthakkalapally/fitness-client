import React, {useEffect, useState} from "react";
import {Formik, Form} from "formik";
import InputElement from "../../sharedInteface/inputElement";
import {useHistory} from "react-router";
import {Auth} from 'aws-amplify';
import toast from "react-hot-toast";

const Register = () => {
    const [codePageInfo, setCodePageInfo] = useState({showCodePage: false});



    const initialValues = {
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    }

    const history = useHistory();

    const handleSignUp = async (values) => {
        try {
        const {username, email, password} = values;
        console.log(email)
        const res = await Auth.signUp({
            username: email,
            password,
            attributes: {
                preferred_username: username,
                // gender: "Male",
                // firstname: firstName,
                // lastname: lastName
            }
        });
        setCodePageInfo({showCodePage: true, cognitoInfo: res})
        console.log(res);
    } catch (err) {
        console.error(err);
        toast.error(err.message, {duration: 4000});
    }
    }

    const {cognitoInfo, showCodePage} = codePageInfo;

    const handleCodeSubmit = async (values) => {
        try {
            const {code} = values;
            const {user} = cognitoInfo;
            const {username} = user;
            const res = await Auth.confirmSignUp(username, code)
            history.push("/welcome");
            console.log(res)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        document.title = "Sign up"
    }, [])


    return (
        <div className="row">
            <div className="utPosCenter col-sm-8 col-md-7 col-lg-3">
                {!showCodePage && <div className="basicCard p-4">
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
                </div>}
                {showCodePage && (
                    <div className="basicCard p-4">
                        <h3>Please Enter the code here</h3>
                        <Formik initialValues={{code: ""}}
                                onSubmit={handleCodeSubmit}
                        >
                            {() => (
                                <Form>
                                    <div className="p-2">
                                        <InputElement label="Code:"
                                                      required
                                            // type="password"
                                                      id="code"
                                                      name="code"
                                        />
                                        <div className="p-2 d-flex justify-content-center">
                                            <button type="submit"
                                                    className="btn btn-primary btn-md"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}
            </div>

        </div>
    )
};

export default Register;
