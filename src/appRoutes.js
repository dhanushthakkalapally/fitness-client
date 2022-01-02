import {lazy} from "react";

const publicSiteContainer = lazy(() => import('../src/publicApp/publicAppContainer'));
const privateSiteContainer = lazy(()=> import("../src/privateApp/privateAppContainer"));

const AppRoutes = [
    {
        path: "",
        component: publicSiteContainer,
        name: "public application",
    },
    {
        path: "",
        component: privateSiteContainer,
        name: "private application"
    }
]

export default AppRoutes;
