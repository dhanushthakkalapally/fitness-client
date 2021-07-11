import React from "react";
import BaseComponent from "./components/baseComponent";
import {Switch} from "react-router";
import PublicSiteContainer from "./components/publicSite/publicSiteContainer";
import getPathUrl from "./utils/routesUtil";
import DashboardContainer from "./components/dashboard/dashboardContainer";

class App extends BaseComponent {

    static buildRouteParams(pageName, exact = true) {
        const path = getPathUrl(pageName);
        return {
            pageName,
            path,
            exact
        }
    }

    render() {
        return (
            <>
                <Switch>
                    {/*Switch make the components inside it singleton that means publicSiteContainer will only be initialized once and upon next call only render is called
                 and componentDidUpdate **need to get more understanding*** */}
                    <PublicSiteContainer {...App.buildRouteParams('landingPage')}/>
                    <PublicSiteContainer {...App.buildRouteParams('login')}/>
                    <DashboardContainer {...App.buildRouteParams('dashboard')}/>
                </Switch>
            </>
        );
    }
}


export default App;
