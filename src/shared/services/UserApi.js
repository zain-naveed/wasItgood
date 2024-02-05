
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_Userapi} from '../utils/endpoint'
const UserapiData = (query)=>{
if(query){
    return HTTP_CLIENT.get(Endpoint_Userapi.userApi+query)
}
else{
    return HTTP_CLIENT.get(Endpoint_Userapi.userApi)

}

}
export {
    UserapiData
}

