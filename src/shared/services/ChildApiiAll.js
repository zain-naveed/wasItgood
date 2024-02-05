
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_ChildApiiAll, Endpoint_Childupdate,
  Endpoint_Childelete,
  Endpoint_Childrecover} from '../utils/endpoint'
const ChildApiiAll = (id,query)=>{
  if (query){
    return HTTP_CLIENT.get(Endpoint_ChildApiiAll.ChildApiiAll+id+query)

  }
  else if(id){
    return HTTP_CLIENT.get(Endpoint_ChildApiiAll.ChildApiiAll+id)

  }
  else{
    return HTTP_CLIENT.get(Endpoint_ChildApiiAll.ChildApiiAll)

  }
    
}

const Childupdate = (id,obj)=>{
  let formbody = new FormData();
    
  Object.keys(obj).forEach((key,inx)=>{   
      formbody.append(key,obj[key])   
  })

return HTTP_CLIENT.put(Endpoint_Childupdate.updateChild+id,formbody)
}
const Childelete = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_Childelete.deleteChild+id)
  }   
}
const Childrecover = (id)=>{
  if (id){
    return HTTP_CLIENT.put(Endpoint_Childrecover.recoverChild+id)
  }    
}
export {
  ChildApiiAll,
  Childupdate,
  Childelete,
  Childrecover
}

