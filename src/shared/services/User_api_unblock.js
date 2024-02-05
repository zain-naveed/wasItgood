import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_userApi_UnBlock} from '../utils/endpoint'
const Userapi_unblockData = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_userApi_UnBlock.userApi_unBlock+id)
  }  
}
export {
    Userapi_unblockData
}

