/**
 * Need to define component name and path here so to get and
 * same component name should be specified in the app.jsx
 * */

export const Routes = {
    landingPage: {url: '/'},
    login: {url: '/login'},
    dashboard: {url: '/dashboard'},
    about: {url: '/about'}
};

export default function getPathUrl(pageName) {
    if (pageName) {
        if (Routes[pageName]) {
            return Routes[pageName].url;
        }
    }
    return undefined;
}
