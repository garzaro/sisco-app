import api from "@/app/api/db-connection.js";

const httpClient = api;

const ApiServiceClient = (apiurl) => {
  return {
    apiurl: apiurl,
    post: (url, objeto) => {
      const requestUrl = `${apiurl}${url}`;
      return httpClient.post(requestUrl, objeto);
    },
  }
}
export default ApiServiceClient;

/**
 * to-do list
 * [] Ver httpUrl com zod
 *
 * put: (url, objeto) => {
 *       const requestUrl = `${apiurl}${url}`;
 *       return dbConnection.put(requestUrl, objeto);
 *     },
 *
 * delete: (url) => {
 *       const requestUrl = `${apiurl}${url}`;
 *       return dbConnection.delete(requestUrl);
 *     },
 *     get: (url) => {
 *       const requestUrl = `${apiurl}${url}`;
 *       return dbConnection.get(requestUrl);
 *     }
 *
 *
 *
 * **/
// CONTINUAR COM O ERRO DE REDE VER IA

// import axios from "axios";
//
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
//
// // Remove / duplicadas e normaliza
// const normalizePath = (path) => {
//   if (!path) return "";
//   return "/" + path.replace(/^\/+|\/+$/g, "");
// };
//
// const dbConnection = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
//   timeout: 10000, // boa prática
// });
//
// // Interceptor de erros globais
// dbConnection.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (!error.response) {
//       // offline / timeout
//       return Promise.reject({
//         message: "Erro de conexão. Verifique sua internet.",
//       });
//     }
//
//     if (error.response.status === 401) {
//       // não autorizado → redirecionar para login
//       // ou disparar refresh token
//     }
//
//     return Promise.reject(error.response.data || error);
//   }
// );
//
// export const ApiServiceClient = (apiurl = "") => {
//   const base = normalizePath(apiurl);
//
//   const buildUrl = (endpoint) => base + normalizePath(endpoint);
//
//   return {
//     get: (url, config = {}) => dbConnection.get(buildUrl(url), config),
//
//     post: (url, data, config = {}) =>
//       dbConnection.post(buildUrl(url), data, config),
//
//     put: (url, data, config = {}) =>
//       dbConnection.put(buildUrl(url), data, config),
//
//     delete: (url, config = {}) => dbConnection.delete(buildUrl(url), config),
//   };
// };
