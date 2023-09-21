import axios from "axios";
import qs from "qs";

export const client = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  paramsSerializer: {
    serialize: (params) =>
      qs.stringify(params, {
        skipNulls: true,
        indices: false,
      }),
  },
});

client.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.error(error, "api request error");
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error(error.toJSON(), "api error");

    return Promise.reject(error);
  }
);
