import axios from "axios";
// console.log(window.__RUNTIME_CONFIG__.DOMAIN_NAME)
const requestConfig = {
    baseURL: window.__RUNTIME_CONFIG__.DOMAIN_NAME + "/api"
}
const instance = axios.create(requestConfig);

/***
 * submits username and password and returns the response
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = async (email, password) => {
    return instance.post("/login", {email, password});
}

export const getUser = async (userId) => {
    return instance.get(`/users/${userId}`)
}
