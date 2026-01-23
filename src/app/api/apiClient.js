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
