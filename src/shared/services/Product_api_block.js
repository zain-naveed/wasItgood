import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_Productapi_block} from '../utils/endpoint'
const Productapi_blockData = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_Productapi_block.product_blockApi+id)
  }  
}
export {
    Productapi_blockData
}

