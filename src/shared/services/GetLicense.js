import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";
const GetLicense = (query) => {
  if (query) {
    return HTTP_CLIENT.get(Endpoint.GetLicense + query);
  } else {
    return HTTP_CLIENT.get(Endpoint.GetLicense);
  }
};

const actionOnLicense = (id) => {
  return HTTP_CLIENT.post(Endpoint.actionOnLicense + id);
};
export { GetLicense, actionOnLicense };
