import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/property'; 

export const createProperty = (property) => axios.post(REST_API_BASE_URL, property);

export const assignOwnerAndImageToProperty = (userEmail, propertyId) => axios.post(`${REST_API_BASE_URL}/${userEmail}/${propertyId}`);

export const findByLocation = (location) => axios.post(REST_API_BASE_URL + '/' + location);

export async function getProperties(page = 0, size = 10) {
    return await axios.get(`${REST_API_BASE_URL}?page=${page}&size=${size}`);
} 

export const deleteProperty = (propertyId) => axios.delete(REST_API_BASE_URL + '/' + propertyId);