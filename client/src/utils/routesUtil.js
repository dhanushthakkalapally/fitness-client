/**
 * Need to define component name and path here so to get and
 * same component name should be specified in the app.jsx
 * */

const Routes = {
    'landingPage': {url: '/'}
};

export default function getPathUrl(pageName) {
    if (pageName) {
        if (Routes[pageName]) {
            return Routes[pageName].url;
        }
    }
    return undefined;
}
