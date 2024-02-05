import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_brands_update} from '../utils/endpoint'
const BrandsUpdate = (id,obj)=>{
    let formbody = new FormData();
    
    Object.keys(obj).forEach((key,inx)=>{   
        formbody.append(key,obj[key])   
    })

return HTTP_CLIENT.put(Endpoint_brands_update.brandsUpdate+id,formbody)
}
export {
    BrandsUpdate
}