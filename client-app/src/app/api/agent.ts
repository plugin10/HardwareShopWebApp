import axios, { AxiosResponse } from "axios";
import { Tool } from "../models/tool";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody), // this is an async call to get the items
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Tools = {
  list: () => requests.get<Tool[]>("/tools"), // this is an async call to get the items
  details: (id: string) => requests.get<Tool[]>(`/tools/${id}`),
  create: (tool: Tool) => requests.post<void>("/tools", tool),
  update: (tool: Tool) => requests.put<void>(`/tools/${tool.id}`, tool),
  delete: (id: string) => requests.del<void>(`/tools/${id}`),
};

const agent = {
  Tools,
};

export default agent;
