import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint} from '../utils/endpoint'
const UPdateUser = (id,obj)=>{
  console.log(obj,"pura object hai")
    let formbody = new FormData();
    
    Object.keys(obj).forEach((key,inx)=>{
        
        formbody.append(key,obj[key])
        
    })
return HTTP_CLIENT.put(Endpoint.updateUser+id,formbody)
}
export {
    UPdateUser
}