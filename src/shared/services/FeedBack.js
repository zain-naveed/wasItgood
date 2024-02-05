import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";
const GetfeedBack = (query) => {
   
    if (query) {

      return HTTP_CLIENT.get(Endpoint.GetfedBack+query);
    }
    else{
        return HTTP_CLIENT.get(Endpoint.GetfedBack);
    }
  };
export { GetfeedBack };
