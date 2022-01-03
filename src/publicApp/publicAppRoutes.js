import {lazy} from "react";
import About from "../publicApp/pages/about";
const Register  =  lazy(() => import("./pages/register"));
const Login = lazy(() => import("../publicApp/pages/login"));
const LandingPage = lazy(() => import("../publicApp/pages/landingPage"))


const publicAppRoutes = [
    {
     name: "login",
     path: "/login",
     component: Login,
     canAllow: false
    },
    {
        component: About,
        exact: true,
        name: "about",
        path: "/about"
    },
    {
        component: Register,
        exact: true,
        name: "register",
        path: "/register"
    },
    {
        name: "landingPage",
        path: "",
        component: LandingPage,
        canAllow: true,
        exact: true
    }
]

export default publicAppRoutes;
