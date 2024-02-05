import {HTTP_CLIENT} from '../utils/interceptor'
const DelProductimg = (id,url)=>{
  
    
return HTTP_CLIENT.put("products/delete-product-pic/"+id,{url:url})
}
export {
    DelProductimg
}