import React, {Component, lazy, Suspense} from "react";
import {Route} from "react-router";
import DashboardHeader from "./dashboardHeader";


class DashboardContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.componentsCache = {};
    }

    render() {
        const {path} = this.props;
        const Page = this.getComponentInstance();
        console.log(this.props, Page);
        return (
            <>
                <section>
                    <DashboardHeader/>
                </section>
                <Route path={path} exact render={
                    props => {
                        //This component is loaded lazily
                        return (
                            <>
                                <Suspense fallback={<></>}>
                                    <Page {...props}>
                                    </Page>
                                </Suspense>
                            </>
                        )
                    }
                }>
                </Route>

            </>
        )

    }

    getComponentInstance() {
        const {pageName} = this.props;
        if (!this.componentsCache[pageName]) {
            //This will import required component lazily only when required
            this.componentsCache[pageName] = lazy(() => import('./pages/' + pageName));
        }

        return this.componentsCache[pageName];
    }
}

export default DashboardContainer;