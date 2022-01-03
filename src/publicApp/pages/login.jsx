import React from "react";
import {Form, Formik} from "formik";
import InputElement from "../../sharedInteface/inputElement";
import {Link} from "react-router-dom";
import {getUser, login} from "../../appClient";
import jwtDecode from "jwt-decode";

const Login = props => {
    const handleLogin = async (values, {setSubmitting}) => {
        const {email, password} = values;
        const res = await login(email, password);
        const {data} = res;
        const {accessToken} = data;
        const decoded_token = jwtDecode(accessToken);
        const {userId} = decoded_token;
        const {data: userDetails} = await getUser(userId);
        console.log(userDetails);
    }
    return (
        <>
            <div className="basicCard utPosCenter w-25">
                <h3 className="text-center">WELCOME</h3>
                <Formik initialValues={{email: "", password: ""}} onSubmit={handleLogin}>
                    {() => (<Form>
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
                            <button type="submit"
                                    className="btn btn-block btn-primary btn-md"
                            >
                                Login
                            </button>
                        </div>
                    </Form>)

                    }
                </Formik>
                <p className="text-center"><strong className="p-2">
                    Don't have an account ?
                    <Link to="/register"
                          className="text-inverted"> Sign
                        up</Link></strong></p>
            </div>
        </>
    )
}

export default Login;
