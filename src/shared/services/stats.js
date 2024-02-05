import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";

const GetStats = () => {
  return HTTP_CLIENT.get(Endpoint.stats);
};

export { GetStats };
