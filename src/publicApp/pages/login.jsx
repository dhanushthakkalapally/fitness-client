import React from "react";
import {Form, Formik} from "formik";
import InputElement from "../../sharedInteface/inputElement";
import {Link} from "react-router-dom";


const Login = props => {
    return (
        <>
            <div className="basicCard utPosCenter w-25">
                <h3 className="text-center">WELCOME</h3>
                <Formik initialValues={{email: "", password: ""}} onSubmit={() => console.log("gelkj")}>
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
