import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_Productapi_unblock} from '../utils/endpoint'
const Productapi_unblockData = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_Productapi_unblock.product_unblockApi+id)
  }  
}
export {
    Productapi_unblockData
}

