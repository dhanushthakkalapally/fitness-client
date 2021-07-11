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
        const {componentName} = this.props;
        if (!this.componentsCache[componentName]) {
            //This will import required component lazily only when required
            this.componentsCache[componentName] = lazy(() => import('./pages/' + componentName));
        }

        return this.componentsCache[componentName];
    }
}

export default PublicSiteContainer;