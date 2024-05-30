import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/renting'; 

export const createRenting = (renting) => axios.post(REST_API_BASE_URL, renting);

export const getAllRentings = (userEmail) => axios.get(REST_API_BASE_URL + '/' + userEmail);

export const getRentingByPropertyId = (propertyId) => axios.get(REST_API_BASE_URL + '/property/' + propertyId);

export const deleteRenting = (rentingId) => axios.delete(REST_API_BASE_URL + '/' + rentingId);