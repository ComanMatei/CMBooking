import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/users'; 

export const createUser = (user) => axios.post(REST_API_BASE_URL, user);

export const assignRoleToUser = (userId, roleId) => {
    // Trimiterea ID-ului utilizatorului și ID-ului rolului către backend
    return axios.post(`${REST_API_BASE_URL}/${userId}/${roleId}`);
};

export const getUserByEmail = (userEmail) => axios.get(`${REST_API_BASE_URL}/verify-email/${userEmail}`, userEmail);

export const updatePassword = (userEmail, user) => axios.put(REST_API_BASE_URL + '/' + userEmail , user);

export const getUser = (userEmail) => axios.get(REST_API_BASE_URL + '/' + userEmail);

export const updateUser = (userEmail, user) => axios.put(`${REST_API_BASE_URL}/updateProfile/${userEmail}`, user);