import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_AddProduct} from '../utils/endpoint'
const newProduct = (obj)=>{
    let formbody = new FormData();
    Object.keys(obj).forEach((key,inx)=>{  
        if(key === 'images'){
            obj['images'].forEach((keyobj1,sinx1)=>{
                formbody.append(`images[${sinx1}]`,keyobj1)
                console.log("images")
            })
        }
        else{  
        formbody.append(key,obj[key])  
        }    
    })

return HTTP_CLIENT.post(Endpoint_AddProduct.AddProduct,formbody)
}
export {
    newProduct
}