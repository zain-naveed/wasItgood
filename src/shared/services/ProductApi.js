
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_Productapi} from '../utils/endpoint'
const ProductapiData = (query)=>{
  if (query){
    return HTTP_CLIENT.get(Endpoint_Productapi.productApi+query)
  }
  else{
    return HTTP_CLIENT.get(Endpoint_Productapi.productApi)
  }  
}
export {
    ProductapiData
}

