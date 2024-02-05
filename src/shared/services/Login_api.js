import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint} from '../utils/endpoint'
import axios from "axios";

const LoginApi = async (obj)=>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(obj); 
    return await HTTP_CLIENT.post(Endpoint.LoginApi,body,config)
   
}
export {
    LoginApi
}

