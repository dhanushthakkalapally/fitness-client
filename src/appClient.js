import axios from "axios";

const requestConfig = {
    baseUrl: window.window.__RUNTIME_CONFIG__.DOMAIN_NAME
}
const instance = axios.create(requestConfig+"/api");

/***
 * submits username and password and returns the response
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = async (username, password) => {
    return instance.post("/login", {username, password});
}
