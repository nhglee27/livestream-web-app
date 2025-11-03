export interface FllowRequest {

     subscriberName?: string,
    subscribedToEmail?: string

}


export interface FllowResponse {
    
    success: boolean,
    message: string
    data?:{
        id: number,
        subscriberId: number,
        subscribedToId: number,
        status: boolean
    }

}
