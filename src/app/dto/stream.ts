
// this is the request to get stream channel who are living on stream
// it is used in the Home page to get the stream channel who are living on stream
// and show them in the HeroSection component
export interface StreamChannelRequest {
  channelName?: string;
}


// this is the response from the server when getting stream channel who are living on stream
export interface StreamChannelResponse {
    success: boolean;
    message: string;
    data: {
        streamChannel?: string;
        email?: string;
        name?: string;
    };
    }
