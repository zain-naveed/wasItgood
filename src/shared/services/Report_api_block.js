import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_Reportapi_block} from '../utils/endpoint'
const category_delete = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_Reportapi_block.Report_blockApi+id)
  }  
}
export {
  category_delete
}

