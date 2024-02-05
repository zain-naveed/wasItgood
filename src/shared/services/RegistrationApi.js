import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";

const registrationApi = async (obj) => {
  return HTTP_CLIENT.post(Endpoint.registrationApi, obj);
};
export { registrationApi };
