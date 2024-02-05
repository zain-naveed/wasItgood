
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_reportapi} from '../utils/endpoint'
const ReportapiData = (query)=>{
  if (query){
    return HTTP_CLIENT.get(Endpoint_reportapi.reportApi+query)

  }
  else{
    return HTTP_CLIENT.get(Endpoint_reportapi.reportApi)

  }
    
}
export {
    ReportapiData
}

