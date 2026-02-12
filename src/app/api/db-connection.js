import axios from "axios";

//const port = import.meta.env.PORT
//const version = import.meta.env.VERSION

const url_base = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL: ", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
    baseURL: url_base, /**`${url}:${port}/${version}/`**/
    headers: {
      'Content-Type': 'application/json',
      },
    withCredentials: false
    });
export default api;