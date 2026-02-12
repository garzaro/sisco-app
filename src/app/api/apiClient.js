import api from "@/app/api/db-connection.js";

const httpClient = api;

const ApiServiceClient = (apiurl) => {
  return {
    apiurl: apiurl,
    post: (url, objeto) => {
      const requestUrl = `${apiurl}${url}`;
      return httpClient.post(requestUrl, objeto);
    },
    put: (url, objeto) => {
      const requestUrl = `${apiurl}${url}`;
      return httpClient.put(requestUrl, objeto);
    },
    get: (url) => {
      const requestUrl = `${apiurl}${url}`;
      return httpClient.get(requestUrl);
    }

  }
}
export default ApiServiceClient;
