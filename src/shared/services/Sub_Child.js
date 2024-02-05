
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_SubChildAll} from '../utils/endpoint'

const SubChildAllapi = (id,query)=>{
  if (query){
    return HTTP_CLIENT.get(Endpoint_SubChildAll.SubChildAapiAll+id+query)
  }
  else{
    return HTTP_CLIENT.get(Endpoint_SubChildAll.SubChildAapiAll+id)
  }   
}
const SubChildapi = (id,query)=>{
    if (query){
      return HTTP_CLIENT.get(Endpoint_SubChildAll.SubChildApi+id+query)
    }
    else{
      return HTTP_CLIENT.get(Endpoint_SubChildAll.SubChildApi+id)
    }   
  }
  const SubChildAddnewapi = (obj)=>{
    let formbody = new FormData();
    Object.keys(obj).forEach((key,inx)=>{    
        formbody.append(key,obj[key])      
    })

return HTTP_CLIENT.post(Endpoint_SubChildAll.newSubChild,formbody)
}
  const SubChildUpdateapi = (id,obj)=>{
    let formbody = new FormData();
    
    Object.keys(obj).forEach((key,inx)=>{   
        formbody.append(key,obj[key])   
    })
  
  return HTTP_CLIENT.put(Endpoint_SubChildAll.updateSubChild+id,formbody)
  }
  const SubChildDeleteapi = (id,query)=>{
    if (query){
      return HTTP_CLIENT.put(Endpoint_SubChildAll.deleteSubChild+id+query)
    }
    else{
      return HTTP_CLIENT.put(Endpoint_SubChildAll.deleteSubChild+id)
    }   
  }
  const SubChildRecoverapi = (id,query)=>{
    if (query){
      return HTTP_CLIENT.put(Endpoint_SubChildAll.recoverSubChild+id+query)
    }
    else{
      return HTTP_CLIENT.put(Endpoint_SubChildAll.recoverSubChild+id)
    }   
  }
  
export {
    SubChildAllapi,
  SubChildapi,
  SubChildUpdateapi,
  SubChildDeleteapi,
  SubChildRecoverapi,
  SubChildAddnewapi
  
}

