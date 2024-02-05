
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_ChildApii} from '../utils/endpoint'
const ChildApii = (id,query)=>{
  if (query){
    return HTTP_CLIENT.get(Endpoint_ChildApii.ChildApii+id+query)

  }
  else{
    return HTTP_CLIENT.get(Endpoint_ChildApii.ChildApii+id)

  }
    
}
export {
  ChildApii
}

