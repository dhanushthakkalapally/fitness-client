import {lazy} from "react";

const Login = lazy(() => import("../publicApp/pages/login"));
const LandingPage = lazy(() => import("../publicApp/pages/landingPage"))

const publicAppRoutes = [
    {
     name: "login",
     path: "/login",
     component: Login,
     canAllow: false
    },
    // {
    //     name: "signup",
    //     path: "/signup"
    // },
    {
        name: "landingPage",
        path: "",
        component: LandingPage,
        canAllow: true
    }
]

export default publicAppRoutes;
