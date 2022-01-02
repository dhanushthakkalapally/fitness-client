import {lazy} from "react";
const dashboard = lazy(() => import("../../src/privateApp/pages/dashboard"))

const privateAppRoutes = [
    {
        path: "/dashboard",
        component: dashboard,
        name: "app dashboard",
        exact: true
    }
]

export default privateAppRoutes;
