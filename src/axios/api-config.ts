import axios, { AxiosError } from "axios";
import { ADDRESS_KEY, useWeb3 } from "../hooks/useWeb3/useWeb3";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL as string,
});

// interceptors
api.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // set headers

    // get address from local storage
    const address = localStorage.getItem(ADDRESS_KEY);
    if (address) {
      config.headers["address"] = address;
    }

    return config;
  },
  (error: AxiosError) => {
    // do something with request error
    return Promise.reject(error);
  }
);

export const EndPoints = {
  createPending: "nft/create-pending",
} as const;

type EndPointType = typeof EndPoints;

// create a union from the objects keys (SQUARE | CIRCLE)
type EndPointsKeys = keyof EndPointType;

// create a union from the objects values (square | circle)
export type EndPointsValues = EndPointType[EndPointsKeys];
