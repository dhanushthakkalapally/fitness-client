import React from "react";
import {Form, Formik} from "formik";
import InputElement from "../../sharedInteface/inputElement";
import {Link} from "react-router-dom";
import {login} from "../../appClient";
import {useDispatch} from "react-redux";
import {configureAuth} from "../../store/actions/authAction";
import {submitSpinner} from "../../utils/generalUtils";

const Login = () => {
    const dispatch = useDispatch();
    const handleLogin = async (values) => {
        const {email, password} = values;
        const res = await login(email, password);
        const {data} = res;
        const {accessToken} = data;
        dispatch(configureAuth(accessToken));
    }
    return (
        <>
            <div className="basicCard utPosCenter w-25">
                <h3 className="text-center">WELCOME</h3>
                <Formik initialValues={{email: "", password: ""}} onSubmit={handleLogin}>
                    {({isSubmitting}) => (<Form>
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
                                    disabled={isSubmitting}
                            >
                                {submitSpinner(isSubmitting)} Login
                            </button>
                        </div>
                    </Form>)

                    }
                </Formik>
                <p className="text-center">
                    <strong className="p-2">
                        Don't have an account ?
                        <Link to="/register"
                              className="text-inverted"> Sign
                            up
                        </Link>
                    </strong>
                </p>
            </div>
        </>
    )
}

export default Login;
