import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";

const MakeAnnouncement = (msg) => {
  console.log(msg);
  return HTTP_CLIENT.post(Endpoint.makeAnnouncement, { msg: msg });
};

export { MakeAnnouncement };
