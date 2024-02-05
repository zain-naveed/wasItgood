
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_brandsAapi} from '../utils/endpoint'
import { CommentsDisabledRounded } from '@mui/icons-material'
const BrandsApi = (id,query)=>{
  if (query){
    return HTTP_CLIENT.get(Endpoint_brandsAapi.brandsAapi+id+query)

  }
  else{
    console.log("iddd k sth",id)
    return HTTP_CLIENT.get(Endpoint_brandsAapi.brandsAapi+id)

  }
    
}
export {
    BrandsApi
}

