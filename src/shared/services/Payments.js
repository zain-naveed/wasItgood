import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";
const GetPayments = (query) => {
  return HTTP_CLIENT.get(Endpoint.paymentsApi + query);
};
const GetTotalEarnings = () => {
  return HTTP_CLIENT.get(Endpoint.totalEarningsApi);
};
export { GetPayments, GetTotalEarnings };
