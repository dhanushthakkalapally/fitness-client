import React, {Component, lazy, Suspense} from "react";
import PublicSiteHeader from "./publicSiteHeader";
import {Route} from "react-router";


class PublicSiteContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.componentsCache = {};
    }

    render() {
        const {path} = this.props;
        const Page = this.getComponentInstance();
        return (
            <>
                <section>
                    <PublicSiteHeader/>
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

export default PublicSiteContainer;