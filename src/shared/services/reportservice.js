import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_Report} from '../utils/endpoint'
const UPdateReport = (id,obj)=>{
    let formbody = new FormData();
    
    Object.keys(obj).forEach((key,inx)=>{
        
        formbody.append(key,obj[key])
        
    })
    console.log(id,"loooao")

return HTTP_CLIENT.put(Endpoint_Report.updateReport+id,formbody)
}
export {
    UPdateReport
}