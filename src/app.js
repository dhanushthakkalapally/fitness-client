import React from "react";
import BaseComponent from "./components/baseComponent";
import {Switch} from "react-router";
import PublicSiteContainer from "./components/publicSite/publicSiteContainer";
import getPathUrl from "./utils/routesUtil";
import DashboardContainer from "./components/dashboard/dashboardContainer";
import {connect} from "react-redux";
import {setAuth} from "./store/actions/authAction";
import LoadingComponent from "./components/ui/element/loadingComponent";
// import * as Process from "process";
const mapDispatchToProps = dispatch => {
    return {
        setAuth: (details) => dispatch(setAuth(details))
    }
};

class App extends BaseComponent {
    constructor(props, context) {

        const opts = {
            pageLoad: {
                postData: {},
                url: 'web/initialize',
                onSuccessHandler: res => {
                    const {isAuthenticated, firstName, lastName, dobYear, dobMonth, roleId, token} = res.data;
                    if (isAuthenticated) {
                        props.setAuth({firstName, lastName, dobYear, dobMonth, roleId, token});
                    }
                    this.setState({siteInitializing: false})
                }
                , onErrorHandler: err => {
                    console.log(err)
                    this.setState({siteInitializing: false})
                }
            }
        };
        super(props, context, opts);
        this.state = {
            siteInitializing: true
        }
    }

    static buildRouteParams(pageName, exact = true) {
        const path = getPathUrl(pageName);
        return {
            pageName,
            path,
            exact
        }
    }

    render() {
        const {siteInitializing} = this.state;
        if (siteInitializing) {
            return <LoadingComponent text="Loading Site..." />
        }
        return (
            <>
                <Switch>
                    {/*Switch make the components inside it singleton that means publicSiteContainer will only be initialized once and upon next call only render is called
                 and componentDidUpdate **need to get more understanding*** */}
                    <PublicSiteContainer {...App.buildRouteParams('landingPage')} avoidVerification/>
                    <PublicSiteContainer {...App.buildRouteParams('login')}/>
                    <PublicSiteContainer {...App.buildRouteParams('about')} avoidVerification/>
                    <DashboardContainer {...App.buildRouteParams('dashboard')}/>
                </Switch>
            </>
        );
    }

}


export default connect(null, mapDispatchToProps)(App);
