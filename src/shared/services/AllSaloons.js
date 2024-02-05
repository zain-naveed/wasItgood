import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";
const AllSaloons = (query) => {
  if (query) {
    return HTTP_CLIENT.get(Endpoint.AllSaloons + query);
  } else {
    return HTTP_CLIENT.get(Endpoint.AllSaloons);
  }
};

const SalonDeactive = (id) => {
  if (id) {
    return HTTP_CLIENT.patch(Endpoint.salonDeactive + id);
  }
};

export { AllSaloons, SalonDeactive };
