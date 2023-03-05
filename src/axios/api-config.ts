import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BASE_URL,
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
