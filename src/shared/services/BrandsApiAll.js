
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_brandsAapiAll} from '../utils/endpoint'
const BrandsApiAll = (query)=>{
  if (query){
    return HTTP_CLIENT.get(Endpoint_brandsAapiAll.brandsAapiAll+query)

  }
  else{
    return HTTP_CLIENT.get(Endpoint_brandsAapiAll.brandsAapiAll)

  }
    
}
export {
    BrandsApiAll
}