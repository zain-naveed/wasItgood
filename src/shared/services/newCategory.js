import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_category} from '../utils/endpoint'
const newCategory = (obj)=>{
    let formbody = new FormData();
    Object.keys(obj).forEach((key,inx)=>{    
        formbody.append(key,obj[key])      
    })

return HTTP_CLIENT.post(Endpoint_category.newCategory,formbody)
}
export {
    newCategory
}