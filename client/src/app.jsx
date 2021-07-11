import React from "react";
import BaseComponent from "./components/baseComponent";
import {Switch} from "react-router";
import PublicSiteContainer from "./components/publicSite/publicSiteContainer";
import getPathUrl from "./utils/routesUtil";

class App extends BaseComponent {

    static buildRouteParams(componentName, exact = true) {
        const path = getPathUrl(componentName);
        return {
            componentName,
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
                </Switch>
            </>
        );
    }
}


export default App;
