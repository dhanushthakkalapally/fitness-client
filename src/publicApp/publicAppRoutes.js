import {lazy} from "react";
import About from "../publicApp/pages/about";
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
        name: "landingPage",
        path: "",
        component: LandingPage,
        canAllow: true
    }
]

export default publicAppRoutes;
