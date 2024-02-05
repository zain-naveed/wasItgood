import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_brands_del} from '../utils/endpoint'
const brands_delete = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_brands_del.brandsDel+id)
  }  
}
export {
    brands_delete
}

