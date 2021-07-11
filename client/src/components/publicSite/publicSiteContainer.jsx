import React, {Component, lazy, Suspense} from "react";
import PublicSiteHeader from "./publicSiteHeader";
import {Route, withRouter} from "react-router";
import {connect} from "react-redux";
import {Routes} from "../../utils/routesUtil";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

class PublicSiteContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.componentsCache = {};
    }

    componentDidMount() {
        this.checkAuthentication();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkAuthentication();
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

    checkAuthentication() {
        const {auth, history} = this.props;
        if (auth.isAuthenticated) {
            //    Need to redirect to the dashboard
            history.replace(Routes.dashboard.url);
        }
    }
}

export default withRouter(connect(mapStateToProps, null)(PublicSiteContainer));