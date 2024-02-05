import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_ChildAddNew} from '../utils/endpoint'
const newChild = (obj)=>{
    let formbody = new FormData();
    Object.keys(obj).forEach((key,inx)=>{    
        formbody.append(key,obj[key])      
    })

return HTTP_CLIENT.post(Endpoint_ChildAddNew.newChild,formbody)
}
export {
    newChild
}