import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/image'; 

export const createImage = (image) => axios.post(REST_API_BASE_URL, image);
  
