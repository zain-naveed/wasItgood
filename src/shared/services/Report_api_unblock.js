import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_Reportapi_unblock} from '../utils/endpoint'
const Reportapi_unblockData = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_Reportapi_unblock.Report_unblockApi+id)
  }  
}
export {
    Reportapi_unblockData
}

