import axios from "axios";

const requestConfig = {
    baseURL: window.__RUNTIME_CONFIG__.DOMAIN_NAME + "api"
}
export const instance = axios.create(requestConfig);

/***
 * submits username and password and returns the response
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = async (email, password) => {
    return instance.post("/login", {email, password});
}

/***
 * get the user information
 * @param userId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUser = async (userId) => {
    return instance.get(`/users/${userId}`)
}

/***
 *
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @returns {Promise<AxiosResponse<any>>}
 */
export const register = async (firstName, lastName, email, password) => {
    return instance.post("/users", {
         firstName,
        email,
        password,
        lastName
    })
}

export const getActivities = async (userId) => {
    const url = `/users/${userId}/activities`;
    return instance.get(url);
}

export const createActivity = async (userId, activity) => {
    const url = `/users/${userId}/activities`;
    return instance.post(url, activity);
}
