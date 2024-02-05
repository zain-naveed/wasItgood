import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";
const Alljobs = (query) => {
  if (query) {
    return HTTP_CLIENT.get(Endpoint.Alljobs + query);
  } else {
    return HTTP_CLIENT.get(Endpoint.Alljobs);
  }
};
const JobStatus = (id,obj) => {
  if (id) {
    return HTTP_CLIENT.post(Endpoint.jobStatus + id,obj);
  }
};
export { Alljobs, JobStatus };
