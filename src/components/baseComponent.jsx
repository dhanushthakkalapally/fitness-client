import React, {Component} from 'react';
import axios from 'axios';

/***
 * These components mainly contains a bunch of utility methods to make api calls
 * and can be extended by other components
 * */
class BaseComponent extends Component {
    opts;
    state = {};

    constructor(props, context, opts = {}) {
        super(props, context);
        this.opts = opts;
    }

    makeApiRequest(method, identifier, url, data, onSuccessHandler, onErrorHandler, opts) {
        if (!opts) {
            opts = {headers: {}}
            }
        console.log(opts);

        if (!opts.noAuthorization && !opts.headers.Authorization) {
            //    Then set the Authorization token from the local Storage
            opts.headers.Authorization = BaseComponent.getBearerToken();
        }
        return axios({
            method,
            url: BaseComponent.baseUrl + '/' + url,
            data,
            params: opts.params,
            headers: opts.headers
        }).then(res => {
            //Here we can do some tracking of the request
            onSuccessHandler(res);
        }).catch(err => {
            console.error(err);
            if (onErrorHandler) {
                onErrorHandler(err);
            }
        })
    }


    apiPost(identifier, url, postData, onSuccess, onError, opts) {
        this.makeApiRequest('post', identifier, url, postData, onSuccess, onError, opts)
    }

    apiGet(identifier, url, onSuccess, onError, opts) {
        this.makeApiRequest('get', identifier, url, undefined, onSuccess, onError, opts);
    }

    componentDidMount() {
        const {pageLoad} = this.opts;
        if (pageLoad) {
            const {url, postData, onSuccessHandler, onErrorHandler, opts} = pageLoad;
            if (postData) {
                this.apiPost('pageLoad', url, postData, onSuccessHandler, onErrorHandler, opts);
            } else {
                this.apiGet('pageLoad', url, onSuccessHandler, onErrorHandler, opts);
            }
        }
    }
}

BaseComponent.baseUrl = 'http://127.0.0.1:5000/api';

BaseComponent.getBearerToken = () => {
    //This need to come from global state
    const token = localStorage.getItem('token');
    if (token) {
        return `${token}`;
    }
    return undefined;
};

export default BaseComponent;
