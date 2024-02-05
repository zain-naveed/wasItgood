import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_brands_recover} from '../utils/endpoint'
const brands_recover = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_brands_recover.brandsRec+id)
  }  
}
export {
    brands_recover
}

