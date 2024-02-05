
import {HTTP_CLIENT} from '../utils/interceptor'
import {Endpoint_FeedbackApi} from '../utils/endpoint'
const FeedbackApi = (query)=>{
if(query){
    return HTTP_CLIENT.get(Endpoint_FeedbackApi.FeedbackApi+query)
}
else{
    return HTTP_CLIENT.get(Endpoint_FeedbackApi.FeedbackApi)

}

}
export {
    FeedbackApi
}

