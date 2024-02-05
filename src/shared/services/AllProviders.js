
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint} from '../utils/endpoint'
const AllProviders = (query)=>{
if(query){
    return HTTP_CLIENT.get(Endpoint.AllProviders+query)
}
else{
    return HTTP_CLIENT.get(Endpoint.AllProviders)

}

}
const ProviderDeactive = (id)=>{
    if(id){
        return HTTP_CLIENT.patch(Endpoint.providerDeactive+id)
    }
    
    }
        const ProviderUpdate = (id,obj)=>{
              let formbody = new FormData();
             
              Object.keys(obj).forEach((key,inx)=>{  
                if(key == "certificationImgs"){
                    obj["certificationImgs"].forEach((file,inx)=>{
                        formbody.append(`certificationImgs[${inx}]` , file)
                    })
                  }
                  else{ 
                  formbody.append(key,obj[key])  
                  }  
              })
            
          return HTTP_CLIENT.post(Endpoint.ProviderUpdate+id,formbody)
          }




export {
    AllProviders,
    ProviderDeactive,
    ProviderUpdate
}

