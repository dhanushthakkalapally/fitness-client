import React, {useEffect} from "react";
import {Form, Formik} from "formik";
import InputElement from "../../sharedInteface/inputElement";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {configureAuth} from "../../store/actions/authAction";
import {submitSpinner} from "../../utils/generalUtils";
import {Auth} from "aws-amplify";

const Login = () => {
    const dispatch = useDispatch();
    const handleLogin = async (values) => {
        const {email, password} = values;
        const res = await Auth.signIn(email, password);
        console.log(res);
        dispatch(configureAuth());
    }

    useEffect(() => {
        document.title = "login"
    }, []);

    return (
        <>
            <div className="row">
                <div className="utPosCenter col-sm-8 col-md-6 col-lg-3">
                    <div className="basicCard p-3 col-12">
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
                                <span className="p-1">
                                <Link to="/register"
                                      className="text-inverted">Sign
                                    up
                                </Link> </span>
                            </strong>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
