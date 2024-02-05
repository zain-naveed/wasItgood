
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint} from '../utils/endpoint'
const GetServices = (query)=>{
    if(query){
        return HTTP_CLIENT.get(Endpoint.servicesGet+query)

    }
    else{
        return HTTP_CLIENT.get(Endpoint.servicesGet)

    }
}

const EditServices = (id,query)=>{
    if(query){
        return HTTP_CLIENT.post(Endpoint.editServices+id,query)
    }
    else{
        return HTTP_CLIENT.post(Endpoint.editServices)
    
    }
}
const DelServices = (id)=>{
    return HTTP_CLIENT.delete(Endpoint.DelServices+id)
}
const AddServices = (obj)=>{
    return HTTP_CLIENT.post(Endpoint.AddServices,obj)
}
export {
    GetServices,
    EditServices,
    DelServices,
    AddServices
    
}

