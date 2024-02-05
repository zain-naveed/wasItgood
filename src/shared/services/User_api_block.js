import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_userApi_Block} from '../utils/endpoint'
const Userapi_blockData = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_userApi_Block.userApi_Block+id)
  }  
}
export {
    Userapi_blockData
}

