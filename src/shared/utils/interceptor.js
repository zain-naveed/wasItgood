import axios from "axios";
import { BaseUrl } from "./constant";
import {store} from '../redux/store'
export const HTTP_CLIENT = axios.create({
  baseURL: BaseUrl,
});

const setupAxios = () => {

  HTTP_CLIENT.interceptors.request.use(
    (config) => {
        const {
            user: { user },
          } = store.getState()
 
      if(user && user?.tokens){
        config.headers.Authorization = `Bearer ${user?.tokens}`;
      
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};
export const initialConfig = () => {
  setupAxios();
};

initialConfig()