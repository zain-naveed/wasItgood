import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_Product} from '../utils/endpoint'
const UPdateProduct = (id,obj)=>{
  console.log(obj,"objjjjjjjexx")
    let formbody = new FormData();
    Object.keys(obj).forEach((key,inx)=>{
        if(key === 'images'){
            formbody.append(`images`,JSON.stringify(obj['images']))
            console.log(JSON.stringify(obj['images']));
        }
        else
        if(key === 'images1'){
            obj['images1'].forEach((keyobj1,sinx1)=>{
                formbody.append(`images[${sinx1}]`,keyobj1)
                console.log("images 1")
            })
        }
        else{
            formbody.append(key,obj[key])
            console.log(key,"lasttttttt_append")
        }
        
    })
return HTTP_CLIENT.put(Endpoint_Product.updateProduct+id,formbody)
}
export {
    UPdateProduct
}