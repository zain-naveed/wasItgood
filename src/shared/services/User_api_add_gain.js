import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_userApi_Add} from '../utils/endpoint'
const userApi_Add = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_userApi_Add.userApi_Add+id)
  }  
}
export {
    userApi_Add
}

