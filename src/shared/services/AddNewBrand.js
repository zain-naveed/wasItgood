import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_brand} from '../utils/endpoint'
const newBrandsAdd = (obj)=>{
    let formbody = new FormData();
    Object.keys(obj).forEach((key,inx)=>{    
        formbody.append(key,obj[key])      
    })

return HTTP_CLIENT.post(Endpoint_brand.newBrand,formbody)
}
export {
    newBrandsAdd
}