import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_userApi_delete} from '../utils/endpoint'
const userApi_delete = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_userApi_delete.userApi_delete+id)
  }  
}
export {
    userApi_delete
}

