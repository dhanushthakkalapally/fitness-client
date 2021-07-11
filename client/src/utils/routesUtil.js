/**
 * Need to define component name and path here so to get and
 * same component name should be specified in the app.jsx
 * */

const Routes = {
    'landingPage': {url: '/'}
};

export default function getPathUrl(componentName) {
    if (componentName) {
        if (Routes[componentName]) {
            return Routes[componentName].url;
        }
    }
    return undefined;
}
