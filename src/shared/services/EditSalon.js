import { HTTP_CLIENT } from "../utils/interceptor";
import { Endpoint } from "../utils/endpoint";

const EditSalon = (query,obj)=>{
    let formbody=new FormData()
  Object.keys(obj).forEach((key,inx)=>{
    if(key == "certifImg"){
        obj["certifImg"].forEach((file,inx)=>{
            formbody.append(`certifImg[${inx}]` , file)
        })
      }
      else{
        formbody.append(key,obj[key])
      }
        
    })
   
        return HTTP_CLIENT.post(Endpoint.EditSalon+query,formbody)
    
    }
    export {
        EditSalon
    }