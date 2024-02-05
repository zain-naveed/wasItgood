import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";

const Letters = (id) => {
  if (id) {
    return HTTP_CLIENT.get(Endpoint.letters + id);
  }
  else{
    return HTTP_CLIENT.get(Endpoint.letters);

  }
};

export { Letters };
