import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint} from '../utils/endpoint'
const SalonActive = (query)=>{
    return HTTP_CLIENT.patch(Endpoint.SalonActive+query)

}
export {
    SalonActive
}