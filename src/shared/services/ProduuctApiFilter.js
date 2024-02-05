import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_ProductapiFilter} from '../utils/endpoint'
const ProduuctApiFilter = (id,query)=>{
  if (query){
    return HTTP_CLIENT.get(Endpoint_ProductapiFilter.productApiFilter+id+query)
  }
  else{
    return HTTP_CLIENT.get(Endpoint_ProductapiFilter.productApiFilter+id)
    }
}
export {
    ProduuctApiFilter
}

