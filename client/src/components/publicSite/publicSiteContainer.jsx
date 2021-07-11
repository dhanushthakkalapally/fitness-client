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
        const Component = this.getComponentInstance();
        return (
            <>
                <section>
                    <PublicSiteHeader/>
                </section>
                <Route path={path} exact render={
                    props => {
                        return (
                            <>
                                <Suspense fallback={<></>}>
                                    <Component {...props}>
                                    </Component>
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
        const {routeName} = this.props;
        if (!this.componentsCache[routeName]) {
            //This will import required component lazily only when required
            this.componentsCache[routeName] = lazy(() => import('./pages/' + routeName));
        }

        return this.componentsCache[routeName];
    }
}

export default PublicSiteContainer;