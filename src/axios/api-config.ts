import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL as string,
});

export const EndPoints = {
  users: "users",
  nft: "nft",
} as const;

type EndPointType = typeof EndPoints;

// create a union from the objects keys (SQUARE | CIRCLE)
type EndPointsKeys = keyof EndPointType;

// create a union from the objects values (square | circle)
export type EndPointsValues = EndPointType[EndPointsKeys];
