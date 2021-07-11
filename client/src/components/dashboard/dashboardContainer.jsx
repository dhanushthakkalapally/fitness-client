import React, {Component, lazy, Suspense} from "react";
import {Route, withRouter} from "react-router";
import DashboardHeader from "./dashboardHeader";
import {connect} from "react-redux";
import {Routes} from "../../utils/routesUtil";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

class DashboardContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.componentsCache = {};
    }

    componentDidMount() {
        this.checkAuthenticationStatus();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkAuthenticationStatus();
    }

    render() {
        const {path} = this.props;
        const Page = this.getComponentInstance();
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

    checkAuthenticationStatus() {
        const {auth, history} = this.props;
        console.log(this.props);
        if (!auth.isAuthenticated) {
            history.replace(Routes.landingPage.url);
        }

    }
}

export default withRouter(connect(mapStateToProps, null)(DashboardContainer));