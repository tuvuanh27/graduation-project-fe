import { api } from "./api-config";
import type { EndPointsValues } from "./api-config";

function paramsSerializer(params: any) {
  return Object.entries(Object.assign({}, params))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

export async function getAxios<T>(
  endpoint: EndPointsValues | string,
  params?: any
) {
  return await api.get<T>(`${endpoint}?${paramsSerializer(params)}`);
}

export async function deleteAxios<T>(endpoint: EndPointsValues, id: string) {
  return await api.delete<T>(`${endpoint}/${id}`);
}

export async function postAxios<T>(endpoint: EndPointsValues, arg: T) {
  return await api.post(`${endpoint}`, arg);
}

export async function axiosFormData<T>(endpoint: EndPointsValues, arg: T) {
  const formData = new FormData();
  Object.keys(arg).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append(key, arg[key]);
  });
  return await api.post<T>(`${endpoint}`, arg, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function putAxios<RT, BT>(
  endpoint: EndPointsValues,
  id: string,
  arg: BT
) {
  return await api.put<RT>(`${endpoint}/${id}`, arg);
}
